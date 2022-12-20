import { Stack, Typography, useTheme } from '@mui/material'
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
  const theme = useTheme()

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
    <Stack
      direction="row"
      py={2}
      spacing={1}
      width="100%"
      justifyContent="space-between"
      alignItems="flex-end"
    >
      <Stack direction="row" spacing={1}>
        <Typography fontWeight="bold" color="white">
          {currentPage * registersPerPage - registersPerPage + 1}
        </Typography>
        <Typography> - </Typography>
        <Typography fontWeight="bold" color="white">
          {currentPage === lastPage
            ? totalCountOfRegisters
            : registersPerPage * currentPage}
        </Typography>
        <Typography> de </Typography>
        <Typography fontWeight="bold" color="white">
          {totalCountOfRegisters}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1}>
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />

            {currentPage > 2 + siblingsCount && (
              <Typography color={theme.palette.text.disabled}>...</Typography>
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
              <Typography color={theme.palette.text.disabled}>...</Typography>
            )}

            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  )
}
