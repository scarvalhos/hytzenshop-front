import styled, { css } from 'styled-components'

import { Button, ButtonProps, Link, LinkProps } from '@mui/material'

interface CustomLinkButtonProps extends LinkProps {
  customVariant: 'text' | 'outlined' | 'contained' | undefined
  disabled?: boolean
  rounded?: boolean
}

interface CustomCustomButtonProps extends ButtonProps {
  rounded?: boolean
}

export const CustomButton = styled(Button)<CustomCustomButtonProps>`
  text-transform: none;
  padding: 0.75rem 1rem;

  ${({ rounded }) =>
    rounded &&
    css`
      border-radius: 30px;
    `}

  ${({ variant }) =>
    variant === 'outlined' &&
    css`
      background: none;
      border: 1px solid ${({ theme }) => theme.palette.success.main};
      color: ${({ theme }) => theme.palette.success.main};
    `}

  ${({ variant }) =>
    variant === 'contained' &&
    css`
      background: ${({ theme }) => theme.palette.secondary.main};
      color: ${({ theme }) => theme.palette.text.primary};
    `}

  ${({ variant }) =>
    variant === 'text' &&
    css`
      color: ${({ theme }) => theme.palette.text.primary};
      max-width: fit-content;
      padding: 0;
    `}

  &:hover {
    ${({ variant }) =>
      variant === 'outlined' &&
      css`
        background: none;
        border: 1px solid ${({ theme }) => theme.palette.success.main};
        filter: brightness(1.5);
      `}

    ${({ variant }) =>
      variant === 'contained' &&
      css`
        background: ${({ theme }) => theme.palette.secondary.main};
        color: ${({ theme }) => theme.palette.text.primary};
        filter: brightness(1.1);
      `}

      ${({ variant }) =>
      variant === 'text' &&
      css`
        background: none;
        color: ${({ theme }) => theme.palette.text.primary};
        max-width: fit-content;
        padding: 0;
      `}
  }

  &:disabled {
    background: none;
    border: 1px solid;
    border-color: ${({ theme }) => theme.palette.primary.dark};
    color: ${({ theme }) => theme.palette.text.disabled};
    filter: brightness(1);
    cursor: not-allowed;
  }
`
export const CustomLinkButton = styled(Link)<CustomLinkButtonProps>`
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;

  text-transform: none;
  text-decoration: none;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ rounded }) =>
    rounded &&
    css`
      border-radius: 30px;
    `}

  ${({ customVariant }) =>
    customVariant === 'outlined' &&
    css`
      background: none;
      border: 1px solid ${({ theme }) => theme.palette.success.main};
      color: ${({ theme }) => theme.palette.success.main};
    `}

  ${({ customVariant }) =>
    customVariant === 'contained' &&
    css`
      background: ${({ theme }) => theme.palette.secondary.main};
      color: ${({ theme }) => theme.palette.text.primary};
    `}

  &:hover {
    ${({ customVariant }) =>
      customVariant === 'outlined' &&
      css`
        background: none;
        border: 1px solid ${({ theme }) => theme.palette.success.main};
        filter: brightness(1.5);
      `}

    ${({ customVariant }) =>
      customVariant === 'contained' &&
      css`
        background: ${({ theme }) => theme.palette.secondary.main};
        color: ${({ theme }) => theme.palette.text.primary};
        filter: brightness(1.1);
      `}
  }

  ${({ customVariant, disabled }) =>
    disabled &&
    customVariant === 'outlined' &&
    css`
      background: none;
      border: 1px solid ${({ theme }) => theme.palette.primary.dark};
      color: ${({ theme }) => theme.palette.text.disabled};
      pointer-events: none;
      cursor: not-allowed;

      &:hover {
        border: 1px solid ${({ theme }) => theme.palette.primary.dark};
        filter: brightness(1);
      }
    `}

  ${({ customVariant, disabled }) =>
    disabled &&
    customVariant === 'contained' &&
    css`
      background: ${({ theme }) => theme.palette.primary.dark};
      color: ${({ theme }) => theme.palette.text.disabled};
      pointer-events: none;
      cursor: not-allowed;
    `}
`
