import styled from 'styled-components'

import { Modal, Stack, Typography } from '@mui/material'

export const Container = styled(Modal)``

export const Content = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background: #151515;
  border-radius: 8px;

  ${({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '90vw',
    },
  })}
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0;
  margin-top: 1rem;
  text-align: center;
`

export const Description = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  margin: 0;
  text-align: center;
`

export const Text = styled(Typography)`
  color: #777777;
  flex: 1;
`

export const Number = styled.span`
  width: 24px;
  height: 24px;
  font-size: 0.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #44d063;
  border-width: 1px;
  border-style: solid;
  border-color: #44d063;
  border-radius: 50%;
  margin-right: 10px;
`

export const Label = styled.label`
  color: white;
  font-size: 0.875rem;
  margin-top: 1rem;
`

export const InputWrapper = styled(Stack).attrs({
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})`
  margin-top: 0.875rem;
  padding: 0.875rem 1rem;
  border-radius: 4px;

  font-size: 0.875rem;
  font-weight: 300;

  background: linear-gradient(
    186.62deg,
    rgba(221, 218, 255, 0.06) 10%,
    rgba(217, 214, 252, 0.03) 30%
  );

  background-blend-mode: overlay;
  backdrop-filter: blur(10px);

  border: 2px solid rgba(200, 200, 200, 0.02);
  box-shadow: 0px 0px 79px 3px #0000000d;

  &::placeholder {
    color: white;
  }
`

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: none;
  color: white;
`
