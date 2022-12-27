import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import { TbCircleCheck } from 'react-icons/tb'
import { DefaultSeo } from 'next-seo'
import { NextPage } from 'next'
import { useMemo } from 'react'
import { theme } from '@styles/theme'

import DefaultProvider from '@providers/DefaultProvider'
import seo from '../next-seo.config'

import 'react-toastify/dist/ReactToastify.css'
import 'react-circular-progressbar/dist/styles.css'
import '@styles/globals.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = useMemo(
    () => Component.getLayout ?? ((page: React.ReactElement) => page),
    [Component.getLayout]
  )

  return (
    <QueryClientProvider client={queryClient}>
      <DefaultProvider>
        <DefaultSeo {...seo} />
        {getLayout(<Component {...pageProps} />)}

        <ToastContainer
          autoClose={3000}
          theme="dark"
          toastStyle={{ background: '#1E1E1E' }}
          icon={<TbCircleCheck size={20} color={theme.palette.success.main} />}
          progressStyle={{
            backgroundColor: theme.palette.success.main,
          }}
        />
      </DefaultProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
