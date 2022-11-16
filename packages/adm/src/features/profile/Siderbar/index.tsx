import React from 'react'

import {
  Container,
  GreetingWrapper,
  Greeting,
  Nav,
  CustomLink,
  Image,
} from './styles'

import { useRouter } from 'next/router'
import { useAuth } from '@hooks/useAuth'
import { Link } from '@core/Link'
import { Can } from '@core/Can'

export const SiderbarProfile: React.FC = () => {
  const { pathname } = useRouter()
  const { signOut } = useAuth()

  return (
    <Container>
      <GreetingWrapper>
        <Image src="https://github.com/scarvalhos.png" alt="Samara Carvalho" />
        <Greeting>
          Olá,
          <br />
          Samara!
        </Greeting>
      </GreetingWrapper>

      <Nav>
        <Link href="/profile/dados-pessoais">
          <CustomLink
            active={pathname === '/profile/dados-pessoais' ? true : false}
          >
            Dados pessoais
          </CustomLink>
        </Link>
        <Link href="/profile/pedidos">
          <CustomLink active={pathname.endsWith('/pedidos') ? true : false}>
            Meus pedidos
          </CustomLink>
        </Link>
        <Can isAdmin>
          <Link href="/admin">
            <CustomLink>Admin</CustomLink>
          </Link>
        </Can>
        <CustomLink onClick={signOut}>Sair</CustomLink>
      </Nav>
    </Container>
  )
}
