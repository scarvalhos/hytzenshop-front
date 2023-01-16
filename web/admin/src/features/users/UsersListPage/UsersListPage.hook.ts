import * as React from 'react'

import { PaginationParams, UserGetAllDto } from '@hytzenshop/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useDebounceCallback } from '@react-hook/debounce'
import { makePrismaWhere } from '@hytzenshop/helpers'
import { useBreakpoint } from '@hytzenshop/hooks'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { api } from '@hytzenshop/services'

const getUsersList = async (
  params: PaginationParams
): Promise<UserGetAllDto> => {
  const { data } = await api.get<UserGetAllDto>('/users', {
    params,
  })

  return data
}

interface UsersListPageState extends PaginationParams {
  search?: string
  mobileSearch?: boolean
}

export const useUsersListPage = () => {
  const [state, dispatch] = React.useReducer(
    (prev: UsersListPageState, next: UsersListPageState) => {
      return { ...prev, ...next }
    },
    {
      page: 1,
      limit: 10,
      filter: '',
      sort: 'createdAt',
      order: 'desc',
      mobileSearch: false,
      search: '',
    }
  )

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

  const setPage = React.useCallback((page: number) => dispatch({ page }), [])

  const onFilterChange = React.useCallback(() => {
    const filterString = JSON.stringify({
      ...makePrismaWhere(state.search || '', {
        OR: ['profile.completeName', 'email'],
      }),
    })

    if (!filterString) return dispatch({ filter: undefined })

    return dispatch({ filter: filterString })
  }, [state])

  const onFilterChangeDebounce = useDebounceCallback(onFilterChange, 900)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => onFilterChangeDebounce(), [state.search])

  return {
    setMobileSearch: (mobileSearch?: boolean) => dispatch({ mobileSearch }),
    setSearch: (search?: string) => dispatch({ search }),
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
