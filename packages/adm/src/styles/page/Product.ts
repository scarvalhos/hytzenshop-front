import styled from 'styled-components'

import { Button as MuiButton, Stack, Typography } from '@mui/material'

interface SelectChipProps {
  isActive: boolean
}

export const Container = styled.div`
  width: 100%;
  display: grid;

  ${({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '2rem 4rem 0rem',
      gridTemplateColumns: '50% 50%',
    },
  })}
`

export const ImagesContainer = styled(Stack)`
  width: 100%;
`

export const PrimaryImage = styled.div`
  width: 70%;
  max-height: 460px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  border-radius: 5px;
`

export const SecondaryImagesContainer = styled(Stack)`
  /* width: 100px; */
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`

export const SecondaryImage = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 5px;
`

export const InfosProduct = styled.div`
  width: 100%;
  padding: 0 4rem;

  ${({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      padding: '0 2rem',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0 4rem',
    },
  })}
`

export const Title = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  text-transform: capitalize;
  margin: 0;
`

export const Description = styled.p`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  white-space: pre-wrap;
`

export const Price = styled.h3`
  color: ${({ theme }) => theme.palette.success.main};
  font-size: 1.75rem;
  margin: 0;
`

export const Text = styled.p`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 0.875rem;
  margin: 0;
`

export const SelectContainer = styled.div`
  margin: 20px 0;
`

export const SelectTitle = styled.p`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
`

export const SelectChipWrapper = styled(Stack)``

export const SelectChip = styled(MuiButton)<SelectChipProps>`
  font-size: 0.875rem;
  margin: 0;
  border-radius: 5px;
  text-transform: capitalize;
  max-width: fit-content;
  border: ${({ isActive, theme }) =>
    isActive
      ? `1px solid ${theme.palette.success.main}`
      : `1px solid ${theme.palette.primary.dark}`};
  color: ${({ isActive, theme }) =>
    isActive ? theme.palette.text.primary : theme.palette.text.secondary};
  transition: all ease-in-out 0.15s;

  &:hover {
    background: ${({ theme }) => theme.palette.background.default};
    border: 1px solid ${({ theme }) => theme.palette.success.main};
    color: ${({ theme }) => theme.palette.text.primary};
  }
`

export const ButtonsContainer = styled(Stack)`
  width: 300px;
`

export const FreteTitle = styled.p`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 1rem;
  font-weight: 500;
`

export const FreteContent = styled(Stack)``
