import * as React from 'react'

import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@mui/material'

import { theme } from '@styles/theme'

type ThemeProvidersProps = {
  children: React.ReactNode
}

function ThemeProviders({ children }: ThemeProvidersProps) {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </MuiThemeProvider>
  )
}

export default ThemeProviders
