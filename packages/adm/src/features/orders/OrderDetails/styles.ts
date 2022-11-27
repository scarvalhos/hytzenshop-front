import styled from 'styled-components'

import { Box, Stack, Typography } from '@mui/material'

export const Container = styled(Stack)`
  position: relative;
`

export const Title = styled(Typography)`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.primary};
`

export const List = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  margin-top: 2rem;
`

// ---------------------------------------------------------------

interface Props {
  checkout?: boolean
}

export const ContentWrapper = styled(Box)<Props>`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 5px;
  background: ${({ theme }) => theme.palette.secondary.dark};
`

export const Wrapper = styled(Stack)<Props>``

export const Label = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-weight: 500;
  font-size: 0.875rem;
`
export const Text = styled(Typography)`
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
