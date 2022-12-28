import * as React from 'react'
import * as op from 'object-path'

import { TbEye, TbTrash } from 'react-icons/tb'
import { Button } from '@luma/ui'
import { c } from '@hytzenshop/helpers'

import Image from 'next/image'

export interface Column<T = any> {
  Header: string
  align?: 'items-center' | 'items-start' | 'items-end'
  display?: 'flex-row' | 'flex-col'
  type?: 'file' | 'string'
  fileClassName?: string
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
}) => {
  return (
    <div className="w-full space-y-4">
      {rows.map((row, rowI) => (
        <div
          key={`r-${rowI}`}
          className="bg-dark-gray-500 bg-opacity-50 rounded-md pr-4 flex flex-row items-center"
        >
          {columns.map(
            ({
              accessor,
              type,
              fileClassName = 'w-[40px] h-[40px] rounded-md',
            }) => {
              const text =
                typeof accessor === 'function'
                  ? accessor(row) ?? '-'
                  : op.get(row as never, accessor) ?? '-'

              if (type === 'file') {
                return (
                  <div key={text} className={c('relative', fileClassName)}>
                    <Image
                      src={encodeURI(text)}
                      alt={text}
                      sizes="100%"
                      priority
                      fill
                      className="object-cover object-center rounded-md"
                    />
                  </div>
                )
              }
            }
          )}

          <div
            className="w-full grid py-4 px-4 gap-2"
            style={{
              gridTemplateColumns,
            }}
          >
            {columns.map(
              (
                {
                  accessor,
                  Header,
                  type,
                  align = 'items-start',
                  display = 'flex-col',
                },
                cellI
              ) => {
                const text =
                  typeof accessor === 'function'
                    ? accessor(row) ?? '-'
                    : op.get(row as never, accessor) ?? '-'

                if (type === 'file') return

                return (
                  <div
                    key={`${cellI}-r`}
                    className={c(
                      'flex justify-center space-y-1',
                      align,
                      display
                    )}
                  >
                    <p>{Header}</p>
                    <p className="text-light-gray-100 text-lg font-medium">
                      {text}
                    </p>
                  </div>
                )
              }
            )}
          </div>

          {deleteRow && (
            <Button
              onClick={() => onDelete && onDelete(row)}
              className="bg-dark-gray-400 hover:bg-dark-gray-300 transition-all p-3 mr-4"
              rounded
            >
              <TbTrash size={16} className="text-danger-300" />
            </Button>
          )}

          {details && (
            <Button
              onClick={() => onDetails && onDetails(row)}
              className="bg-dark-gray-400 hover:bg-dark-gray-300 transition-all p-3"
              rounded
            >
              <TbEye size={16} className="text-success-300" />
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}

export default ListCards
