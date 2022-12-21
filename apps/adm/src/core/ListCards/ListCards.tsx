import * as React from 'react'
import * as op from 'object-path'

import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { CustomImage, ImageWrapper } from './style'
import { TbEye, TbTrash } from 'react-icons/tb'

export interface Column<T = any> {
  Header: string
  align?: 'center' | 'start' | 'end'
  display?: 'row' | 'column'
  type?: 'file' | 'string'
  isfileRounded?: boolean
  fileSize?: number
  sort?: string
  accessor: string | ((v: T) => React.ReactNode)
  tooltip?: string
  truncate?: boolean
  copy?: boolean
  width?: string
}

interface TableProps {
  columns: Column[]
  rows: unknown[]
  deleteRow?: boolean
  details?: boolean
  onDelete?: (row: unknown) => void
  onDetails?: (row: unknown) => void
  gridTemplateColumns?: string
  padding?: string
}

const ListCards: React.FC<TableProps> = ({
  columns,
  rows,
  deleteRow,
  details,
  onDelete,
  onDetails,
  gridTemplateColumns = '3fr 0.75fr 0.75fr 0.75fr 0.75fr',
  padding,
}) => {
  const theme = useTheme()

  return (
    <>
      <Stack spacing={2} width="100%">
        {rows.map((row, rowI) => (
          <Stack
            key={`r-${rowI}`}
            direction="row"
            alignItems="center"
            pr={2}
            borderRadius="4px"
            className="bg-dark-gray-500"
          >
            {columns.map(
              ({ accessor, type, fileSize = 110, isfileRounded = false }) => {
                const text =
                  typeof accessor === 'function'
                    ? accessor(row) ?? '-'
                    : op.get(row as never, accessor) ?? '-'

                if (type === 'file') {
                  return (
                    <ImageWrapper
                      key={text}
                      size={fileSize}
                      rounded={isfileRounded}
                    >
                      <CustomImage
                        src={encodeURI(text)}
                        alt={text}
                        rounded={isfileRounded}
                      />
                    </ImageWrapper>
                  )
                }
              }
            )}

            <Box
              width="100%"
              py={padding}
              sx={{
                display: 'grid',
                gridTemplateColumns,
                gap: 1,
                px: 3,
              }}
            >
              {columns.map(
                (
                  {
                    accessor,
                    Header,
                    type,
                    align = 'start',
                    display = 'column',
                  },
                  cellI
                ) => {
                  const text =
                    typeof accessor === 'function'
                      ? accessor(row) ?? '-'
                      : op.get(row as never, accessor) ?? '-'

                  if (type === 'file') return

                  return (
                    <Stack
                      key={`${cellI}-r`}
                      direction={display}
                      justifyContent={'center'}
                      alignItems={align}
                    >
                      <Typography color={theme.palette.text.disabled}>
                        {Header}
                      </Typography>
                      <Typography color={theme.palette.text.primary}>
                        {text}
                      </Typography>
                    </Stack>
                  )
                }
              )}
            </Box>

            {deleteRow && (
              <IconButton
                onClick={() => onDelete && onDelete(row)}
                className="bg-dark-gray-400 hover:bg-dark-gray-300 transition-all mr-4"
              >
                <TbTrash size={16} color={theme.palette.primary.main} />
              </IconButton>
            )}

            {details && (
              <IconButton
                onClick={() => onDetails && onDetails(row)}
                className="bg-dark-gray-400 hover:bg-dark-gray-300 transition-all"
              >
                <TbEye size={16} color={theme.palette.success.main} />
              </IconButton>
            )}
          </Stack>
        ))}
      </Stack>
    </>
  )
}

export default ListCards
