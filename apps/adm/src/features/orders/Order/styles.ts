import styled, { css } from 'styled-components'

import { Box, Typography } from '@mui/material'

interface IconButtonProps {
  bg?: string
  disabled?: boolean
}

interface ContainerProps {
  barColor?: string
  animate?: boolean
}

export const Container = styled(Box)<ContainerProps>`
  position: relative;

  padding: 1rem;
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.secondary.dark};

  flex-wrap: nowrap;

  &::before {
    content: ' ';
    width: 2px;
    height: 100%;
    background: ${({ theme, barColor }) =>
      barColor ? barColor : theme.palette.secondary.dark};
    border-radius: 4px 0 0 4px;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: height linear 0.2s;
    animation: inactive normal 0.2s;
  }

  ${({ animate }) =>
    animate &&
    css`
      @keyframes inactive {
        from {
          height: 100%;
          background: ${({ theme }) => theme.palette.secondary.main};
        }
        to {
          height: 0;
          background: ${({ theme }) => theme.palette.secondary.main};
        }
      }

      &:hover {
        &::before {
          background: ${({ theme }) => theme.palette.secondary.main};
          transition: height linear 0.2s;
          animation: active normal 0.2s;
        }

        @keyframes active {
          from {
            height: 0;
          }
          to {
            height: 100%;
          }
        }
      }
    `}
`

export const Section = styled(Box)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`

export const Title = styled(Typography)`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`

export const Text = styled(Typography)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.text.primary};
`

export const Status = styled(Box)`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.text.primary};
  width: fit-content;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  text-transform: capitalize;
  user-select: none;

  display: flex;
  align-items: center;
`

export const IconButton = styled(Box)<IconButtonProps>`
  color: ${({ theme }) => theme.palette.text.primary};
  background: ${({ bg }) => bg};

  width: 32px;
  height: 32px;
  border-radius: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: all ease 0.2s;

  &:hover {
    background: ${({ bg }) => bg};
    filter: brightness(1.15);

    ${({ disabled, theme }) =>
      disabled &&
      css`
        background: ${theme.palette.primary.dark};
        filter: brightness(0.9);
        cursor: not-allowed;
      `}
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background: ${theme.palette.primary.dark};
      filter: brightness(0.9);
      cursor: not-allowed;
    `}
`
