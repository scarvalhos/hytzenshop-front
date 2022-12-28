import * as React from 'react'

import { ProductProvider } from '@contexts/NewProductContext'
import { ConfigProvider } from '@contexts/ConfigContext'
import { AuthProvider } from '@contexts/AuthContext'

type DefaultProviderProps = {
  children: React.ReactNode
}

function DefaultProvider({ children }: DefaultProviderProps) {
  return (
    <AuthProvider>
      <ConfigProvider>
        <ProductProvider>{children}</ProductProvider>
      </ConfigProvider>
    </AuthProvider>
  )
}

export default DefaultProvider
