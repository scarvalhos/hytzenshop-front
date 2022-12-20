import * as React from 'react'
import * as Input from '@core/Input'

import { CircularProgress, Stack, Typography, useTheme } from '@mui/material'
import { useDebounceCallback } from '@react-hook/debounce'
import { makePrismaWhere } from '@hytzenshop/helpers'
import { useConfigTypes } from '@utils/types/config'
import { useNewProduct } from '@hooks/useNewProduct'
import { TbCirclePlus } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import { Button } from '@luma/ui'

interface HeaderProductsListProps {
  loading?: boolean
}

export const HeaderProductsList: React.FC<HeaderProductsListProps> = ({
  loading,
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
      bgcolor={palette.background.default}
      pb={3}
      spacing={1}
      sx={{
        position: 'sticky',
        top: '60px',
        zIndex: 9999,
      }}
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
          >
            <span className="flex flex-row">
              <TbCirclePlus size={20} style={{ marginRight: 4 }} />
              Novo produto
            </span>
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
