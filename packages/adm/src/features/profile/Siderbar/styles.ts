import styled from 'styled-components'

import { Stack, Typography } from '@mui/material'

interface CustomLinkProps {
  active?: boolean
}

export const Container = styled.div`
  padding: 4rem;
  max-width: fit-content;
`

export const Image = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
`

export const GreetingWrapper = styled(Stack).attrs({
  direction: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  spacing: 2,
})``

export const Greeting = styled(Typography)`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-top: 1rem;
  line-height: 1.25rem;
`

export const Nav = styled(Stack)`
  margin-top: 1rem;
`

export const CustomLink = styled.p<CustomLinkProps>`
  color: ${({ active, theme }) =>
    active ? theme.palette.success.main : theme.palette.text.secondary};
  background: none;
  border: none;
  outline: none;
  text-transform: capitalize;
  letter-spacing: 0;
  text-align: left;
  padding: 0 1rem;

  border-left: 1px solid
    ${({ theme, active }) =>
      active ? theme.palette.success.main : 'transparent'};

  &:hover {
    color: ${({ theme }) => theme.palette.success.main};
  }
`
