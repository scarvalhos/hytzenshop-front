import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Slide, ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { WishlistProvider } from '@contexts/WishlistContext'
import { ConfigProvider } from '@contexts/ConfigContext'
import { SocketProvider } from '@contexts/SocketContext'
import { AuthProvider } from '@contexts/AuthContext'
import { CartProvider } from '@contexts/CartContext'

import { DefaultSeo } from 'next-seo'
import { TbX } from 'react-icons/tb'

import Script from 'next/script'
import React from 'react'
import seo from '../next-seo.config'

import 'react-toastify/dist/ReactToastify.css'
import '../src/styles/globals.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultSeo {...seo} />

      <Script
        id="hotjar"
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:2484839,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />

      <AuthProvider>
        <SocketProvider>
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
                  closeButton={() => (
                    <TbX size={20} className="mt-2 mr-1 text-light-gray-500" />
                  )}
                />

                <Component {...pageProps} />
              </WishlistProvider>
            </CartProvider>
          </ConfigProvider>
        </SocketProvider>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
