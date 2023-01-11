import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'

import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { SignInCredentials, User, UserGetDto } from '@hytzenshop/types'
import { defaultToastError } from '@hytzenshop/helpers'
import { socket } from '@services/socket'
import { api } from '@hytzenshop/services'

import Router, { useRouter } from 'next/router'
import React from 'react'

interface CreateUserCredentials extends SignInCredentials {
  email: string
}
type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContextData = {
  isAuthenticated: boolean
  user: User | null
  signIn: UseMutateAsyncFunction<
    {
      data: UserGetDto
      stayConnected: boolean
      checkoutNextStep: (() => void) | undefined
      backTo?: string
    },
    any,
    SignInCredentials,
    unknown
  >
  signOut: () => void
  updateUser: UseMutateAsyncFunction<UserGetDto, any, User, unknown>
  createUser: UseMutateAsyncFunction<
    {
      data: UserGetDto
      username: string
      email: string
      password: string
    },
    any,
    CreateUserCredentials,
    unknown
  >
}

export const AuthContext = React.createContext({} as AuthContextData)

let authChannel: BroadcastChannel

// Functions

const getMe = async () => {
  return api.get<UserGetDto>('/auth/me').then(({ data }) => data)
}

const signIn = async ({
  username,
  password,
  stayConnected = true,
  checkoutNextStep,
  backTo,
}: SignInCredentials) => {
  const data = await api
    .post<UserGetDto>('/auth/login', {
      username,
      password,
    })
    .then(({ data }) => data)

  return {
    data,
    stayConnected,
    checkoutNextStep,
    backTo,
  }
}

const createUser = async ({
  username,
  email,
  password,
  backTo,
}: CreateUserCredentials) => {
  const data = await api
    .post<UserGetDto>('/auth/register', {
      username,
      email,
      password,
    })
    .then(({ data }) => data)

  return {
    data,
    username,
    email,
    password,
    backTo,
  }
}

const updateUser = async (user: User) => {
  return api.put<UserGetDto>(`/users/${user.id}`, user).then(({ data }) => data)
}

// Provider

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = React.useState<string | null>(null)
  const isAuthenticated = React.useMemo(() => !!token, [token])

  const queryClient = useQueryClient()
  const queryKey = React.useMemo(() => ['me'], [])

  const { asPath } = useRouter()

  const meQuery = useQuery(queryKey, () => getMe(), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  }) as UseQueryResult<UserGetDto, unknown>

  // SignIn

  const signInMutation = useMutation(signIn, {
    onSuccess: ({ checkoutNextStep, data, stayConnected, backTo }) => {
      setToken(data.user.accessToken)
      queryClient.fetchQuery(queryKey)

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.user.accessToken}`

      setCookie(undefined, 'hytzenshop.token', data.user.accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/', // Whitch paths in my app has access to this cookie
      })

      authChannel.postMessage('signIn')

      if (stayConnected)
        localStorage.setItem('hytzenshop.stayConnected', 'stayConnected')

      if (checkoutNextStep) return checkoutNextStep()

      if (backTo) return Router.push(backTo)

      return Router.push('/profile/dados-pessoais')
    },
    onError: defaultToastError,
  })

  // SignOut

  const signOut = React.useCallback(() => {
    delete api.defaults.headers.common['Authorization']

    destroyCookie(null, 'hytzenshop.token', { path: '/' })
    setToken(null)
    queryClient.cancelQueries(queryKey)
    queryClient.removeQueries(queryKey)

    localStorage.removeItem('hytzenshop.stayConnected')
    authChannel.postMessage('signOut')

    Router.push('/')
  }, [queryClient, queryKey])

  // CreateUser

  const createUserMutation = useMutation(createUser, {
    onSuccess: (data) => {
      signInMutation.mutate({
        username: data.username,
        password: data.password,
        backTo: data.backTo,
      })
    },
    onError: defaultToastError,
  })

  // UpdateUser

  const updateUserMutation = useMutation(updateUser, {
    onMutate: async (user) => {
      await queryClient.cancelQueries({ queryKey })

      const previousMe = queryClient.getQueryData<UserGetDto>(['me'])

      queryClient.setQueryData(queryKey, {
        ...previousMe,
        user: {
          ...previousMe?.user,
          profile: user.profile,
        },
      })

      return {
        previousMe,
        data: {
          ...previousMe,
          user: {
            ...previousMe?.user,
            profile: user.profile,
          },
        },
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },

    onError: (_err, _newChat, context) => {
      queryClient.setQueryData(queryKey, context?.previousMe)
    },
  })

  // Effects

  React.useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          delete api.defaults.headers.common['Authorization']
          destroyCookie(undefined, 'hytzenshop.token', { path: '/' })
          localStorage.removeItem('hytzenshop.stayConnected')
          setToken(null)
          queryClient.cancelQueries(queryKey)
          queryClient.removeQueries(queryKey)

          Router.push('/')
          break

        case 'signIn':
          return Router.reload()

        default:
          break
      }
    }
  }, [asPath, queryClient, queryKey])

  React.useEffect(() => {
    if (window) {
      window.addEventListener('beforeunload', function () {
        const stayConnected = this.localStorage.getItem(
          'hytzenshop.stayConnected'
        )

        if (stayConnected !== 'stayConnected') {
          destroyCookie(undefined, 'hytzenshop.token', { path: '/' })
        }
      })
    }
  }, [])

  React.useEffect(() => {
    const { 'hytzenshop.token': cookieToken } = parseCookies()
    if (cookieToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${cookieToken}`

      setToken(cookieToken)
      setCookie(undefined, 'hytzenshop.token', cookieToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/', // Whitch paths in my app has access to this cookie
      })

      queryClient.invalidateQueries(queryKey)
    }
  }, [queryClient, queryKey])

  React.useEffect(() => {
    if (meQuery.data?.user.id) {
      socket.emit('new-loggin', {
        userId: meQuery.data.user.id,
      })
    }
  }, [meQuery])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn: signInMutation.mutateAsync,
        user: meQuery.data?.user || null,
        signOut,
        updateUser: updateUserMutation.mutateAsync,
        createUser: createUserMutation.mutateAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return React.useContext(AuthContext)
}
