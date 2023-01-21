import { StylesConfig } from 'react-select'
import { useTheme } from '../../../styles/ThemeContext'
import { theme } from '../../../styles/theme'

interface UseSelectCommonsProps {
  rounded?: boolean
}

export const useSelectCommons = ({ rounded }: UseSelectCommonsProps) => {
  const { theme: modeTheme } = useTheme()

  const styles: StylesConfig = {
    input: (style) => ({
      ...style,
      color:
        modeTheme === 'dark'
          ? theme.colors['light-gray'][100]
          : theme.colors['dark-gray'][500],
    }),
    singleValue: (style) => ({
      ...style,
      fontWeight: 500,
      color:
        modeTheme === 'dark'
          ? theme.colors['light-gray'][100]
          : theme.colors['dark-gray'][500],
    }),
    container: (style) => ({
      ...style,
      width: '100%',
      borderRadius: '999999px',
      backgroundColor: 'transparent',
      padding: '4px 0px',
      boxShadow: 'none',
    }),
    control: (style) => ({
      ...style,
      backgroundColor: 'transparent',
      color:
        modeTheme === 'dark'
          ? theme.colors['light-gray'][100]
          : theme.colors['dark-gray'][300],
      border: 'none',
      boxShadow: 'none',
      outline: 'none',
      paddingLeft: 12,
      paddingRight: 12,
    }),
    menu: (style) => ({
      ...style,
      backgroundColor: 'transparent',
      borderRadius: rounded ? '16px' : '3px',
      marginTop: '12px',
      boxShadow: 'none',
    }),
    menuList: (style) => ({
      ...style,
      padding: 0,
      borderRadius: rounded ? '16px' : '3px',
      background: theme.colors['dark-gray'][500],
      boxShadow:
        modeTheme === 'dark'
          ? '0px -4px 6px rgba(0, 0, 0, 0.7), 0px 6px 6px rgba(0, 0, 0, 0.7)'
          : '0px -4px 6px rgba(0, 0, 0, 0.1), 0px 6px 6px rgba(0, 0, 0, 0.1)',
    }),
    option: (style) => ({
      ...style,
      color:
        modeTheme === 'dark'
          ? theme.colors['light-gray'][100]
          : theme.colors['dark-gray'][300],
      background:
        modeTheme === 'dark'
          ? theme.colors['dark-gray'][500]
          : theme.colors['light-gray'][200],
      paddingLeft: 16,
      paddingRight: 16,
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: 14,
      ':hover': {
        background:
          modeTheme === 'dark'
            ? theme.colors['dark-gray'][400]
            : theme.colors['light-gray'][300],
      },
    }),
    indicatorSeparator: () => ({}),
    placeholder: (style) => ({
      ...style,
      color: theme.colors['light-gray'][400],
    }),
  }

  return { styles }
}
