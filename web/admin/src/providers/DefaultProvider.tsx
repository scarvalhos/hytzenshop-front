import * as React from 'react'

import { SocketProvider } from '@contexts/SocketContext'
import { AuthProvider } from '@contexts/AuthContext'

type DefaultProviderProps = {
  children: React.ReactNode
}

function DefaultProvider({ children }: DefaultProviderProps) {
  return (
    <AuthProvider>
      <SocketProvider>{children}</SocketProvider>
    </AuthProvider>
  )
}

export default DefaultProvider
