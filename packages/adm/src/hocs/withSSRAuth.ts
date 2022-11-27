import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { AuthTokenError } from '../services/errors/AuthTokenError'

import {
  validateToken,
  validateUserPermission,
} from '@hocs/validateUserPermission'

import nookies, { destroyCookie, parseCookies } from 'nookies'
import decode from 'jwt-decode'

type WithSSRAuthOptions = {
  isAdmin?: boolean
}

export function withSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
) {
  return async (ctx: GetServerSidePropsContext) => {
    const { 'hytzenshopadm.token': token } = parseCookies(ctx)

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    if (options) {
      const user = decode<{ isAdmin: boolean }>(token)
      const { isAdmin } = options

      const userHasValidPermission = validateUserPermission({
        user,
        isAdmin,
      })

      if (!userHasValidPermission) {
        nookies.destroy(ctx, 'hytzenshopadm.token', { path: '/' })
        destroyCookie(ctx, 'hytzenshopadm.token', { path: '/' })

        return {
          redirect: {
            destination: '/not-allowed',
            permanent: false,
          },
        }
      }
    }

    try {
      const isValidToken = validateToken(token)

      if (!isValidToken) {
        nookies.destroy(ctx, 'hytzenshopadm.token', { path: '/' })
        destroyCookie(ctx, 'hytzenshopadm.token', { path: '/' })

        return {
          redirect: {
            destination: '/redirect',
            permanent: false,
          },
        }
      }

      return fn(ctx)
    } catch (error) {
      if (error instanceof AuthTokenError) {
        nookies.destroy(ctx, 'hytzenshopadm.token', { path: '/' })

        return {
          redirect: {
            destination: '/redirect',
            permanent: false,
          },
        }
      }
    }
  }
}
