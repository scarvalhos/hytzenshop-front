import React from 'react'

import { c } from '../../utils/helpers'

export interface ChipProps {
  label?: string
  variant?: 'filled' | 'outlined'
  size?: string | number
  onDelete?: () => void
  onClick?: () => void
  deleteIcon?: () => React.ReactNode
  rounded?: boolean
  className?: string
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant,
  onDelete,
  onClick,
  deleteIcon,
  rounded,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={c(
        'py-1 px-3 select-none flex flex-row items-center cursor-pointer hover:brightness-125',
        rounded ? 'rounded-full' : 'rounded-md',
        variant === 'filled'
          ? 'bg-dark-gray-400'
          : 'border border-dark-gray-200',
        deleteIcon && 'space-x-2',
        className
      )}
    >
      <p>{label}</p>
      <button onClick={onDelete}>{deleteIcon && deleteIcon()}</button>
    </div>
  )
}
