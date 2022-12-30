import { c } from '../../utils/helpers'

import PropTypes from 'prop-types'
import React from 'react'

export interface BadgeProps {
  className?: string
  children?: React.ReactNode
  content?: number | string
}

const Badge: React.FC<BadgeProps> = ({ children, content, className }) => {
  return (
    <div className="relative">
      {content && content > 0 && (
        <div
          className={c(
            'w-4 h-4 rounded-full text-xs text-light-gray-100 border-[1.5px] border-dark-gray-500 flex items-center justify-center absolute top-1 -right-2',
            className
          )}
        >
          {content}
        </div>
      )}
      {children}
    </div>
  )
}

Badge.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  content: PropTypes.number,
}

export default Badge
