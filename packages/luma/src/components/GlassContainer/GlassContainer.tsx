import React from 'react'

import { c } from '../../utils/helpers'

export interface GlassContainerProps {
  children: React.ReactNode
  className?: string
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={c(
        'bg-gradient-to-tr from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.2)] bg-blend-overlay backdrop-blur-md shadow-md',
        className
      )}
    >
      {children}
    </div>
  )
}
