import { styled } from '@stitches/react'

const GlassContainer = styled('div', {
  background:
    'linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, rgba(0, 0, 0, 0.1) 75%)',
  boxShadow: '0px 0px 12px 3px rgba(0, 0, 0, 0.4)',
  backgroundBlendMode: 'overlay',
  backdropFilter: 'blur(24px)',
})

export default GlassContainer
