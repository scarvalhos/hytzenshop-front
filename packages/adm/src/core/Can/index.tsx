import { ReactNode } from 'react'
import { useCan } from '@hooks/useCan'

interface CanProps {
  children: ReactNode
  isAdmin?: boolean
}

export const Can: React.FC<CanProps> = ({ children, isAdmin }) => {
  const userCanSeeComponent = useCan({ isAdmin })

  if (!userCanSeeComponent) {
    return null
  }

  return <>{children}</>
}
