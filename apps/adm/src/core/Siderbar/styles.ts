import { keyframes, styled } from '@stitches/react'

const scaleRight = keyframes({
  '0%': { transform: 'translateX(-80%)' },
  '100%': { transform: 'translateX(0%)' },
})

const scaleLeft = keyframes({
  '0%': { transform: 'translateX(0%)' },
  '100%': { transform: 'translateX(-80%)' },
})

const scaleRightMobile = keyframes({
  '0%': { transform: 'translateX(-100%)' },
  '100%': { transform: 'translateX(0%)' },
})

const scaleLeftMobile = keyframes({
  '0%': { transform: 'translateX(0%)' },
  '100%': { transform: 'translateX(-100%)' },
})

export const SiderBarContainer = styled('div', {
  variants: {
    animation: {
      left: {
        animation: `${scaleLeft} 350ms`,
      },
      right: {
        animation: `${scaleRight} 350ms`,
      },
    },

    animationMobile: {
      left: {
        animation: `${scaleLeftMobile} 350ms`,
      },
      right: {
        animation: `${scaleRightMobile} 350ms`,
      },
    },
  },
})

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

export const SubMenuItem = styled('button', {
  fontSize: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.25rem',
  cursor: 'pointer',

  variants: {
    open: {
      true: {
        padding: '0.5rem 2rem',
        marginRight: '1rem',
      },

      false: {
        padding: '0.5rem',
      },
    },
  },
})
