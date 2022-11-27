import styled from 'styled-components'
import { Button as MuiButton } from '@mui/material'

interface ButtonProps {
  cor: string
}

export const Container = styled.div`
  width: 94%;
  height: 100%;
  margin-top: 1rem;
  display: grid;
  grid-template-rows: 12% 88%;

  box-shadow: 0px 0px 79px 3px #0000000d;

  border-radius: 5px;
`

export const Header = styled.div`
  padding: 0.875rem 0;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
`

export const Body = styled.div`
  position: relative;
  overflow-y: auto;
  border-radius: 5px;
  margin-bottom: 0.5rem;
`

export const Button = styled(MuiButton)<ButtonProps>`
  padding: 1rem 1.5rem;
  text-transform: capitalize;
  font-weight: 600;
  letter-spacing: 0pt;
  margin: 0;
  border-radius: 20px;
  color: ${({ cor }) => cor};
  border-width: 1;

  &:disabled {
    color: #222222;
    border: 1px solid #222222;
    cursor: no-drop;
  }
`

export const ButtonAddProduct = styled(MuiButton)`
  padding: 1rem 1.5rem;
  text-transform: capitalize;
  font-weight: 600;
  letter-spacing: 0pt;
  margin: 0;
  border-radius: 20px;
  color: var(--white);

  background: ${({ theme }) => theme.palette.secondary.main};

  &:hover {
    background: ${({ theme }) => theme.palette.secondary.main};
    filter: brightness(1.1);
  }

  &:disabled {
    color: #333;
    background: #181818;
    cursor: no-drop;
  }
`
