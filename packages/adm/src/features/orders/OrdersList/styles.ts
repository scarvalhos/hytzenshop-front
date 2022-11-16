import styled from 'styled-components'

import { Stack, Typography } from '@mui/material'

export const Container = styled(Stack).attrs({
  spacing: 4,
})`
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      margin: '1rem 2rem 2rem',
    },

    [theme.breakpoints.up('md')]: {
      margin: '1rem 4rem 4rem',
    },
  })}
`

export const Title = styled(Typography)`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.primary};
`

export const List = styled(Stack).attrs({
  spacing: 1,
})``
