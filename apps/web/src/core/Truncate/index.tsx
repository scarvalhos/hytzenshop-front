import TextTruncate from 'react-text-truncate'
import React from 'react'

export const trucate = ({
  text,
  line = 3,
  etc,
}: {
  text: string
  line?: number
  etc?: React.ReactNode
}) => {
  return (
    <TextTruncate
      line={line}
      element="span"
      truncateText="…"
      text={text}
      textTruncateChild={etc}
    />
  )
}
