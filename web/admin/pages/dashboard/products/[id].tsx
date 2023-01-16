import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { ConfigProvider } from '@contexts/ConfigContext'
import { ProductGetDto } from '@hytzenshop/types'
import { Button, Icons } from '@luma/ui'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { api } from '@hytzenshop/services'

import ProductPageSection from '@features/product/ProductPageSection'
import SiderbarLayout from '@layouts/SiderbarLayout'
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

  if (!productQuery.data?.product && !productQuery.isLoading) {
    return (
      <ConfigProvider>
        <NextSeo title={productQuery.data?.product?.title} />

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
              Voltar
            </Button>
          </div>
        </div>
      </ConfigProvider>
    )
  }

  return (
    <>
      <NextSeo title={productQuery.data?.product?.title} />

      <ProductPageSection
        product={productQuery.data?.product}
        loading={productQuery.isLoading && !productQuery.data}
      />
    </>
  )
}

// @ts-expect-error layout
ProductPage.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default ProductPage
