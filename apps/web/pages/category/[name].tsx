import * as React from 'react'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { ProductGetAllDto } from '@hytzenshop/types'
import { useConfigTypes } from '@utils/types/config'
import { getProductList } from '@hooks/useProducts'
import { Pagination } from '@components/Pagination'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import ProductSection from '@features/product/ProductSection'
import TabsFilters from '@components/TabsFilters'
import Slider from '@components/Slider'

interface PaginationStateProps {
  page: number
  limit: number
}

const Category: NextPage = () => {
  const {
    query: { name },
  } = useRouter()

  const category = name

  const { categoriesTabs } = useConfigTypes()

  const [state, dispatch] = React.useState<PaginationStateProps>({
    page: 1,
    limit: 30,
  })

  const filterString = JSON.stringify({
    categories: { hasSome: category || '' },
  })

  const { data, isLoading } = useQuery(
    ['products', state.page, category],
    () => getProductList(state.page, state.limit, filterString),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<ProductGetAllDto, unknown>

  const onPageChange = React.useCallback(
    (page: number) => {
      dispatch({ ...state, page })
      document.documentElement.scrollTop = 0
    },
    [state]
  )

  const categoryTitle = React.useMemo(
    () =>
      (category as string)
        ?.replace(/^./, (category as string)?.[0].toUpperCase())
        ?.replace('-', ' '),
    [category]
  )

  const imageByCategory = React.useMemo(() => {
    return {
      marvel: '/slider/marvel-02.jpg',
      'stranger-things': '/slider/stranger-things-01.jpg',
      'dc-comics': '/slider/dc-comics-02.jpg',
    }[category as string]
  }, [category])

  React.useEffect(() => dispatch({ page: 1, limit: 30 }), [category])

  return (
    <HeaderFooterLayout>
      <NextSeo title={categoryTitle} />

      <Slider imageUrl={imageByCategory} short />

      <TabsFilters className="px-8 sm:px-16" tabs={categoriesTabs} />

      <ProductSection
        products={data?.data.products || []}
        isLoading={isLoading}
      />

      <div className="mx-16 mb-16">
        {(data?.data.count || 0) > (state.limit || 10) && (
          <Pagination
            currentPage={state.page}
            registersPerPage={state.limit}
            totalCountOfRegisters={data?.data.count || 0}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </HeaderFooterLayout>
  )
}

export default Category
