import * as React from 'react'
import * as op from 'object-path'

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { TbEye, TbTrash } from 'react-icons/tb'
import { useBreakpoint } from '@hytzenshop/hooks'
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
  aferHeader?: () => React.ReactNode
}

interface TableProps {
  columns: Column[]
  rows: unknown[]
  deleteRow?: boolean
  details?: boolean
  onDelete?: (row: unknown) => void
  onDetails?: (row: unknown) => string
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
  const [mobileOpenedCardsId, setMobileOpenedCardsId] = React.useState<
    string | null
  >()

  const { lg } = useBreakpoint()

  return (
    <div className="w-full space-y-4">
      {rows.map((row, rowI) => (
        <div
          key={`r-${rowI}`}
          className="bg-primary rounded-md lg:pr-4 flex flex-col lg:flex-row lg:items-center"
        >
          <div className="flex flex-row items-center justify-between max-lg:my-4 max-lg:mx-4">
            <span className="flex flex-row items-center ">
              {columns.map(
                ({
                  accessor,
                  type,
                  fileClassName = 'w-8 lg:w-[40px] h-8 lg:h-[40px] rounded-md',
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
                          className="object-cover object-center rounded-md"
                          sizes="100%"
                          priority
                          fill
                        />
                      </div>
                    )
                  }
                }
              )}

              {!lg &&
                columns.map(({ accessor, Header }, cellI) => {
                  const text =
                    typeof accessor === 'function'
                      ? accessor(row) ?? '-'
                      : op.get(row as never, accessor) ?? '-'

                  if (accessor === 'title') {
                    return (
                      <div key={`${cellI}-r`} className="px-4">
                        <p className="text-secondary">{Header}</p>
                        <p className="text-primary text-lg font-medium">
                          {text}
                        </p>
                      </div>
                    )
                  }
                })}
            </span>

            {!lg && (
              <Button
                className="bd-secondary p-3 lg:hidden"
                rounded
                onClick={() =>
                  mobileOpenedCardsId !== (row as any).id
                    ? setMobileOpenedCardsId((row as any).id)
                    : setMobileOpenedCardsId(null)
                }
              >
                {mobileOpenedCardsId !== (row as any).id ? (
                  <IoIosArrowDown />
                ) : (
                  <IoIosArrowUp />
                )}
              </Button>
            )}
          </div>

          {((!lg && mobileOpenedCardsId === (row as any).id) || lg) && (
            <span className="flex flex-col lg:flex-row lg:items-center w-full">
              <div
                className="w-full grid py-4 px-4 gap-2"
                style={{
                  gridTemplateColumns: lg ? gridTemplateColumns : '1fr',
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
                      aferHeader,
                    },
                    cellI
                  ) => {
                    const text =
                      typeof accessor === 'function'
                        ? accessor(row) ?? '-'
                        : op.get(row as never, accessor) ?? '-'

                    if (type === 'file') return

                    if (!lg && accessor === 'title') return

                    return (
                      <div
                        key={`${cellI}-r`}
                        className={c(
                          'flex max-lg:flex-row max-lg:justify-between justify-center max-lg:items-center max-lg:bg-third max-lg:space-x-2 lg:space-y-1 max-lg:px-4 max-lg:py-2 max-lg:rounded-md',
                          lg && align,
                          lg && display
                        )}
                      >
                        <span
                          className={c(
                            'flex justify-center items-center w-fit',
                            aferHeader && 'space-x-1'
                          )}
                        >
                          <p className="max-lg:text-right text-secondary">
                            {Header}
                          </p>
                          {aferHeader && aferHeader()}
                        </span>
                        <p className="text-primary text-lg font-medium">
                          {text}
                        </p>
                      </div>
                    )
                  }
                )}
              </div>

              <div className="flex justify-center items-center space-x-2 max-lg:mb-4 max-lg:px-4">
                {deleteRow ? (
                  <Button
                    onClick={() => onDelete && onDelete(row)}
                    variant="outlined-danger"
                    className="transition-all lg:p-3 max-lg:w-full"
                    rounded
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <TbTrash size={16} />
                      <p className="lg:hidden font-medium">Excluir</p>
                    </span>
                  </Button>
                ) : null}

                {details ? (
                  <Button
                    href={onDetails ? onDetails(row) : '/'}
                    variant={lg ? 'outlined' : 'filled'}
                    className="transition-all lg:p-3 max-lg:w-full"
                    rounded
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <TbEye size={16} />
                      <p className="lg:hidden font-medium">Ver produto</p>
                    </span>
                  </Button>
                ) : null}
              </div>
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default ListCards
