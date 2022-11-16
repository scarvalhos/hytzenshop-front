import * as React from 'react'
import * as Input from '@core/Input'

import { CircularProgress, Stack, Typography, useTheme } from '@mui/material'
import { useDebounceCallback } from '@react-hook/debounce'
import { statusOrdersOptions } from '@utils/types'
import { makePrismaWhere } from '@utils/helpers'
import { useNewProduct } from '@hooks/useNewProduct'
import { useForm } from 'react-hook-form'

interface HeaderOrdersListProps {
  loading?: boolean
}

export const HeaderOrdersList: React.FC<HeaderOrdersListProps> = ({
  loading,
}) => {
  const [status, setStatus] = React.useState()
  const [search, setSearch] = React.useState()

  const { setFilter } = useNewProduct()
  const { palette } = useTheme()

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
    [status, search, onFiltersChange]
  )

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      bgcolor={palette.background.default}
      py={3}
      sx={{
        position: 'sticky',
        top: '2rem',
        zIndex: 9999,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h5" fontWeight="600" color={palette.text.primary}>
          Pedidos
        </Typography>

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
          name="status"
          placeholder="Filtre por status"
          variant="outlined"
          options={options}
          onChange={(e) => setStatus((e as any).value) as any}
          rounded
        />

        <Input.Field
          placeholder="Pesquisar"
          variant="outlined"
          control={control}
          {...register('filter', {
            onChange: (e) => setSearch(e.target.value),
          })}
          rounded
        />
      </Stack>
    </Stack>
  )
}
