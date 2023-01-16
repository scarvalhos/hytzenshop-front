import { IMaskInput } from 'react-imask'
import { styled } from '@stitches/react'
import { theme } from '@luma/ui'

export const FieldWrapper = styled('div', {
  flexDirection: 'column',
  flex: 1,

  variants: {
    width: {
      full: {
        width: '100%',
      },
      fit: {
        width: 'fit-content',
      },
    },
  },
})

export const FieldLabel = styled('p', {
  fontSize: '1rem',
  fontWeight: '400',

  variants: {
    color: {
      error: {
        color: theme.colors['danger'][300],
      },
      initial: {
        color: theme.colors['light-gray'][100],
      },
    },
  },
})

export const FieldContent = styled('div', {
  width: '100%',

  variants: {
    rounded: {
      true: {
        borderRadius: '100000px',
      },
      false: {
        borderRadius: '4px',
      },
    },

    error: {
      true: {
        borderWidth: '1.5px',
        borderStyle: 'solid',
        borderColor: theme.colors.danger[300],
      },
      false: {},
    },

    variant: {
      bordeless: {
        background: 'transparent',
      },
      filled: {
        background: theme.colors['dark-gray'][500],
        borderWidth: '1.5px',
        borderStyle: 'solid',
        borderColor: 'transparent',
      },
      outlined: {
        background: 'none',
        border: `1.5px solid ${theme.colors['dark-gray'][300]}`,
      },
      disabled: {
        background: theme.colors['dark-gray'][400],
        border: `1.5px solid ${theme.colors['dark-gray'][200]}`,
        color: `${theme.colors['light-gray'][500]} !important`,
        cursor: 'not-allowed',
      },
    },
  },
})

export const Field = styled(IMaskInput, {
  width: '100%',
  border: 'none',
  outline: 'none',
  background: 'none',
  fontSize: '1rem',

  variants: {
    fieldVariant: {
      field: {},
      password: {
        font: 'normal 100% sans-serif',
      },
    },
  },
})

export const FieldInput = styled('input', {
  width: '100%',
  border: 'none',
  outline: 'none',
  background: 'none',
  fontSize: '1rem',

  variants: {
    variant: {
      field: {},
      password: {
        font: 'normal 100% sans-serif',
      },
    },
  },
})
