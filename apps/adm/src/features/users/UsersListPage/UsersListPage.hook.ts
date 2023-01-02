import * as React from 'react'

import { PaginationParams, UserGetAllDto } from '@hytzenshop/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useDebounceCallback } from '@react-hook/debounce'
import { makePrismaWhere } from '@hytzenshop/helpers'
import { useBreakpoint } from '@hytzenshop/hooks'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { api } from '@hytzenshop/services'

const getUsersList = async ({
  filter,
  limit,
  order,
  page,
  sort,
}: PaginationParams): Promise<UserGetAllDto> => {
  const { data } = await api.get<UserGetAllDto>('/users', {
    params: {
      page,
      limit,
      filter,
      sort,
      order,
    },
  })

  return data
}

export const useUsersListPage = () => {
  const [state, dispatch] = React.useState<PaginationParams>({
    page: 1,
    limit: 10,
    filter: '',
    sort: 'createdAt',
    order: 'desc',
  })

  const [mobileSearch, setMobileSearch] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const { control, register } = useForm()
  const { push } = useRouter()
  const { sm } = useBreakpoint()

  const { data, isLoading } = useQuery(
    ['users', state.page, state.filter],
    () =>
      getUsersList({
        filter: state.filter,
        limit: state.limit,
        page: state.page,
        order: state.order,
        sort: state.sort,
      }),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<UserGetAllDto, unknown>

  const setPage = React.useCallback(
    (page: number) => {
      dispatch({
        ...state,
        page,
      })
    },
    [state]
  )

  const onFilterChange = React.useCallback(() => {
    const filterString = JSON.stringify({
      ...makePrismaWhere(search || '', {
        OR: ['profile.completeName', 'email'],
      }),
    })

    if (filterString) {
      dispatch({
        ...state,
        filter: filterString,
      })
    } else {
      dispatch({
        ...state,
        filter: undefined,
      })
    }
  }, [search, state])

  const onFilterChangeDebounce = useDebounceCallback(onFilterChange, 900)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => onFilterChangeDebounce(), [search])

  return {
    mobileSearch,
    setMobileSearch,
    setSearch,
    control,
    register,
    push,
    sm,
    data,
    isLoading,
    setPage,
    state,
  }
}
