import styled from 'styled-components'
import { Stack, Button as MuiButton } from '@mui/material'

export const Container = styled(Stack)`
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.secondary.dark};
  padding: 2rem;
  height: fit-content;
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0;
`

export const Total = styled.h3`
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0;
`

export const Text = styled.p`
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0;
`

export const Button = styled(MuiButton)`
  color: ${({ theme }) => theme.palette.text.primary};
  text-transform: capitalize;
  background: ${({ theme }) => theme.palette.secondary.main};
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme.palette.secondary.main};
    filter: brightness(1.1);
  }
`
