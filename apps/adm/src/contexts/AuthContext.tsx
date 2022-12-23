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
import { toast } from 'react-toastify'
import { api } from '@services/api'

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
  }
}

const createUser = async ({
  username,
  email,
  password,
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
    onSuccess: ({ checkoutNextStep, data, stayConnected }) => {
      setToken(data.user.accessToken)
      queryClient.fetchQuery(queryKey)

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.user.accessToken}`

      setCookie(undefined, 'hytzenshopadm.token', data.user.accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/', // Whitch paths in my app has access to this cookie
      })

      authChannel.postMessage('signIn')

      if (stayConnected)
        localStorage.setItem('hytzenshopadm.stayConnected', 'stayConnected')

      if (checkoutNextStep) return checkoutNextStep()

      return Router.push('/dashboard')
    },
    onError: defaultToastError,
  })

  // SignOut

  const signOut = React.useCallback(() => {
    delete api.defaults.headers.common['Authorization']

    destroyCookie(null, 'hytzenshopadm.token', { path: '/' })
    setToken(null)
    queryClient.cancelQueries(queryKey)
    queryClient.removeQueries(queryKey)

    localStorage.removeItem('hytzenshopadm.stayConnected')
    authChannel.postMessage('signOut')

    Router.push('/')
  }, [queryClient, queryKey])

  // CreateUser

  const createUserMutation = useMutation(createUser, {
    onSuccess: (data) => {
      signInMutation.mutate({
        username: data.username,
        password: data.password,
      })
    },
    onError: defaultToastError,
  })

  // UpdateUser

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries(queryKey)
      return toast.success(data.message)
    },
    onError: defaultToastError,
  })

  // Effects

  React.useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          delete api.defaults.headers.common['Authorization']
          destroyCookie(undefined, 'hytzenshopadm.token', { path: '/' })
          localStorage.removeItem('hytzenshopadm.stayConnected')
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
  }, [asPath])

  React.useEffect(() => {
    if (window) {
      window.addEventListener('beforeunload', function () {
        const stayConnected = this.localStorage.getItem(
          'hytzenshopadm.stayConnected'
        )

        if (stayConnected !== 'stayConnected') {
          destroyCookie(undefined, 'hytzenshopadm.token', { path: '/' })
        }
      })
    }
  }, [])

  React.useEffect(() => {
    const { 'hytzenshopadm.token': cookieToken } = parseCookies()
    if (cookieToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${cookieToken}`

      setToken(cookieToken)
      setCookie(undefined, 'hytzenshopadm.token', cookieToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/', // Whitch paths in my app has access to this cookie
      })

      queryClient.invalidateQueries(queryKey)
    }
  }, [])

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
