import * as React from 'react'

import {
  OrderStatus,
  PaginationParams,
  statusOrdersOptions,
} from '@hytzenshop/types'

import { useDebounceCallback } from '@react-hook/debounce'
import { makePrismaWhere } from '@hytzenshop/helpers'
import { useBreakpoint } from '@hytzenshop/hooks'
import { useOrders } from '@hooks/useOrders'
import { useForm } from 'react-hook-form'

interface OrdersListPageState extends PaginationParams {
  status?: OrderStatus
  search?: string
  mobileInputs?: {
    status: boolean
    search: boolean
  }
}

export const useOrdersListPage = () => {
  const [state, dispatch] = React.useReducer(
    (prev: OrdersListPageState, next: OrdersListPageState) => {
      return { ...prev, ...next }
    },
    {
      page: 1,
      limit: 10,
      filter: '',
      sort: 'createdAt',
      order: 'desc',
      status: undefined,
      search: undefined,
      mobileInputs: {
        status: false,
        search: false,
      },
    }
  )

  const { control, register } = useForm()
  const { sm } = useBreakpoint()

  const options = React.useMemo(
    () => [{ label: 'Todos os status', value: '' }, ...statusOrdersOptions],
    []
  )

  const filterString = React.useMemo(
    () =>
      JSON.stringify({
        status: state.status || undefined,
        OR: [
          {
            mpPaymentId: {
              contains: state.search,
            },
          },
          ...makePrismaWhere(state.search || '', {
            OR: ['id', 'user.profile.completeName', 'user.username'],
          }).OR,
        ],
      }),
    [state.search, state.status]
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

  const setPage = React.useCallback((page: number) => dispatch({ page }), [])

  const onFilterChange = React.useCallback(() => {
    if (!filterString) return dispatch({ filter: undefined })

    return dispatch({ filter: filterString })
  }, [filterString])

  const onFilterChangeDebounce = useDebounceCallback(onFilterChange, 900)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => onFilterChangeDebounce(), [state.status, state.search])

  return {
    mobileInputs: state.mobileInputs,
    setMobileInputs: (mobileInputs: { status: boolean; search: boolean }) =>
      dispatch({ mobileInputs }),
    setStatus: (status: OrderStatus) => dispatch({ status }),
    setSearch: (search: string) => dispatch({ search }),
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
