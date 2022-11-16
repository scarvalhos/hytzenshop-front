import * as React from 'react'

import { Container, Main } from './styles'
import { TbBell } from 'react-icons/tb'

import AccountMenu from '@core/AccountMenu'
import { IconButton, useTheme } from '@mui/material'

type TopMenuLayout = {
  children: React.ReactNode
  openSiderbar?: boolean
}

const TopMenuLayout: React.FC<TopMenuLayout> = ({ children, openSiderbar }) => {
  const { palette } = useTheme()
  return (
    <>
      <Container>
        <IconButton
          sx={{
            mr: 2,
            background: palette.primary.dark,
            ':hover': {
              background: palette.primary.dark,
              filter: 'brightness(1.25)',
            },
          }}
        >
          <TbBell size={18} color="white" />
        </IconButton>

        <AccountMenu />
      </Container>

      <Main openSiderbar={openSiderbar}>{children}</Main>
    </>
  )
}

export default TopMenuLayout
