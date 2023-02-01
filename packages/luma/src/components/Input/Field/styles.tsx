/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IMaskInput } from 'react-imask'
import { styled } from '@stitches/react'
import { c } from '@hytzenshop/helpers'

import React from 'react'
import tw from 'tailwind-styled-components'

// FieldWrapper

interface FieldWrapperProps {
  children: React.ReactNode
  className?: string
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  children,
  className,
}) => <div className={c('flex-col flex-1', className)}>{children}</div>

// Field

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

//FieldLabel

interface FieldLabelProps {
  children: React.ReactNode
  color?: 'error' | 'initial'
}

export const FieldLabel = tw.div<FieldLabelProps>`
  ${({ color }) => (color === 'error' ? 'text-danger-300' : 'text-primary')}
`

// FieldContent

interface FieldContentProps {
  children: React.ReactNode
  variant?: 'bordeless' | 'filled' | 'outlined' | 'disabled'
  rounded?: boolean
  error?: string
  className?: string
}

const fieldVariantClassName = {
  bordeless: 'bg-[transparent]',
  filled: 'bg-secondary border-[1.5px] border-[transparent]',
  outlined: 'bg-[transparent] border-[1.5px] border-dark-gray-300',
  disabled: 'cursor-not-allowed',
}

export const FieldContent: React.FC<FieldContentProps> = ({
  variant,
  error,
  rounded,
  children,
}) => (
  <div
    className={c(
      'w-full',
      fieldVariantClassName[variant!],
      error === 'true' && 'border-[1.5px] border-danger-300',
      rounded ? 'rounded-full' : 'rounded-md'
    )}
  >
    {children}
  </div>
)
