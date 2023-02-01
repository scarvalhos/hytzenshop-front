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
    <T.Provider delayDuration={0}>
      <T.Root>
        <T.Trigger asChild>
          <span>{children}</span>
        </T.Trigger>
        <T.Portal>
          <T.Content
            sideOffset={4}
            side={side}
            className="rounded-lg text-primary bg-primary px-3 py-1 select-none z-[12001] TooltipContent mx-2 text-sm"
          >
            {content}
            <T.Arrow className="fill-light-gray-400 opacity-10 dark:opacity-100 dark:fill-dark-gray-200" />
          </T.Content>
        </T.Portal>
      </T.Root>
    </T.Provider>
  )
}
