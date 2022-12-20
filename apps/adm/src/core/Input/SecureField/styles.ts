import styled, { css } from 'styled-components'

import { Stack, FormLabel, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

interface Props {
  variant?: string
  erro?: string
}

export const FieldWrapper = styled(Stack).attrs({
  direction: 'column',
  spacing: 1,
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
  flex: 1;
  background: ${({ variant }) =>
    variant === 'outlined' ? 'transparent' : '#DBDBD6'};
  filter: invert(1);
  border-radius: 5px;

  ${({ variant }) =>
    variant === 'outlined' &&
    css`
      border: 1px solid;
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

export const Field = styled.div<Props>`
  flex: 1;
  height: 48px;

  border: none;
  outline: none;
  background: none;
  color: ${({ theme }) => theme.palette.text.primary};

  font-size: 1rem;
  display: inline-block;

  padding: 0 1rem;

  ${({ variant }) =>
    variant === 'password' &&
    css`
      font: normal 100% sans-serif;
    `}
`

export const Error = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 0.875rem;
  filter: brightness(1.1);
  white-space: pre-wrap;
`
