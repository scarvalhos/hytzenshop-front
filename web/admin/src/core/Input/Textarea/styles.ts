import { theme } from '@luma/ui'
import { styled } from '@stitches/react'

export const Field = styled('textarea', {
  flex: 1,
  width: '100%',

  border: 'none',
  outline: 'none',
  background: 'none',

  fontSize: '1rem',
  display: 'inline-block',

  color: theme.colors['light-gray'][100],

  resize: 'none',
})
