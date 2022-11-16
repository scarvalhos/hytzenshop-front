import * as React from 'react'

import Router from 'next/router'

import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { SignInCredentials, User } from '@utils/types/auth'
import { defaultToastError } from '@utils/helpers'
import { UserGetDto } from '@utils/dtos/userDto'
import { api } from '@services/apiClient'

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
  destroyCookie(undefined, 'hytzenshopadm.token', { path: '/' })
  localStorage.removeItem('hytzenshopadm.stayConnected')
  authChannel.postMessage('signOut')

  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<User | null>(null)
  const isAuthenticated = !!user

  async function signIn({
    username,
    password,
    stayConnected = true,
  }: SignInCredentials) {
    try {
      const response = await api.post<UserGetDto>('/auth/login', {
        username,
        password,
      })

      const data: User = response.data.user

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.accessToken}`

      setCookie(undefined, 'hytzenshopadm.token', data.accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/', // Whitch paths in my app has access to this cookie
      })

      if (stayConnected) {
        localStorage.setItem('hytzenshopadm.stayConnected', 'stayConnected')
      }

      setUser(data)

      Router.push('/dashboard')

      authChannel.postMessage('signIn')
    } catch (error) {
      return defaultToastError(error)
    }
  }

  const createUser = async ({
    username,
    email,
    password,
  }: CreateUserCredentials) => {
    try {
      await api.post('/auth/register', {
        username,
        email,
        password,
      })

      signIn({
        username: username,
        password: password,
      })
    } catch (error: any) {
      return defaultToastError(error)
    }
  }

  const signOut = React.useCallback(() => {
    destroyCookie(undefined, 'hytzenshopadm.token', { path: '/' })
    localStorage.removeItem('hytzenshopadm.stayConnected')
    authChannel.postMessage('signOut')

    setUser(null)

    Router.push('/')
  }, [])

  const updateUser = async (user: User) => {
    try {
      await api.put(`/users/${user.id}`, user)
      await api.get<UserGetDto>('/auth/me').then(({ data }) => {
        setUser(data.user)
      })
    } catch (error: any) {
      return defaultToastError(error)
    }
  }

  React.useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          destroyCookie(undefined, 'hytzenshopadm.token', { path: '/' })
          localStorage.removeItem('hytzenshopadm.stayConnected')

          Router.push('/')
          break
        case 'signIn':
          Router.push('/dashboard')
          break
        default:
          break
      }
    }
  }, [])

  React.useEffect(() => {
    const { 'hytzenshopadm.token': token } = parseCookies()

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
          'hytzenshopadm.stayConnected'
        )

        if (stayConnected !== 'stayConnected') {
          destroyCookie(undefined, 'hytzenshopadm.token', { path: '/' })
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
