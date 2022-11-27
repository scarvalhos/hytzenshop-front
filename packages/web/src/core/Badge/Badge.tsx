import React from 'react'

import { c } from '@utils/helpers'

interface BadgeProps {
  className?: string
  children?: React.ReactNode
  content?: number
}

const Badge: React.FC<BadgeProps> = ({ children, content, className }) => {
  return (
    <div className="relative">
      {content !== 0 && (
        <div
          className={c(
            className,
            'w-4 h-4 rounded-full text-xs text-light-gray-100 border-[1.5px] border-dark-gray-500 flex items-center justify-center absolute top-1 -right-2'
          )}
        >
          {content}
        </div>
      )}
      {children}
    </div>
  )
}

export default Badge
