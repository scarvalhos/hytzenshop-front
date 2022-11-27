import { theme } from '@hooks/useTheme'
import { styled } from '@stitches/react'

export const Field = styled('div', {
  flex: 1,
  width: '100%',
  maxHeight: '48px',

  border: 'none',
  outline: 'none',
  background: 'none',

  fontSize: '1rem',
  display: 'inline-block',

  color: theme.colors['light-gray'][100],

  variants: {
    variant: {
      field: {},
      password: {
        font: 'normal 100% sans-serif',
      },
    },
  },
})
