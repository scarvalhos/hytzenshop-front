import * as React from 'react'

import { SocketProvider } from '@contexts/SocketContext'
import { ConfigProvider } from '@contexts/ConfigContext'
import { AuthProvider } from '@contexts/AuthContext'

type DefaultProviderProps = {
  children: React.ReactNode
}

function DefaultProvider({ children }: DefaultProviderProps) {
  return (
    <AuthProvider>
      <SocketProvider>
        <ConfigProvider>{children}</ConfigProvider>
      </SocketProvider>
    </AuthProvider>
  )
}

export default DefaultProvider
