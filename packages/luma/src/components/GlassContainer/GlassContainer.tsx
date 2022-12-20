import React from 'react'

import { styled } from '@stitches/react'
import { c } from '../../utils/helpers'

export interface GlassContainerProps {
  children: React.ReactNode
  className?: string
}

const Container = styled('div', {
  background:
    'linear-gradient(45deg, rgba(0, 0, 0, 0.4) 25%, rgba(0, 0, 0, 0.2) 75%)',
  backgroundBlendMode: 'overlay',
})

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className,
}) => {
  return (
    <Container className={c('backdrop-blur-md shadow-md', className)}>
      {children}
    </Container>
  )
}
