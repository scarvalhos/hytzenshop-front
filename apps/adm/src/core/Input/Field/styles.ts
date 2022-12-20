import styled, { css } from 'styled-components'

import { Stack, FormLabel } from '@mui/material'
import { Controller } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

interface Props {
  variant?: string
  erro?: string
  rounded?: 'true' | 'false'
  disabled?: boolean
}

export const FieldWrapper = styled(Stack).attrs({
  direction: 'column',
  spacing: 1,
  flex: 1,
})``

export const FieldLabel = styled(FormLabel)<Props>`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 1rem;
  font-weight: 500;

  ${({ erro }) =>
    !!erro &&
    css`
      color: ${({ theme }) => theme.palette.primary.main};
    `}
`

export const FieldContent = styled(Stack).attrs({
  direction: 'row',
})<Props>`
  width: 100%;
  padding: 0.75rem;
  border-radius: ${({ rounded }) => (rounded === 'true' ? '1000px' : '5px')};

  ${({ theme, variant, disabled }) =>
    variant === 'outlined'
      ? css`
          background: 'transparent';
        `
      : disabled
      ? css`
          background: ${theme.palette.secondary.dark};
        `
      : css`
          background: ${theme.palette.primary.dark};
        `}

  ${({ variant }) =>
    variant === 'outlined' &&
    css`
      border: 1px solid;
      /* border-color: ${({ theme }) => theme.palette.secondary.dark}; */
      filter: brightness(1.5);

      border-color: ${({ theme }) => theme.palette.success.main};
    `}

  ${({ erro }) =>
    !!erro &&
    css`
      border: 1px solid;
      border-color: ${({ theme }) => theme.palette.primary.main};
    `}
`

export const FieldController = styled(Controller)``

export const Field = styled(IMaskInput)<Props>`
  width: 100%;
  border: none;
  outline: none;
  background: none;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 1rem;

  ${({ variant }) =>
    variant === 'password' &&
    css`
      font: normal 100% sans-serif;
    `}
`
