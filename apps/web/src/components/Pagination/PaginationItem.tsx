import React from 'react'

interface PaginationItemProps {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export const PaginationItem: React.FC<PaginationItemProps> = ({
  isCurrent = false,
  number,
  onPageChange,
}) => {
  if (isCurrent) {
    return (
      <button className="rounded-[4px] w-[32px] h-[32px] p-1 text-base text-light-gray-100 bg-dark-gray-400 hover:bg-dark-gray-300">
        {number}
      </button>
    )
  }

  return (
    <button
      className="rounded-[4px] w-[32px] h-[32px] p-1 text-base text-light-gray-500 bg-dark-gray-400 hover:bg-dark-gray-300"
      onClick={() => onPageChange(number)}
    >
      {number}
    </button>
  )
}
