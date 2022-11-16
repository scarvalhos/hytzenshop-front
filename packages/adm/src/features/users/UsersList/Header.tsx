import * as React from 'react'
import * as Input from '@core/Input'

import { CircularProgress, Stack, Typography, useTheme } from '@mui/material'
import { useDebounceCallback } from '@react-hook/debounce'
import { makePrismaWhere } from '@utils/helpers'
import { useNewProduct } from '@hooks/useNewProduct'
import { TbCirclePlus } from 'react-icons/tb'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Button } from '@core/Button'

interface HeaderUsersListProps {
  refreshData: () => void
  loading?: boolean
}

export const HeaderUsersTable: React.FC<HeaderUsersListProps> = ({
  loading,
}) => {
  const [search, setSearch] = React.useState('')

  const { control, register } = useForm()
  const { setFilter } = useNewProduct()
  const { palette } = useTheme()
  const { push } = useRouter()

  const onFiltersChange = React.useCallback(() => {
    const filterString = JSON.stringify({
      ...makePrismaWhere(search || '', {
        OR: ['profile.completeName'],
      }),
    })

    if (filterString) {
      setFilter(filterString)
    } else {
      setFilter(undefined)
    }
  }, [search])

  const onFiltersChangeDebounce = useDebounceCallback(onFiltersChange, 900)

  React.useEffect(() => onFiltersChangeDebounce(), [search])

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
        Usuários
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            title="Novo usuário"
            icon={<TbCirclePlus size={20} style={{ marginRight: 4 }} />}
            variant="contained"
            onClick={() => push('/admin/quik/users/new-user')}
            fullWidth={false}
            rounded
          />

          {loading && (
            <CircularProgress
              size={18}
              sx={{
                color: palette.success.main,
              }}
            />
          )}
        </Stack>

        <Stack direction="row" spacing={1} width="25%">
          {/* <Input.Select.Default
            name="filter"
            placeholder="Filtre por categoria"
            variant="outlined"
            options={options}
            onChange={(e) => setCategory((e as any).value) as any}
            rounded
          /> */}

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
