import * as React from 'react'

import { ProductProvider } from '@contexts/NewProductContext'
import { ConfigProvider } from '@contexts/ConfigContext'
import { AuthProvider } from '@contexts/AuthContext'

import ThemeProviders from './ThemeProviders'

type DefaultProviderProps = {
  children: React.ReactNode
}

function DefaultProvider({ children }: DefaultProviderProps) {
  return (
    <AuthProvider>
      <ConfigProvider>
        <ThemeProviders>
          <ProductProvider>{children}</ProductProvider>
        </ThemeProviders>
      </ConfigProvider>
    </AuthProvider>
  )
}

export default DefaultProvider
