import * as T from '@radix-ui/react-tooltip'

import React from 'react'

export interface TooltipProps extends T.TooltipContentProps {
  children: React.ReactNode
  content: React.ReactNode
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  side,
}) => {
  return (
    <T.Provider delayDuration={100}>
      <T.Root>
        <T.Trigger asChild>
          <span>{children}</span>
        </T.Trigger>
        <T.Portal>
          <T.Content
            sideOffset={4}
            side={side}
            className="rounded-md bg-dark-gray-200 px-2 py-1 select-none z-[12001] TooltipContent mx-2 text-sm"
          >
            {content}
            <T.Arrow className="fill-dark-gray-200" />
          </T.Content>
        </T.Portal>
      </T.Root>
    </T.Provider>
  )
}
