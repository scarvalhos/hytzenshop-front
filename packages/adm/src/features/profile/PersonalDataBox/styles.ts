import { Typography } from '@mui/material'
import styled, { css } from 'styled-components'

interface Props {
  checkout?: boolean
}

export const Container = styled.div<Props>`
  padding-top: ${({ checkout }) => (checkout ? '0' : '5rem')};
`

export const ContentWrapper = styled.div<Props>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  border-radius: 5px;
  ${({ checkout }) =>
    checkout &&
    css`
      background: ${({ theme }) => theme.palette.secondary.dark};
    `}
`

export const ContentEditableWrapper = styled.div`
  display: grid;
  gap: 1rem;
  padding: 0 2rem;
  max-height: 70vh;
  overflow-y: auto;
  grid-template-columns: 1fr;

  ${({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  })}
`

export const Content = styled.div<Props>`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;

  ${({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  })}

  ${({ checkout }) =>
    checkout &&
    css`
      padding: 0em 3em;
      background: ${({ theme }) => theme.palette.secondary.dark};
    `}
`

export const ContentEditable = styled.form`
  max-width: fit-content;

  border-radius: 5px;
  border-radius: 5px;
  border: 1px solid #181818;

  position: relative;
  color: ${({ theme }) => theme.palette.text.secondary};
  padding: 2rem 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: fit-content;
  background: ${({ theme }) => theme.palette.secondary.dark};
  box-shadow: 24;
`

export const Wrapper = styled.div<Props>`
  ${({ checkout }) =>
    checkout &&
    css`
      padding: 0em 3em 3em;
    `}
`

export const Title = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.primary};
`

export const Label = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
`

export const Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
`
