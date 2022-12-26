import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { AuthTokenError } from '@services/errors/AuthTokenError'
import { validateToken } from '@hytzenshop/helpers'

import nookies, { destroyCookie, parseCookies } from 'nookies'

export function withAuthValidate<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
) {
  return async (ctx: GetServerSidePropsContext) => {
    const { 'hytzenshop.token': token } = parseCookies(ctx)

    if (!token) {
      return fn(ctx)
    }

    try {
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
