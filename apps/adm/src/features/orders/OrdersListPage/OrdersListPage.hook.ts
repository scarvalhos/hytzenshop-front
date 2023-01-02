import * as React from 'react'

import { PaginationParams, statusOrdersOptions } from '@hytzenshop/types'
import { useDebounceCallback } from '@react-hook/debounce'
import { makePrismaWhere } from '@hytzenshop/helpers'
import { useBreakpoint } from '@hytzenshop/hooks'
import { useOrders } from '@hooks/useOrders'
import { useForm } from 'react-hook-form'

export const useOrdersListPage = () => {
  const [state, dispatch] = React.useState<PaginationParams>({
    page: 1,
    limit: 10,
    filter: '',
    sort: 'createdAt',
    order: 'desc',
  })

  const [mobileInputs, setMobileInputs] = React.useState({
    status: false,
    search: false,
  })

  const [status, setStatus] = React.useState()
  const [search, setSearch] = React.useState()

  const { control, register } = useForm()
  const { sm } = useBreakpoint()

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

  const {
    getOrders: { data, isLoading },
  } = useOrders({
    page: state.page,
    limit: state.limit,
    filter: state.filter,
    order: state.order,
    sort: state.sort,
  })

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
  }, [filterString, state])

  const onFilterChangeDebounce = useDebounceCallback(onFilterChange, 900)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => onFilterChangeDebounce(), [status, search])

  return {
    setMobileInputs,
    mobileInputs,
    setStatus,
    setSearch,
    isLoading,
    register,
    setPage,
    options,
    control,
    state,
    data,
    sm,
  }
}
