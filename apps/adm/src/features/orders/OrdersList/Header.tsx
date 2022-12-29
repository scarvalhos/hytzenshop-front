import * as React from 'react'
import * as Input from '@core/Input'

import { TbDownload, TbFilter, TbSearch } from 'react-icons/tb'
import { Order, statusOrdersOptions } from '@hytzenshop/types'
import { c, date, makePrismaWhere } from '@hytzenshop/helpers'
import { useDebounceCallback } from '@react-hook/debounce'
import { Button, Loader } from '@luma/ui'
import { useBreakpoint } from '@hytzenshop/hooks'
import { useForm } from 'react-hook-form'

import exportFromJSON from 'export-from-json'

interface HeaderOrdersListProps {
  loading?: boolean
  onFilterChange: (filter?: string) => void
  orders?: Order[]
}

export const HeaderOrdersList: React.FC<HeaderOrdersListProps> = ({
  loading,
  onFilterChange,
  orders,
}) => {
  const [mobileInputs, setMobileInputs] = React.useState({
    status: false,
    search: false,
  })

  const [status, setStatus] = React.useState()
  const [search, setSearch] = React.useState()

  const { control, register } = useForm()
  const { sm } = useBreakpoint()

  const options = React.useMemo(
    () => [{ label: 'Todos os status', value: '' }, ...statusOrdersOptions],
    []
  )

  const filterString = React.useMemo(
    () =>
      JSON.stringify({
        status: status || undefined,
        OR: [
          {
            mpPaymentId: {
              contains: search,
            },
          },
          ...makePrismaWhere(search || '', {
            OR: ['id', 'user.profile.completeName', 'user.username'],
          }).OR,
        ],
      }),
    [search, status]
  )

  const onChange = React.useCallback(() => {
    if (filterString) {
      onFilterChange(filterString)
    } else {
      onFilterChange(undefined)
    }
  }, [filterString, onFilterChange])

  const onChangeDebounce = useDebounceCallback(onChange, 900)

  React.useEffect(
    () => onChangeDebounce(),
    [status, search, onChange, onChangeDebounce]
  )

  return (
    <div className="sticky top-20 mb-8 z-40 bg-black">
      <div className="flex flex-row items-center justify-center space-x-2 w-fit relative">
        <h1 className="text-light-gray-100 py-2 bg-black font-semibold text-2xl">
          Pedidos
        </h1>

        {loading && <Loader className="sticky text-success-300" />}
      </div>

      <div className="bg-dark-gray-500 bg-opacity-40 space-y-2 px-6 py-4 rounded-md">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-2">
            <Button
              variant="filled"
              className="sm:relative sm:pl-10 max-sm:p-2.5"
              rounded
              onClick={() =>
                exportFromJSON({
                  data: orders || [],
                  fileName: `pedidos-${date(new Date().toString())}`.replaceAll(
                    '_',
                    '-'
                  ),
                  exportType: exportFromJSON.types.json,
                })
              }
            >
              <TbDownload className="sm:absolute sm:left-4" />
              <span className="max-sm:hidden">Exportar</span>
            </Button>
          </div>

          <div className="flex flex-row space-x-2 lg:w-[50%]">
            {sm ? (
              <>
                <Input.Select.Default
                  name="status"
                  placeholder="Filtre por status"
                  variant="filled"
                  options={options}
                  onChangeValue={(e) => setStatus((e as any).value) as any}
                  rounded
                />

                <Input.Field
                  variant="filled"
                  control={control}
                  placeholder="Pesquisar (Usuário ou nº do pedido)"
                  {...register('filter', {
                    onChange: (e) => setSearch(e.target.value),
                  })}
                  rounded
                />
              </>
            ) : (
              <>
                <Button
                  variant="filled"
                  className={c(
                    'sm:relative sm:pl-10 max-sm:p-2.5',
                    mobileInputs.status ? 'bg-success-400' : 'bg-dark-gray-500'
                  )}
                  rounded
                  onClick={() =>
                    setMobileInputs({
                      search: false,
                      status: !mobileInputs.status,
                    })
                  }
                >
                  <TbFilter className="sm:absolute sm:left-4" />
                </Button>

                <Button
                  variant="filled"
                  className={c(
                    'sm:relative sm:pl-10 max-sm:p-2.5',
                    mobileInputs.search ? 'bg-success-400' : 'bg-dark-gray-500'
                  )}
                  rounded
                  onClick={() =>
                    setMobileInputs({
                      search: !mobileInputs.search,
                      status: false,
                    })
                  }
                >
                  <TbSearch className="sm:absolute sm:left-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {!sm && (mobileInputs.status || mobileInputs.search) ? (
        <div className="bg-dark-gray-500 bg-opacity-40 space-y-2 px-6 py-4 rounded-md mt-2">
          {mobileInputs.status && (
            <Input.Select.Default
              name="status"
              placeholder="Filtre por status"
              variant="filled"
              options={options}
              onChangeValue={(e) => setStatus((e as any).value) as any}
              isFullWidth
              rounded
            />
          )}

          {mobileInputs.search && (
            <Input.Field
              placeholder="Pesquisar (Usuário ou nº do pedido)"
              variant="filled"
              control={control}
              {...register('filter', {
                onChange: (e) => setSearch(e.target.value),
              })}
              isFullWidth
              rounded
            />
          )}
        </div>
      ) : null}
    </div>
  )
}
