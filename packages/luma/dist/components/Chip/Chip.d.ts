import React from 'react'
export interface ChipProps {
  label?: string
  variant?: 'filled' | 'outlined'
  size?: string | number
  onDelete?: () => void
  onClick?: () => void
  deleteIcon?: React.ReactNode
  rounded?: boolean
}
export declare const Chip: React.FC<ChipProps>
