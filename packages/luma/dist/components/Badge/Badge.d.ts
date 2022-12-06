import React from 'react'
export interface BadgeProps {
  className?: string
  children?: React.ReactNode
  content?: number
}
declare const Badge: React.FC<BadgeProps>
export default Badge
