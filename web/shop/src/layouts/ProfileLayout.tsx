import { useRouter } from 'next/router'

import Header from '@components/Header'
import React from 'react'

interface ProfileLayoutProps {
  children?: React.ReactNode
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  const { pathname } = useRouter()

  return (
    <>
      <Header
        {...((pathname === '/profile/dados-pessoais' ||
          pathname === '/profile/pedidos') && {
          glassEffect: true,
        })}
      />

      {children}
    </>
  )
}

export default ProfileLayout
