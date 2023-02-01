import { c } from '@hytzenshop/helpers'

import React from 'react'

interface PaginationItemProps {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export const PaginationItem: React.FC<PaginationItemProps> = ({
  onPageChange,
  isCurrent = false,
  number,
}) => {
  const baseClassName =
    'rounded-md w-[32px] h-[32px] p-1 text-base font-semibold shadow-md'

  if (isCurrent) {
    return (
      <button
        className={c(
          baseClassName,
          'text-light-gray-100 bg-success-300 hover:brightness-110'
        )}
      >
        {number}
      </button>
    )
  }

  return (
    <button
      className={c(
        baseClassName,
        'text-secondary bg-primary bg-opacity-60 hover:bg-opacity-100'
      )}
      onClick={() => onPageChange(number)}
    >
      {number}
    </button>
  )
}
