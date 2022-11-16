import * as React from 'react'
import * as T from '@radix-ui/react-tooltip'

import { ReactNode } from 'react'

import styled from 'styled-components'

interface TooltipProps {
  text: string | ((value: boolean) => ReactNode)
  children: React.ReactNode
  cursor?: string
}

const P = styled.p`
  margin: 0;
  background: ${({ theme }) => theme.palette.primary.dark};
  color: ${({ theme }) => theme.palette.text.primary};
  border-radius: 8px;
  padding: 8px;
  font-size: 0.75rem;
  text-align: left;
`

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  cursor = 'default',
}) => {
  const [open, setOpen] = React.useState(false)
  return (
    <T.Provider delayDuration={0}>
      <T.Root onOpenChange={setOpen}>
        <T.Trigger style={{ padding: 0, background: 'none', cursor }}>
          {children}
        </T.Trigger>

        <T.Content align="center" style={{ marginBottom: 8 }}>
          <P>{typeof text === 'function' ? text(open) : text}</P>
        </T.Content>
      </T.Root>
    </T.Provider>
  )
}

export default Tooltip
