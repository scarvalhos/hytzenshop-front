import * as React from 'react'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { ProductGetAllDto } from '@utils/dtos/productDto'
import { getProductList } from '@hooks/useProducts'
import { useBreakpoint } from '@hooks/useBreakpoint'
import { Pagination } from '@components/Pagination'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import HeaderFooterLayout, {
  LinksCategories,
} from '@layouts/HeaderFooterLayout'

import ProductSection from '@features/product/ProductSection'
import Slider from '@components/Slider'

interface PaginationStateProps {
  page: number
  limit: number
}

const Category = () => {
  const { sm } = useBreakpoint()
  const {
    query: { category },
  } = useRouter()

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
    <HeaderFooterLayout
      {...(sm && {
        renderAfterLogo: () => <LinksCategories />,
      })}
    >
      <NextSeo title={categoryTitle} />

      <Slider imageUrl={imageByCategory} short />

      <ProductSection
        title={categoryTitle}
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
