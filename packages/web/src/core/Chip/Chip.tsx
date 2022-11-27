import { c } from '@utils/helpers'
import React from 'react'

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

// sx={{

//   ...(chipVariant === 'filled' && {
//     background: theme.palette.secondary.dark,
//     px: 1,
//     ':hover': {
//       background: theme.palette.primary.dark,
//     },
//   }),
//   ...(chipVariant === 'outlined' && {
//     borderColor: theme.palette.secondary.dark,
//     px: 1,
//     ':hover': {
//       borderColor: theme.palette.primary.dark,
//     },
//   }),
// }}

export default Chip
