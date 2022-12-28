import * as React from 'react'
import * as Input from '@core/Input'

import { useDebounceCallback } from '@react-hook/debounce'
import { statusOrdersOptions } from '@hytzenshop/types'
import { makePrismaWhere } from '@hytzenshop/helpers'
import { useNewProduct } from '@hooks/useNewProduct'
import { useForm } from 'react-hook-form'
import { Loader } from '@luma/ui'

interface HeaderOrdersListProps {
  loading?: boolean
}

export const HeaderOrdersList: React.FC<HeaderOrdersListProps> = ({
  loading,
}) => {
  const [status, setStatus] = React.useState()
  const [search, setSearch] = React.useState()

  const { setFilter } = useNewProduct()

  const { control, register } = useForm()

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

  const onFiltersChange = React.useCallback(() => {
    if (filterString) {
      setFilter(filterString)
    } else {
      setFilter(undefined)
    }
  }, [filterString, setFilter])

  const onFiltersChangeDebounce = useDebounceCallback(onFiltersChange, 900)

  React.useEffect(
    () => onFiltersChangeDebounce(),
    [status, search, onFiltersChange, onFiltersChangeDebounce]
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
          <div className="flex flex-row items-center space-x-2"></div>

          <div className="flex flex-row space-x-2 w-[50%]">
            <Input.Select.Default
              name="status"
              placeholder="Filtre por status"
              variant="filled"
              options={options}
              onChangeValue={(e) => setStatus((e as any).value) as any}
              rounded
            />

            <Input.Field
              placeholder="Pesquisar"
              variant="filled"
              control={control}
              {...register('filter', {
                onChange: (e) => setSearch(e.target.value),
              })}
              rounded
            />
          </div>
        </div>
      </div>
    </div>
  )
}
