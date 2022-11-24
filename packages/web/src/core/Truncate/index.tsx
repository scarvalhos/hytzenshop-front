import React from 'react'

import TextTruncate from 'react-text-truncate'

export const trucate = (text: string) => {
  return (
    <TextTruncate
      line={3}
      element="span"
      truncateText="…"
      text={text}
      textTruncateChild={
        <a href="#description" style={{ color: 'white' }}>
          Ver tudo
        </a>
      }
    />
  )
}
