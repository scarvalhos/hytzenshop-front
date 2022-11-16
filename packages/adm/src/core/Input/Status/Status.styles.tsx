import styled from 'styled-components'

import { Listbox } from '@headlessui/react'
import { Stack } from '@mui/material'

export const Status = styled(Stack)`
  width: fit-content;
  flex-direction: row;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 0.75rem;
  text-transform: capitalize;
  user-select: none;
`

export const StatusButton = styled(Listbox.Button)`
  background: none;
  padding: 0;
`

export const StatusOptions = styled(Listbox.Options)`
  position: absolute;
  left: 0;
  padding: 0.5rem 0px;
  min-width: max-content;
  border-radius: 6px;
  background: ${({ theme }) => theme.palette.secondary.dark};
  z-index: 99999;
`
