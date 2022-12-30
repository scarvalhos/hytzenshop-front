import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Slide, ToastContainer } from 'react-toastify'
import { useDebounceCallback } from '@react-hook/debounce'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TbBellRinging, TbX } from 'react-icons/tb'
import { WishlistProvider } from '@contexts/WishlistContext'
import { ConfigProvider } from '@contexts/ConfigContext'
import { AuthProvider } from '@contexts/AuthContext'
import { CartProvider } from '@contexts/CartContext'
import { DefaultSeo } from 'next-seo'
import { UserGetDto } from '@hytzenshop/types'
import { socket } from '@services/socket'
import { toast } from '@luma/ui'

import Script from 'next/script'
import React from 'react'
import seo from '../next-seo.config'

import 'react-toastify/dist/ReactToastify.css'
import '../src/styles/globals.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const onNotification = useDebounceCallback((arg) => {
    const queryKey = {
      evaluation: ['products'],
      order: ['order', arg.referenceId],
    }[String(arg.reference)]

    const me = queryClient.getQueryData<UserGetDto>(['me'])

    if (me && arg.data.sendToIds.find((id: string) => id === me.user?.id)) {
      queryClient.invalidateQueries(['me'])
      queryClient.invalidateQueries(queryKey)

      return toast.primary(arg.data.message, {
        icon: <TbBellRinging size={20} className="text-primary-300" />,
      })
    }
  })

  React.useEffect(() => {
    socket.on('notification', (arg) => {
      onNotification(arg)
    })
  }, [onNotification])

  return (
    <QueryClientProvider client={queryClient}>
      <DefaultSeo {...seo} />

      <Script
        id="hotjar"
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3255046,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />

      <AuthProvider>
        <ConfigProvider>
          <CartProvider>
            <WishlistProvider>
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

              <Component {...pageProps} />
            </WishlistProvider>
          </CartProvider>
        </ConfigProvider>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
