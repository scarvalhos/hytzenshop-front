import React from 'react'

import { c } from '@utils/helpers'

interface ChipProps {
  label?: string
  variant?: 'filled' | 'outlined'
  size?: string | number
  onDelete?: () => void
  onClick?: () => void
  deleteIcon?: React.ReactNode
  rounded?: boolean
}

const Chip: React.FC<ChipProps> = ({
  label,
  variant,
  // size,
  // onDelete,
  // onClick,
  // deleteIcon,
  rounded,
}) => {
  return (
    <div
      className={c(
        'py-1 px-3 select-none',
        rounded ? 'rounded-full' : 'rounded-md',
        variant === 'filled'
          ? 'bg-dark-gray-400'
          : 'border border-dark-gray-200'
      )}
    >
      {label}
    </div>
  )
}

export default Chip
