import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#FFFFFF',
      main: '#DC393A',
      dark: '#242429',
      contrastText: '#a1a1b0',
    },
    secondary: {
      light: '#FFFFFF',
      main: '#44d063',
      dark: '#1C1C20',
      contrastText: '#a1a1b0',
    },
    success: {
      main: '#4FFF70',
      light: '#4FFF700D',
    },
    background: {
      default: '#111114',
      paper: '#232323',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#80808c',
      disabled: '#606069',
    },
    warning: {
      main: '#FF5F05',
      light: '#FF9B05',
    },
  },
  typography: {
    fontFamily: 'Urbanist, sans-serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})
