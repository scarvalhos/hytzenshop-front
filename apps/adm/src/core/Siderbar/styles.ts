import styled from 'styled-components'
import Link from 'next/link'

import { Box } from '@mui/material'

interface SubMenuItemProps {
  isActive: boolean
}

export const Container = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  display: flex;
  background: ${({ theme }) => theme.palette.background.default};

  transition: all ease-in-out 0.2s;
  z-index: 12000;
`

export const Nav = styled.div`
  position: relative;

  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem 0;
  border-right: 1px solid ${({ theme }) => theme.palette.primary.dark};
`

export const Logo = styled(Link)`
  font-weight: bold;
`

export const LogoLink = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const Active = styled.div`
  width: 2.25rem;
  height: 1.5rem;
  position: absolute;
  top: 0.25rem;
  left: -0.75rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.success.main};
  border-radius: 0px 15px 15px 0px;
  background: ${({ theme }) => theme.palette.primary.dark};
  box-shadow: 0px 4px 4px 0px #0000000a;

  padding-left: 0.75rem;
`

export const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5rem;
`

export const SubMenuItem = styled.span<SubMenuItemProps>`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  padding: 0.5rem 2rem;
  margin-right: 1rem;
  margin-bottom: 0.25rem;
  cursor: pointer;

  border-radius: 0px 1rem 1rem 0px;

  background: ${({ isActive, theme }) =>
    isActive ? theme.palette.success.light : 'transparent'};

  color: ${({ isActive, theme }) =>
    isActive ? theme.palette.success.main : theme.palette.text.secondary};

  &:hover {
    color: ${({ theme }) => theme.palette.success.main};
  }
`

export const SubMenuClosedItem = styled.span<SubMenuItemProps>`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  cursor: pointer;

  border-radius: 1rem;

  background: ${({ isActive, theme }) =>
    isActive ? theme.palette.success.light : 'transparent'};

  color: ${({ isActive, theme }) =>
    isActive ? theme.palette.success.main : theme.palette.text.secondary};

  &:hover {
    color: ${({ theme }) => theme.palette.success.main};
    background: ${({ theme }) => theme.palette.success.light};
  }
`

export const SubMenuTitle = styled.span`
  margin-left: 0.25rem;
`
