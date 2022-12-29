import * as React from 'react'
import * as Input from '@core/Input'

import { TbCirclePlus, TbDownload, TbFilter, TbSearch } from 'react-icons/tb'
import { c, date, makePrismaWhere } from '@hytzenshop/helpers'
import { useDebounceCallback } from '@react-hook/debounce'
import { useConfigTypes } from '@utils/types/config'
import { Button, Loader } from '@luma/ui'
import { useBreakpoint } from '@hytzenshop/hooks'
import { useForm } from 'react-hook-form'
import { Product } from '@hytzenshop/types'

import exportFromJSON from 'export-from-json'

interface HeaderProductsListProps {
  loading?: boolean
  products?: Product[]
  onFilterChange: (filter?: string) => void
}

export const HeaderProductsList: React.FC<HeaderProductsListProps> = ({
  loading,
  products,
  onFilterChange,
}) => {
  const [mobileInputs, setMobileInputs] = React.useState({
    category: false,
    search: false,
  })

  const [category, setCategory] = React.useState('')
  const [search, setSearch] = React.useState('')

  const { categoriesOptions } = useConfigTypes()
  const { control, register } = useForm()
  const { sm } = useBreakpoint()

  const options = React.useMemo(
    () => [{ label: 'Todos as categorias', value: '' }, ...categoriesOptions],
    [categoriesOptions]
  )

  const onChange = React.useCallback(() => {
    const filterString = JSON.stringify({
      ...(category !== '' && {
        categories: { has: category },
      }),

      ...makePrismaWhere(search || '', {
        OR: ['title'],
      }),
    })

    if (filterString) {
      onFilterChange(filterString)
    } else {
      onFilterChange(undefined)
    }
  }, [category, search, onFilterChange])

  const onChangeDebounce = useDebounceCallback(onChange, 900)

  React.useEffect(
    () => onChangeDebounce(),
    [category, onChangeDebounce, search]
  )

  return (
    <div className="sticky top-20 mb-8 z-40 bg-black">
      <h1 className="text-light-gray-100 py-2 bg-black font-semibold text-2xl">
        Produtos
      </h1>

      <div className="bg-dark-gray-500 bg-opacity-40 space-y-2 px-6 py-4 rounded-md">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-2">
            <Button
              href="/dashboard/products/new-product"
              variant="filled"
              rounded
              className="lg:relative lg:pl-10 max-lg:p-2.5 bg-success-400"
            >
              <TbCirclePlus size={20} className="lg:absolute lg:left-4" />
              <span className="max-lg:hidden">Novo produto</span>
            </Button>

            <Button
              variant="outlined"
              rounded
              className="lg:relative lg:pl-10 max-lg:p-2.5"
              onClick={() =>
                exportFromJSON({
                  data:
                    products?.map((product) => {
                      return {
                        ...product,
                        images: product.images.map((i) => i._id),
                      }
                    }) || [],
                  fileName: `produtos-${date(
                    new Date().toString()
                  )}`.replaceAll('_', '-'),
                  exportType: exportFromJSON.types.json,
                })
              }
            >
              <TbDownload className="lg:absolute lg:left-4" />
              <span className="max-lg:hidden">Exportar</span>
            </Button>

            {loading && <Loader className="text-success-300" />}
          </div>

          <div className="flex flex-row space-x-2 lg:w-[50%]">
            {sm ? (
              <>
                <Input.Select.Default
                  name="filter"
                  placeholder="Filtre por categoria"
                  variant="filled"
                  options={options}
                  onChangeValue={(e) => setCategory((e as any).value) as any}
                  rounded
                />

                <Input.Field
                  placeholder="Pesquisar"
                  variant="filled"
                  control={control}
                  {...register('search', {
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
                    mobileInputs.category
                      ? 'bg-success-400'
                      : 'bg-dark-gray-500'
                  )}
                  rounded
                  onClick={() =>
                    setMobileInputs({
                      search: false,
                      category: !mobileInputs.category,
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
                      category: false,
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

      {!sm && (mobileInputs.category || mobileInputs.search) ? (
        <div className="bg-dark-gray-500 bg-opacity-40 space-y-2 px-6 py-4 rounded-md mt-2 transition-all">
          {mobileInputs.category && (
            <Input.Select.Default
              name="filter"
              placeholder="Filtre por categoria"
              variant="filled"
              options={options}
              isFullWidth
              onChangeValue={(e) => setCategory((e as any).value) as any}
              rounded
            />
          )}

          {mobileInputs.search && (
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
          )}
        </div>
      ) : null}
    </div>
  )
}
