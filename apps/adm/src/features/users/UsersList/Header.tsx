import * as React from 'react'
import * as Input from '@core/Input'

import { useDebounceCallback } from '@react-hook/debounce'
import { makePrismaWhere } from '@hytzenshop/helpers'
import { Button, Loader } from '@luma/ui'
import { useNewProduct } from '@hooks/useNewProduct'
import { TbCirclePlus } from 'react-icons/tb'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

interface HeaderUsersListProps {
  loading?: boolean
}

export const HeaderUsersTable: React.FC<HeaderUsersListProps> = ({
  loading,
}) => {
  const [search, setSearch] = React.useState('')

  const { control, register } = useForm()
  const { setFilter } = useNewProduct()
  const { push } = useRouter()

  const onFiltersChange = React.useCallback(() => {
    const filterString = JSON.stringify({
      ...makePrismaWhere(search || '', {
        OR: ['profile.completeName', 'email'],
      }),
    })

    if (filterString) {
      setFilter(filterString)
    } else {
      setFilter(undefined)
    }
  }, [search, setFilter])

  const onFiltersChangeDebounce = useDebounceCallback(onFiltersChange, 900)

  React.useEffect(
    () => onFiltersChangeDebounce(),
    [onFiltersChangeDebounce, search]
  )

  return (
    <div className="sticky top-20 mb-8 z-40 bg-black">
      <h1 className="text-light-gray-100 py-2 bg-black font-semibold text-2xl">
        Usuários
      </h1>

      <div className="bg-dark-gray-500 bg-opacity-40 space-y-2 px-6 py-4 rounded-md">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-2">
            <Button
              variant="filled"
              className="relative pl-10"
              onClick={() => push('/admin/quik/users/new-user')}
              rounded
            >
              <TbCirclePlus size={20} className="absolute left-4" />
              Novo usuário
            </Button>

            {loading && <Loader className="text-success-300" />}
          </div>

          <div className="flex flex-row w-[25%]">
            <Input.Field
              placeholder="Pesquisar"
              variant="filled"
              control={control}
              {...register('search', {
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
