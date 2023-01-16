import { useDebounceCallback } from '@react-hook/debounce'
import { PaginationParams } from '@hytzenshop/types'
import { makePrismaWhere } from '@hytzenshop/helpers'
import { useConfigTypes } from '@utils/types/config'
import { useProducts } from '@hooks/useProducts'
import { Pagination } from '@luma/ui'

import ProductSection from '@features/product/ProductSection/ProductSection'
import TabsFilters from '@components/TabsFilters'
import React from 'react'

const MainProductsList: React.FC = () => {
  const [state, dispatch] = React.useReducer(
    (prev: PaginationParams, next: PaginationParams) => {
      return { ...prev, ...next }
    },
    {
      page: 1,
      limit: 20,
      filter: undefined,
    }
  )

  const { categoriesTabs } = useConfigTypes()

  const {
    getProducts: { data, isLoading },
  } = useProducts({
    page: state.page,
    limit: state.limit,
    filter: state.filter,
  })

  const onPageChange = React.useCallback((page: number) => {
    dispatch({ page })
    document.documentElement.scrollTop = 0
  }, [])

  const onFilterChange = React.useCallback((v: string) => {
    const filterString = JSON.stringify({
      ...makePrismaWhere(v, {
        OR: ['title'],
      }),
    })

    dispatch({ filter: filterString })
  }, [])

  const onFilterChangeDebounce = useDebounceCallback(onFilterChange, 500)

  return (
    <>
      <TabsFilters
        tabs={categoriesTabs}
        onFilterChange={onFilterChangeDebounce}
      />

      <section className="max-w-screen-2xl mx-auto px-8 sm:px-16">
        <ProductSection products={data?.data.products} isLoading={isLoading} />

        {(data?.data.count || 0) > (state.limit || 30) && (
          <Pagination
            currentPage={state.page}
            registersPerPage={state.limit}
            totalCountOfRegisters={data?.data.count || 0}
            onPageChange={onPageChange}
          />
        )}
      </section>
    </>
  )
}

export default MainProductsList
