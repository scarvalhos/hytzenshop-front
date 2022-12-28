import * as React from 'react'
import * as Input from '@core/Input'

import { TbCirclePlus, TbDownload } from 'react-icons/tb'
import { date, makePrismaWhere } from '@hytzenshop/helpers'
import { useDebounceCallback } from '@react-hook/debounce'
import { useConfigTypes } from '@utils/types/config'
import { Button, Loader } from '@luma/ui'
import { useNewProduct } from '@hooks/useNewProduct'
import { useForm } from 'react-hook-form'
import { Product } from '@hytzenshop/types'

import exportFromJSON from 'export-from-json'

interface HeaderProductsListProps {
  loading?: boolean
  products?: Product[]
}

export const HeaderProductsList: React.FC<HeaderProductsListProps> = ({
  loading,
  products,
}) => {
  const [category, setCategory] = React.useState('')
  const [search, setSearch] = React.useState('')

  const { categoriesOptions } = useConfigTypes()
  const { control, register } = useForm()
  const { setFilter } = useNewProduct()

  const options = React.useMemo(
    () => [{ label: 'Todos as categorias', value: '' }, ...categoriesOptions],
    [categoriesOptions]
  )

  const onFiltersChange = React.useCallback(() => {
    const filterString = JSON.stringify({
      ...(category !== '' && {
        categories: { has: category },
      }),

      ...makePrismaWhere(search || '', {
        OR: ['title'],
      }),
    })

    if (filterString) {
      setFilter(filterString)
    } else {
      setFilter(undefined)
    }
  }, [category, search, setFilter])

  const onFiltersChangeDebounce = useDebounceCallback(onFiltersChange, 900)

  React.useEffect(
    () => onFiltersChangeDebounce(),
    [category, onFiltersChangeDebounce, search]
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
              className="md:relative md:pl-10 max-md:p-2.5 bg-success-400"
            >
              <TbCirclePlus size={20} className="md:absolute md:left-4" />
              <span className="max-md:hidden">Novo produto</span>
            </Button>

            <Button
              variant="outlined"
              rounded
              className="sm:relative sm:pl-10 max-sm:p-2.5"
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
              <TbDownload className="sm:absolute sm:left-4" />
              <span className="max-sm:hidden">Exportar</span>
            </Button>

            {loading && <Loader className="text-success-300" />}
          </div>

          <div className="flex flex-row space-x-2 w-[50%]">
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
          </div>
        </div>
      </div>
    </div>
  )
}
