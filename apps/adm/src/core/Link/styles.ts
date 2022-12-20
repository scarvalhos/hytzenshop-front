import Link from 'next/link'
import styled from 'styled-components'

export const Container = styled(Link)``

export const Content = styled.a`
  color: ${({ theme }) => theme.palette.primary.light};
`
