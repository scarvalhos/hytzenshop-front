import React from 'react'

import { PaginationItem } from './PaginationItem'

interface PaginationProps {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePageArray(from: number, to: number) {
  const newArray = [...new Array(to - from)]

  const indexNewArray = newArray.length

  return newArray.map(() => from + indexNewArray).filter((page) => page > 0)
}

export const Pagination: React.FC<PaginationProps> = ({
  totalCountOfRegisters,
  currentPage = 1,
  onPageChange,
  registersPerPage = 10,
}) => {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)

  const previousPages =
    currentPage > 1
      ? generatePageArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePageArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : []

  return (
    <div className="flex flex-row py-4 space-x-2 w-full justify-between items-end">
      <div className="flex flex-row space-x-2">
        <p className="font-bold text-light-gray-100">
          {currentPage * registersPerPage - registersPerPage + 1}
        </p>
        <p> - </p>
        <p className="font-bold text-light-gray-100">
          {currentPage === lastPage
            ? totalCountOfRegisters
            : registersPerPage * currentPage}
        </p>
        <p> de </p>
        <p className="font-bold text-light-gray-100">{totalCountOfRegisters}</p>
      </div>

      <div className="flex flex-row space-x-2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />

            {currentPage > 2 + siblingsCount && (
              <p className="text-light-gray-300">...</p>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
            )
          })}

        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
            )
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount === lastPage && (
              <p className="text-light-gray-300">...</p>
            )}

            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </div>
    </div>
  )
}
