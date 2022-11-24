import * as React from 'react'

import { ProductGetDto, ProductGetAllDto } from '@utils/dtos/productDto'
import { GetServerSideProps, NextPage } from 'next'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getProductList } from '@hooks/useProducts'
import { useBreakpoint } from '@hooks/useBreakpoint'
import { Product } from '@utils/types'
import { NextSeo } from 'next-seo'
import { api } from '@services/apiClient'

import HeaderFooterLayout, {
  LinksCategories,
} from '@layouts/HeaderFooterLayout'

import ProductPageSection from '@features/product/ProductPageSection'

type ProductPageProps = {
  product: Product
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const { data } = useQuery(
    ['products-product', product.id],
    () => getProductList(1, 5),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<ProductGetAllDto, unknown>

  const { sm } = useBreakpoint()

  return (
    <HeaderFooterLayout
      {...(sm && {
        renderAfterLogo: () => <LinksCategories />,
      })}
    >
      <NextSeo title={product?.title} />

      <ProductPageSection
        product={product}
        products={data?.data.products || []}
      />
    </HeaderFooterLayout>
  )
}

export default ProductPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    data: { product },
  } = await api.get<ProductGetDto>(`/products/${ctx.query.id}`)

  return {
    props: {
      product,
    },
  }
}
