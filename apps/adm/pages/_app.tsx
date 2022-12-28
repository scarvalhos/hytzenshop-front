import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Slide, ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DefaultSeo } from 'next-seo'
import { NextPage } from 'next'
import { useMemo } from 'react'
import { TbX } from 'react-icons/tb'

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
          rtl={false}
          className="px-2 z-[1200000]"
          position="top-right"
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          draggable
          transition={Slide}
          autoClose={4000}
          theme="dark"
          toastClassName="bg-dark-gray-300"
          closeButton={
            <TbX size={20} className="mt-2 mr-1 text-light-gray-500" />
          }
        />
      </DefaultProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
