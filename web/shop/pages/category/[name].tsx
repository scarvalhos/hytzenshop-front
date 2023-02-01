import * as React from 'react'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { PaginationParams, ProductGetAllDto } from '@hytzenshop/types'
import { useConfigTypes } from '@utils/types/config'
import { getProductList } from '@hooks/useProducts'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { Pagination } from '@luma/ui'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import ProductSection from '@features/product/ProductSection'
import TabsFilters from '@components/TabsFilters'
import Slider from '@components/Slider'

interface CategoryProps {
  name: string
}

const Category: NextPage<CategoryProps> = ({ name: category }) => {
  const { categoriesTabs } = useConfigTypes()

  const [state, dispatch] = React.useReducer(
    (prev: PaginationParams, next: PaginationParams) => {
      return { ...prev, ...next }
    },
    {
      page: 1,
      limit: 20,
    }
  )

  const filterString = React.useMemo(
    () =>
      JSON.stringify({
        categories: { hasSome: category || '' },
      }),
    [category]
  )

  const { data, isLoading } = useQuery(
    ['products', state.page, category],
    () => getProductList(state.page, state.limit, filterString),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<ProductGetAllDto, unknown>

  const onPageChange = React.useCallback((page: number) => {
    dispatch({ page })
    document.documentElement.scrollTop = 0
  }, [])

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
      'stranger-things':
        'https://hytzenshop.s3.amazonaws.com/bab9ae3e1300d1eaf06041b35ea6ccb0-stranger-things-01.jpg',
      'dc-comics':
        'https://hytzenshop.s3.amazonaws.com/721efef24fee3858cc6ac722222e9c20-dc-comics-02.jpg',
      'star-wars': '/slider/star-wars-01.jpg',
      'greys-anatomy':
        'https://img.playbuzz.com/image/upload/ar_1.8867924528301887,c_crop/v1490241647/jwannfjppicmwubnoz17.jpg',
      'harry-potter': 'https://wallpapercave.com/wp/wp9022257.jpg',
    }[category as string]
  }, [category])

  React.useEffect(() => dispatch({ page: 1, limit: 20 }), [category])

  return (
    <HeaderFooterLayout>
      <NextSeo title={categoryTitle} />

      <Slider imageUrl={imageByCategory} short />

      <TabsFilters tabs={categoriesTabs} />

      <main className="max-w-screen-2xl mx-auto px-8 sm:px-16 pb-10">
        <ProductSection
          products={data?.data.products || []}
          isLoading={isLoading}
        />

        {data?.data.count && (
          <Pagination
            currentPage={state.page}
            registersPerPage={state.limit}
            totalCountOfRegisters={data?.data.count || 0}
            onPageChange={onPageChange}
          />
        )}
      </main>
    </HeaderFooterLayout>
  )
}

export default Category

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {
        name: ctx.params?.name,
      },
    }
  },
  {
    mustBeAuthenticated: false,
  }
)
