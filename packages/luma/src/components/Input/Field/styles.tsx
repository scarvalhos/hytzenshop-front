import { IMaskInput } from 'react-imask'
import { styled } from '@stitches/react'
import { theme } from '@luma/ui'
import { c } from '@hytzenshop/helpers'

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

interface FieldLabelProps {
  children: React.ReactNode
  color?: 'error' | 'initial'
}

export const FieldLabel: React.FC<FieldLabelProps> = ({ color, children }) => {
  const colorClassName = {
    error: 'text-danger-300',
    initial: 'text-primary',
  }[String(color)]

  return <p className={c(colorClassName)}>{children}</p>
}

interface FieldContentProps {
  children: React.ReactNode
  variant?: 'bordeless' | 'filled' | 'outlined' | 'disabled'
  rounded?: boolean
  error?: string
  className?: string
}

export const FieldContent: React.FC<FieldContentProps> = ({
  className,
  children,
  variant,
  rounded,
  error,
}) => {
  const variantClassName = {
    bordeless: 'bg-[transparent]',
    filled: 'bg-secondary border-[1.5px] border-[transparent]',
    outlined:
      'bg-[transparent] border-[1.5px] border-light-gray-300 dark:border-dark-gray-300',
    disabled: 'cursor-not-allowed',
  }[String(variant)]

  return (
    <div
      className={c(
        'w-full',
        error === 'true' && 'border-[1.5px] border-danger-300',
        rounded ? 'rounded-full' : 'rounded-md',
        variantClassName,
        className
      )}
    >
      {children}
    </div>
  )
}
