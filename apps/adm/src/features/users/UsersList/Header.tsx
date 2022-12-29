import * as React from 'react'
import * as Input from '@core/Input'

import { TbCirclePlus, TbDownload, TbSearch } from 'react-icons/tb'
import { c, date, makePrismaWhere } from '@hytzenshop/helpers'
import { useDebounceCallback } from '@react-hook/debounce'
import { Button, Loader } from '@luma/ui'
import { useBreakpoint } from '@hytzenshop/hooks'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { User } from '@hytzenshop/types'

import exportFromJSON from 'export-from-json'

interface HeaderUsersListProps {
  onFilterChange: (filter?: string) => void
  loading?: boolean
  users?: User[]
}

export const HeaderUsersTable: React.FC<HeaderUsersListProps> = ({
  loading,
  onFilterChange,
  users,
}) => {
  const [mobileSearch, setMobileSearch] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const { control, register } = useForm()
  const { push } = useRouter()
  const { sm } = useBreakpoint()

  const onChange = React.useCallback(() => {
    const filterString = JSON.stringify({
      ...makePrismaWhere(search || '', {
        OR: ['profile.completeName', 'email'],
      }),
    })

    if (filterString) {
      onFilterChange(filterString)
    } else {
      onFilterChange(undefined)
    }
  }, [search, onFilterChange])

  const onChangeDebounce = useDebounceCallback(onChange, 900)

  React.useEffect(() => onChangeDebounce(), [onChangeDebounce, search])

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
              className="p-3 sm:relative sm:pl-10"
              onClick={() => push('/admin/quik/users/new-user')}
              rounded
            >
              <TbCirclePlus size={20} className="sm:absolute sm:left-4" />
              <span className="max-sm:hidden">Novo usuário</span>
            </Button>

            <Button
              variant="outlined"
              rounded
              className="sm:relative sm:pl-10 max-sm:p-2.5"
              onClick={() =>
                exportFromJSON({
                  data: users || [],
                  fileName: `users-${date(new Date().toString())}`.replaceAll(
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

            {loading && <Loader className="text-success-300" />}
          </div>

          <div className="flex flex-row  lg:w-[30%]">
            {sm ? (
              <Input.Field
                placeholder="Pesquisar"
                variant="filled"
                control={control}
                {...register('search', {
                  onChange: (e) => setSearch(e.target.value),
                })}
                rounded
              />
            ) : (
              <Button
                variant="filled"
                className={c(
                  'sm:relative sm:pl-10 max-sm:p-2.5',
                  mobileSearch ? 'bg-success-400' : 'bg-dark-gray-500'
                )}
                rounded
                onClick={() => setMobileSearch(!mobileSearch)}
              >
                <TbSearch className="sm:absolute sm:left-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {!sm && mobileSearch ? (
        <div className="bg-dark-gray-500 bg-opacity-40 space-y-2 px-6 py-4 rounded-md mt-2 transition-all">
          <Input.Field
            placeholder="Pesquisar"
            variant="filled"
            control={control}
            isFullWidth
            {...register('search', {
              onChange: (e) => setSearch(e.target.value),
            })}
            rounded
          />
        </div>
      ) : null}
    </div>
  )
}
