import React, { ReactElement } from 'react'
import { SiderbarProfile } from '@features/profile/Siderbar'
import { Container, Main } from './styles'
import { useMediaQuery } from '@mui/material'

type SiderbarLayout = {
  children: ReactElement
}

const ProfileLayout: React.FC<SiderbarLayout> = ({ children }) => {
  const matches = useMediaQuery('(min-width:600px)')
  return (
    <>
      <Container matches={matches}>
        <SiderbarProfile />

        <Main>{children}</Main>
      </Container>
    </>
  )
}

export default ProfileLayout
