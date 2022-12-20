import { styled } from '@stitches/react'

import Image from 'next/image'

const ImageCore = styled(Image, {
  objectPosition: 'center',
  borderRadius: '4px',
  objectFit: 'cover',
})

ImageCore.defaultProps = {
  width: '200',
  height: '200',
}

export default ImageCore
