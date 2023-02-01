import { useSkipFirstRender } from '@hytzenshop/hooks'

import React from 'react'

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeContextData = {
  theme: 'dark' | 'light' | null
  setTheme: React.Dispatch<React.SetStateAction<'dark' | 'light' | null>>
}

export const ThemeContext = React.createContext({} as ThemeContextData)

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<'dark' | 'light' | null>('dark')

  React.useLayoutEffect(() => {
    const storagedTheme = localStorage.getItem('theme') as 'dark' | 'light'

    if (storagedTheme) {
      setTheme(storagedTheme)
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark')
      } else {
        setTheme('light')
      }
    }
  }, [])

  useSkipFirstRender(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }

    if (theme === 'light') {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return React.useContext(ThemeContext)
}
