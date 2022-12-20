import styled from 'styled-components'

import { Typography } from '@mui/material'

export const Error = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 0.875rem;
  filter: brightness(1.1);
  white-space: pre-wrap;
`
