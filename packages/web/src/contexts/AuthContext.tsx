import * as React from 'react'

import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { SignInCredentials, User } from '@utils/types/auth'
import { defaultToastError } from '@utils/helpers'
import { UserGetDto } from '@utils/dtos/userDto'
import { api } from '@services/apiClient'

import Router, { useRouter } from 'next/router'

interface CreateUserCredentials extends SignInCredentials {
  email: string
}
type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContextData = {
  isAuthenticated: boolean
  user: User | null
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  updateUser: (user: User) => Promise<void>
  createUser({
    username,
    email,
    password,
  }: CreateUserCredentials): Promise<void>
}

export const AuthContext = React.createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export const signOut = () => {
  destroyCookie(undefined, 'hytzenshop.token', { path: '/' })
  authChannel.postMessage('signOut')
  localStorage.removeItem('hytzenshop.stayConnected')

  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<User | null>(null)
  const isAuthenticated = !!user

  const { asPath } = useRouter()

  async function signIn({
    username,
    password,
    stayConnected = true,
    checkoutNextStep,
  }: SignInCredentials) {
    try {
      const response = await api.post<UserGetDto>('/auth/login', {
        username,
        password,
      })

      const data: User = response.data.user

      setCookie(undefined, 'hytzenshop.token', data.accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/', // Whitch paths in my app has access to this cookie
      })

      if (stayConnected) {
        localStorage.setItem('hytzenshop.stayConnected', 'stayConnected')
      }

      setUser(data)

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.accessToken}`

      authChannel.postMessage('signIn')

      if (checkoutNextStep) {
        return checkoutNextStep()
      } else {
        Router.push('/profile')
      }
    } catch (error: any) {
      return defaultToastError(error)
    }
  }

  const createUser = async ({
    username,
    email,
    password,
  }: CreateUserCredentials) => {
    try {
      await api.post<UserGetDto>('/auth/register', {
        username,
        email,
        password,
      })

      signIn({
        username: username,
        password: password,
      })
    } catch (error) {
      return defaultToastError(error)
    }
  }

  const signOut = React.useCallback(() => {
    destroyCookie(null, 'hytzenshop.token', { path: '/' })
    localStorage.removeItem('hytzenshop.stayConnected')

    setUser(null)
    authChannel.postMessage('signOut')

    Router.push('/')
  }, [])

  const updateUser = React.useCallback(async (user: User) => {
    try {
      await api.put(`/users/${user.id}`, user)

      api.get<UserGetDto>('/auth/me').then(({ data }) => {
        setUser(data.user)
      })
    } catch (error: any) {
      return defaultToastError(error)
    }
  }, [])

  React.useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          destroyCookie(undefined, 'hytzenshop.token', { path: '/' })
          localStorage.removeItem('hytzenshop.stayConnected')

          Router.push('/')
          break
        default:
          break
      }
    }
  }, [asPath])

  React.useEffect(() => {
    const { 'hytzenshop.token': token } = parseCookies()

    if (token) {
      api
        .get<UserGetDto>('/auth/me')
        .then(({ data }) => {
          setUser(data.user)
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

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

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signIn, user, signOut, updateUser, createUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return React.useContext(AuthContext)
}
