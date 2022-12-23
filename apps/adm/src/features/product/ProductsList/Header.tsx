import * as React from 'react'
import * as Input from '@core/Input'

import { CircularProgress, Stack, Typography, useTheme } from '@mui/material'
import { TbCirclePlus, TbDownload } from 'react-icons/tb'
import { date, makePrismaWhere } from '@hytzenshop/helpers'
import { useDebounceCallback } from '@react-hook/debounce'
import { useConfigTypes } from '@utils/types/config'
import { useNewProduct } from '@hooks/useNewProduct'
import { useForm } from 'react-hook-form'
import { Product } from '@hytzenshop/types'
import { Button } from '@luma/ui'

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
  const { palette } = useTheme()

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
    <Stack
      pb={3}
      spacing={1}
      sx={{
        position: 'sticky',
        top: '60px',
        zIndex: 9999,
      }}
      className="bg-black"
    >
      <Typography variant="h5" fontWeight="600" color={palette.text.primary}>
        Produtos
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
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
                fileName: `produtos-${date(new Date().toString())}`.replaceAll(
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

          {loading && (
            <CircularProgress
              size={18}
              sx={{
                color: palette.success.main,
              }}
            />
          )}
        </Stack>

        <Stack direction="row" spacing={1} width="50%">
          <Input.Select.Default
            name="filter"
            placeholder="Filtre por categoria"
            variant="outlined"
            options={options}
            onChange={(e) => setCategory((e as any).value) as any}
            rounded
          />

          <Input.Field
            placeholder="Pesquisar"
            variant="outlined"
            control={control}
            {...register('search', {
              onChange: (e) => setSearch(e.target.value),
            })}
            rounded
          />
        </Stack>
      </Stack>
    </Stack>
  )
}
