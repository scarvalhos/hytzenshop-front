import * as React from 'react'

import { PaginationParams, ProductGetAllDto } from '@hytzenshop/types'
import { getProductList, useProducts } from '@hooks/useProducts'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useDebounceCallback } from '@react-hook/debounce'
import { makePrismaWhere } from '@hytzenshop/helpers'
import { useConfigTypes } from '@utils/types/config'
import { useBreakpoint } from '@hytzenshop/hooks'
import { useForm } from 'react-hook-form'

export const useProductsListPage = () => {
  const [category, setCategory] = React.useState('')
  const [search, setSearch] = React.useState('')

  const [state, dispatch] = React.useState<PaginationParams>({
    page: 1,
    limit: 10,
    filter: JSON.stringify({
      ...makePrismaWhere('', {
        OR: ['title'],
      }),
    }),
    sort: 'createdAt',
    order: 'desc',
  })

  const [mobileInputs, setMobileInputs] = React.useState({
    category: false,
    search: false,
  })

  const { categoriesOptions } = useConfigTypes()
  const { control, register } = useForm()
  const { sm } = useBreakpoint()

  const options = React.useMemo(
    () => [{ label: 'Todos as categorias', value: '' }, ...categoriesOptions],
    [categoriesOptions]
  )

  const { data, isLoading } = useQuery(
    ['products', state.page, state.filter],
    () =>
      getProductList({
        page: state.page,
        limit: state.limit,
        filter: state.filter,
        sort: state.sort,
        order: state.order,
      }),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<ProductGetAllDto, unknown>

  const { deleteProduct } = useProducts(['products', state.page, state.filter])

  const setPage = React.useCallback(
    (page: number) => {
      dispatch({
        ...state,
        page,
      })
    },
    [state]
  )

  const onChangeFilters = React.useCallback(() => {
    const filterString = JSON.stringify({
      ...(category !== '' && {
        categories: { has: category },
      }),

      ...makePrismaWhere(search || '', {
        OR: ['title'],
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
  }, [category, search, state])

  const onChangeFiltersDebounce = useDebounceCallback(onChangeFilters, 900)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => onChangeFiltersDebounce(), [category, search])

  return {
    state,
    mobileInputs,
    setMobileInputs,
    setCategory,
    setSearch,
    control,
    register,
    sm,
    options,
    data,
    isLoading,
    deleteProduct,
    setPage,
  }
}
