import React, { ReactNode } from 'react'

import { Container, Content } from './styles'
import { LinkProps } from 'next/link'

interface CustomLinkProps extends LinkProps {
  download?: boolean
  children: ReactNode
  target?: string
  rel?: string
}

export const Link: React.FC<CustomLinkProps> = ({
  download,
  children,
  target,
  href,
  rel,
}) => {
  return (
    <Container href={href} passHref>
      <Content target={target} rel={rel} download={download}>
        {children}
      </Content>
    </Container>
  )
}
