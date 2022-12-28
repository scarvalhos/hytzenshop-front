import * as React from 'react'

import { c } from '@hytzenshop/helpers'

interface BoxSectionProps {
  title: string
  description?: string
  children?: React.ReactNode
  renderAfterTitle?: () => React.ReactNode
  className?: string
}

const BoxSection: React.FC<BoxSectionProps> = React.forwardRef(
  (
    { title, description = '', children, renderAfterTitle, className },
    _ref
  ) => {
    return (
      <div className={c(className, 'flex-1')}>
        <div className="space-y-2">
          <div className="flex flex-row items-center space-x-2">
            <p className="text-light-gray-100 font-medium">{title}</p>
            {renderAfterTitle && renderAfterTitle()}
          </div>

          <p className="text-sm">{description}</p>
        </div>

        {children}
      </div>
    )
  }
)

export default BoxSection
