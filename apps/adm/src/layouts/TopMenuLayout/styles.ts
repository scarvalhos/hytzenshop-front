import styled from 'styled-components'

import { Box } from '@mui/material'

export const Container = styled(Box)`
  width: 100%;
  height: 60px;
  padding: 0 2rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  position: sticky;
  top: 0;

  background: ${({ theme }) => theme.palette.background.default};
  z-index: 999;
`

interface MainProps {
  openSiderbar?: boolean
}

export const Main = styled(Box)<MainProps>`
  width: 70%;
  margin: ${({ openSiderbar }) => (openSiderbar ? '0 0 0 22%' : '0 auto')};
  position: relative;
`
