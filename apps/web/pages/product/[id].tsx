import { ProductGetAllDto, ProductGetDto } from '@hytzenshop/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useConfigTypes } from '@utils/types/config'
import { Button, Icons } from '@luma/ui'
import { getProductList } from '@hooks/useProducts'
import { c, randonfy } from '@hytzenshop/helpers'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { api } from '@hytzenshop/services'

import ProductPageSection from '@features/product/ProductPageSection'
import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import ProductSection from '@features/product/ProductSection'
import TabsFilters from '@components/TabsFilters'
import React from 'react'

async function getProductDetails(id?: string | null) {
  const { data } = await api.get<ProductGetDto>(`/products/${id}`)

  return data
}

const ProductPage: NextPage = () => {
  const id = useSearchParams().get('id')

  const { categoriesTabs } = useConfigTypes()

  const productQuery = useQuery(['product', id], () => getProductDetails(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  }) as UseQueryResult<ProductGetDto, unknown>

  const { data } = useQuery(
    ['products-sugestions'],
    () => getProductList(1, 30),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<ProductGetAllDto, unknown>

  if (!productQuery.data?.product && !productQuery.isLoading) {
    return (
      <HeaderFooterLayout glassEffect={false}>
        <NextSeo title={productQuery.data?.product?.title} />

        <TabsFilters className="px-8 sm:px-16 top-12" tabs={categoriesTabs} />

        <div className="flex flex-col items-center justify-center mt-10 h-[50vh] mx-6">
          <Icons.EmptyCart className="scale-75 text-dark-gray-400" />

          <p className="text-2xl text-light-gray-100 font-medium">
            Produto não encontrado
          </p>
          <p className="mb-8 text-center">
            Ops, parece que esse produto não existe.
          </p>

          <div className="flex flex-col-reverse sm:flex-row sm:space-x-2 max-sm:w-full">
            <Button
              href="/"
              variant="filled"
              className="flex-nowrap max-sm:w-full"
              rounded
            >
              Voltar para a loja
            </Button>
          </div>
        </div>

        <ProductSection
          title="Você Também Pode Gostar"
          products={data?.data.products || []}
        />
      </HeaderFooterLayout>
    )
  }

  return (
    <HeaderFooterLayout glassEffect={false}>
      <NextSeo title={productQuery.data?.product?.title} />

      <TabsFilters
        className={c(
          'px-8 sm:px-16 max-w-screen-2xl top-[52px] mx-auto border-none'
        )}
        tabs={categoriesTabs}
      />

      <ProductPageSection
        product={productQuery.data?.product}
        products={randonfy(data?.data.products || []).slice(0, 5)}
        loading={productQuery.isLoading && !productQuery.data}
      />
    </HeaderFooterLayout>
  )
}

export default ProductPage
