import { Listbox } from '@headlessui/react'
import { styled } from '@stitches/react'
import { theme } from '@luma/ui'

export const Status = styled('div', {
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0.25rem 0.5rem',
  borderRadius: '50px',
  color: theme.colors['light-gray'][100],
  fontSize: '0.75rem',
  textRransform: 'capitalize',
  userSelect: 'none',
})

export const StatusButton = styled(Listbox.Button, {
  background: 'none',
  padding: 0,
})

export const StatusOptions = styled(Listbox.Options, {
  position: 'absolute',
  left: 0,
  marginTop: 10,
  padding: '0.5rem 0px',
  minWidth: 'max-content',
  borderRadius: '6px',
  background: theme.colors['dark-gray'][400],
  zIndex: 99999,
})
