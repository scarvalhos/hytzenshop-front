import * as React from 'react'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { ProductGetAllDto } from '@hytzenshop/types'
import { useConfigTypes } from '@utils/types/config'
import { getProductList } from '@hooks/useProducts'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { Pagination } from '@components/Pagination'
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

interface CategoryProps {
  name: string
}

const Category: NextPage<CategoryProps> = ({ name: category }) => {
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
      marvel:
        'https://hytzenshop.s3.amazonaws.com/721efef24fee3858cc6ac722222e9c20-dc-comics-02.jpg',
      'stranger-things':
        'https://hytzenshop.s3.amazonaws.com/bab9ae3e1300d1eaf06041b35ea6ccb0-stranger-things-01.jpg',
      'dc-comics':
        'https://hytzenshop.s3.amazonaws.com/a4964a128ad0139464fa6a5fc5b7187a-marvel-02.jpg',
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
