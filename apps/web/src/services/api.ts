import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'

import axios from 'axios'

export function setUpAPIClient(ctx?: GetServerSidePropsContext) {
  const cookies = parseCookies(ctx)

  const URL_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND

  const api = axios.create({
    baseURL: URL_BACKEND,
    ...(cookies && {
      headers: {
        Authorization: `Bearer ${cookies['hytzenshop.token']}`,
      },
    }),
  })

  return api
}
