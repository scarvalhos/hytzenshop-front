import * as React from 'react'

import { ConfigProvider } from '@contexts/ConfigContext'
import { AuthProvider } from '@contexts/AuthContext'

type DefaultProviderProps = {
  children: React.ReactNode
}

function DefaultProvider({ children }: DefaultProviderProps) {
  return (
    <AuthProvider>
      <ConfigProvider>{children}</ConfigProvider>
    </AuthProvider>
  )
}

export default DefaultProvider
