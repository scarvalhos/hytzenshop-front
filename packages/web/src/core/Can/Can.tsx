import { useCan } from '@hooks/useCan'

import React from 'react'

interface CanProps {
  children: React.ReactNode
  isAdmin?: boolean
}

const Can: React.FC<CanProps> = ({ children, isAdmin }) => {
  const userCanSeeComponent = useCan({ isAdmin })

  if (!userCanSeeComponent) {
    return null
  }

  return <>{children}</>
}

export default Can
