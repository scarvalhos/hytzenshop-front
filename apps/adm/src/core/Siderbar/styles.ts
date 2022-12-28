import { styled } from '@stitches/react'

export const Nav = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '2rem 0',
})

export const SubMenu = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '1.5rem',
})

export const SubMenuItem = styled('span', {
  fontSize: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem 2rem',
  marginRight: '1rem',
  marginBottom: '0.25rem',
  cursor: 'pointer',
})

export const SubMenuClosedItem = styled('span', {
  fontSize: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem',
  marginBottom: '0.25rem',
  cursor: 'pointer',
  borderRadius: '1rem',
})
