import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { validateToken, validateUserPermission } from '@hytzenshop/helpers'
import { AuthTokenError } from '@services/errors/AuthTokenError'

import nookies, { destroyCookie, parseCookies } from 'nookies'
import decode from 'jwt-decode'

type WithSSRAuthOptions = {
  mustBeAdmin?: boolean
  mustBeAuthenticated?: boolean
}

export function withSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
) {
  return async (ctx: GetServerSidePropsContext) => {
    const { 'hytzenshop.token': token } = parseCookies(ctx)

    if (options?.mustBeAuthenticated && !token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    if (options?.mustBeAuthenticated && token) {
      const isValidToken = validateToken(token)

      if (!isValidToken) {
        nookies.destroy(ctx, 'hytzenshop.token')
        destroyCookie(ctx, 'hytzenshop.token', { path: '/' })

        return {
          redirect: {
            destination: '/redirect',
            permanent: false,
          },
        }
      }

      if (options?.mustBeAdmin) {
        const user = decode<{ isAdmin: boolean }>(token)
        const { mustBeAdmin } = options

        const userHasValidPermission = validateUserPermission({
          user,
          isAdmin: mustBeAdmin,
        })

        if (!userHasValidPermission) {
          return {
            redirect: {
              destination: '/',
              permanent: false,
            },
          }
        }
      }
    }

    try {
      return fn(ctx)
    } catch (error) {
      if (error instanceof AuthTokenError) {
        nookies.destroy(ctx, 'hytzenshop.token')

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
