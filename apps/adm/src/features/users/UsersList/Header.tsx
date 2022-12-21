import * as React from 'react'
import * as Input from '@core/Input'

import { CircularProgress, Stack, Typography, useTheme } from '@mui/material'
import { useDebounceCallback } from '@react-hook/debounce'
import { makePrismaWhere } from '@hytzenshop/helpers'
import { useNewProduct } from '@hooks/useNewProduct'
import { TbCirclePlus } from 'react-icons/tb'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Button } from '@luma/ui'

interface HeaderUsersListProps {
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
        OR: ['profile.completeName', 'email'],
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
      bgcolor="black"
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
            variant="filled"
            className="relative pl-10"
            onClick={() => push('/admin/quik/users/new-user')}
            rounded
          >
            <TbCirclePlus size={20} className="absolute left-4" />
            Novo usuário
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

        <Stack direction="row" spacing={1} width="25%">
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
