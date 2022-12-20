import { TbCheck, TbCopy } from 'react-icons/tb'

import React from 'react'
import copy from 'copy-to-clipboard'

export interface CopyToClipboardProps {
  value: string
  truncate?: boolean
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  value,
  truncate,
}) => {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<NodeJS.Timeout>()

  const onClick = React.useCallback(() => {
    setCopied(copy(value))
  }, [value])

  React.useEffect(() => {
    timer.current = setTimeout(setCopied, 1000, false)
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [copied])

  return (
    <span>
      {truncate ? value.slice(0, 40) : value}

      <button onClick={onClick} className="ml-1">
        {copied ? (
          <TbCheck color="#44d063" size={18} />
        ) : (
          <TbCopy color="#44d063" size={18} />
        )}
      </button>
    </span>
  )
}
