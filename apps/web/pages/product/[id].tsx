import { ProductGetAllDto, ProductGetDto } from '@hytzenshop/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { getProductList } from '@hooks/useProducts'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { api } from '@services/apiClient'

import ProductPageSection from '@features/product/ProductPageSection'
import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import ProductSection from '@features/product/ProductSection'
import React from 'react'

async function getProductDetails(id?: string | null) {
  const { data } = await api.get<ProductGetDto>(`/products/${id}`)

  return data
}

const ProductPage: NextPage = () => {
  const id = useSearchParams().get('id')
  const productQuery = useQuery(['product', id], () => getProductDetails(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  }) as UseQueryResult<ProductGetDto, unknown>

  const { data } = useQuery(
    ['products-product', productQuery.data?.product.id],
    () => getProductList(1, 5),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<ProductGetAllDto, unknown>

  if (!productQuery.data?.product && !productQuery.isLoading) {
    return (
      <HeaderFooterLayout>
        <NextSeo title={productQuery.data?.product?.title} />

        <div className="my-20 mx-16 flex items-center">
          <h1>Produto não encontrado</h1>
        </div>

        <ProductSection
          title="Você Também Pode Gostar"
          products={data?.data.products || []}
        />
      </HeaderFooterLayout>
    )
  }

  return (
    <HeaderFooterLayout>
      <NextSeo title={productQuery.data?.product?.title} />

      <ProductPageSection
        product={productQuery.data?.product}
        products={data?.data.products}
        loading={productQuery.isLoading && !productQuery.data}
      />
    </HeaderFooterLayout>
  )
}

export default ProductPage
