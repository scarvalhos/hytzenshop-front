import * as React from 'react'

import { PaginationParams, ProductGetAllDto } from '@hytzenshop/types'
import { getProductList, useProducts } from '@hooks/useProducts'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useDebounceCallback } from '@react-hook/debounce'
import { makePrismaWhere } from '@hytzenshop/helpers'
import { useConfigTypes } from '@utils/types/config'
import { useBreakpoint } from '@hytzenshop/hooks'
import { useForm } from 'react-hook-form'

interface ProductsListPageState extends PaginationParams {
  category?: string
  search?: string
  mobileInputs?: {
    category: boolean
    search: boolean
  }
}

export const useProductsListPage = () => {
  const [state, dispatch] = React.useReducer(
    (prev: ProductsListPageState, next: ProductsListPageState) => {
      return { ...prev, ...next }
    },
    {
      page: 1,
      limit: 10,
      filter: JSON.stringify({
        ...makePrismaWhere('', {
          OR: ['title'],
        }),
      }),
      sort: 'createdAt',
      order: 'desc',
      mobileInputs: {
        category: false,
        search: false,
      },
      category: '',
      search: '',
    }
  )

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

  const setPage = React.useCallback((page: number) => dispatch({ page }), [])

  const onChangeFilters = React.useCallback(() => {
    const filterString = JSON.stringify({
      ...(state.category !== '' && {
        categories: { has: state.category },
      }),

      ...makePrismaWhere(state.search || '', {
        OR: ['title'],
      }),
    })

    if (!filterString) return dispatch({ filter: undefined })

    return dispatch({ filter: filterString })
  }, [state])

  const onChangeFiltersDebounce = useDebounceCallback(onChangeFilters, 900)

  React.useEffect(
    () => onChangeFiltersDebounce(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.category, state.search]
  )

  return {
    ...state,
    setMobileInputs: (mobileInputs: { category: boolean; search: boolean }) =>
      dispatch({ mobileInputs }),
    setCategory: (category?: string) => dispatch({ category }),
    setSearch: (search?: string) => dispatch({ search }),
    deleteProduct,
    isLoading,
    register,
    options,
    control,
    setPage,
    data,
    sm,
  }
}
