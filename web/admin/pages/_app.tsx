import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Slide, ToastContainer } from 'react-toastify'
import { useDebounceCallback } from '@react-hook/debounce'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TbBellRinging, TbX } from 'react-icons/tb'
import { DefaultSeo } from 'next-seo'
import { NextPage } from 'next'
import { socket } from '@services/socket'
import { toast } from '@luma/ui'

import DefaultProvider from '@providers/DefaultProvider'
import React from 'react'
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
  const onNotification = useDebounceCallback((arg) => {
    const queryKey = {
      user: ['users'],
      cart: ['carts'],
      evaluation: ['evaluations'],
      newsletter: ['newsletter'],
      order: ['orders'],
      payment: ['orders'],
    }[String(arg.reference)]

    queryClient.invalidateQueries(queryKey)
    queryClient.invalidateQueries(['me'])

    new Audio('/audios/notification.mp3').play()

    return toast.primary(arg.data.message, {
      icon: <TbBellRinging size={20} className="text-primary-300" />,
    })
  })

  React.useEffect(() => {
    socket.on('notification-adm', (arg) => {
      onNotification(arg)
    })
  }, [onNotification])

  const getLayout = React.useMemo(
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
