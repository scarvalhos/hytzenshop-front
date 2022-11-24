import { Stack, Typography, Box } from '@mui/material'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import styled, { css } from 'styled-components'

interface IconProps {
  favorited?: 'FAVORITED' | 'NOT_FAVORITED'
}

interface QuantityButtonProps {
  name: 'increment' | 'decrement'
}

interface ImageProps {
  src: string
}

export const Container = styled(Stack)`
  position: relative;

  border-radius: 4px;
  background: ${({ theme }) => theme.palette.secondary.dark};
  border: 2px solid transparent;
  transition: all ease-in-out 0.15s;
`

export const CustomImage = styled(Box)<ImageProps>`
  background-image: url(${({ src }) => src});
  background-position: center;
  background-size: cover;

  border-radius: 4px;

  ${({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '120px',
    },

    [theme.breakpoints.up('sm')]: {
      width: '120px',
      height: '100%',
    },
  })}
`

export const Content = styled(Stack)`
  padding: 1rem 2rem 1rem 0;
  margin: 0;

  ${({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      padding: '0rem 2rem 2rem',
    },

    [theme.breakpoints.up('sm')]: {
      padding: '1rem 2rem 1rem 0',
    },
  })}
`

export const Title = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0;
`

export const QuantityContainer = styled(Stack)`
  box-shadow: 15px 3px 12px -4px rgba(0, 0, 0, 0.3);

  ${({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },

    [theme.breakpoints.up('sm')]: {
      width: 'fit-content',
    },
  })}
`

export const QuantityInput = styled.input`
  border: none;
  outline: none;

  padding-left: 1.25rem;
  font-size: 0.875rem;

  color: ${({ theme }) => theme.palette.text.primary};
  background: ${({ theme }) => theme.palette.secondary.dark};

  ${({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },

    [theme.breakpoints.up('sm')]: {
      width: '50px',
    },
  })}
`

export const QuantityButton = styled.button<QuantityButtonProps>`
  border: none;
  outline: none;

  color: ${({ theme }) => theme.palette.text.primary};
  background: ${({ theme }) => theme.palette.primary.dark};

  padding: 0.5rem;
  border-radius: ${({ name }) =>
    name === 'increment' ? '0 5px 5px 0' : '5px 0 0 5px'};

  &:disabled {
    color: ${({ theme }) => theme.palette.text.disabled};
    cursor: no-drop;
  }
`

export const FavoriteIt = styled.button<IconProps>`
  border: none;
  outline: none;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ favorited, theme }) =>
    favorited === 'FAVORITED'
      ? css`
          background: ${theme.palette.primary.main};
        `
      : css`
          background: ${theme.palette.primary.dark};
        `}

  color: ${({ theme }) => theme.palette.text.secondary};

  &:hover {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`

export const Favorite = styled(FavoriteBorderIcon)<IconProps>`
  font-size: 0.75rem;

  ${({ favorited, theme }) =>
    favorited === 'FAVORITED'
      ? css`
          color: ${theme.palette.primary.light};
        `
      : css`
          color: ${theme.palette.primary.contrastText};
        `}
`

export const DeleteIt = styled.button`
  border: none;
  outline: none;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  background: ${({ theme }) => theme.palette.primary.dark};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    font-size: 1rem;
  }
`

export const IconsContainer = styled(Stack)`
  position: absolute;
  top: 0;
  right: 10px;
`
