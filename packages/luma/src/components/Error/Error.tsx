import React from 'react'

import { styled } from '@stitches/react'

export interface ErrorProps {
  children?: React.ReactNode
}

export const Error: React.FC<ErrorProps> = ({ children }) => {
  const ErrorP = styled('p', {
    fontSize: '0.875rem',
    filter: ' brightness(1.1)',
    whiteSpace: 'pre-wrap',
  })

  return <ErrorP className="text-danger-300">{children}</ErrorP>
}
