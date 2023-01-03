import * as React from 'react'

import { useDebounceCallback } from '@react-hook/debounce'
import { PaginationParams } from '@hytzenshop/types'
import { makePrismaWhere } from '@hytzenshop/helpers'
import { useConfigTypes } from '@utils/types/config'
import { useBreakpoint } from '@hytzenshop/hooks'
import { useProducts } from '@hooks/useProducts'
import { useForm } from 'react-hook-form'

export const useProductsListPage = () => {
  const [state, dispatch] = React.useState<PaginationParams>({
    page: 1,
    limit: 10,
    filter: '',
    sort: 'createdAt',
    order: 'desc',
  })

  const [mobileInputs, setMobileInputs] = React.useState({
    category: false,
    search: false,
  })

  const [category, setCategory] = React.useState('')
  const [search, setSearch] = React.useState('')

  const { categoriesOptions } = useConfigTypes()
  const { control, register } = useForm()
  const { sm } = useBreakpoint()

  const options = React.useMemo(
    () => [{ label: 'Todos as categorias', value: '' }, ...categoriesOptions],
    [categoriesOptions]
  )

  const {
    getProducts: { data, isLoading },
    deleteProduct,
  } = useProducts({
    page: state.page,
    limit: state.limit,
    filter: state.filter,
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
