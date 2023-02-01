import * as React from 'react'

import { SocketProvider } from '@contexts/SocketContext'
import { ThemeProvider } from '@luma/ui'
import { AuthProvider } from '@contexts/AuthContext'

type DefaultProviderProps = {
  children: React.ReactNode
}

function DefaultProvider({ children }: DefaultProviderProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>{children}</SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default DefaultProvider
