import { useCan } from '@hytzenshop/hooks'
import { User } from '@hytzenshop/types'

import React from 'react'

export interface CanProps {
  children: React.ReactNode
  isAuthenticated?: boolean
  isAdmin?: boolean
  user: User | null
}

export const Can: React.FC<CanProps> = ({
  children,
  isAdmin,
  user,
  isAuthenticated,
}) => {
  const userCanSeeComponent = useCan({ isAdmin, user, isAuthenticated })

  return !userCanSeeComponent ? null : <>{children}</>
}
