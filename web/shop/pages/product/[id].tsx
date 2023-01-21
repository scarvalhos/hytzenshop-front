import { BreadCrumbs, Button, Icons } from '@luma/ui'
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { TbHome, TbBox } from 'react-icons/tb'
import { ProductGetDto } from '@hytzenshop/types'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { useConfig } from '@contexts/ConfigContext'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { api } from '@hytzenshop/services'

import ProductPageSection from '@features/product/ProductPageSection'
import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import ProductSection from '@features/product/ProductSection'
import React from 'react'

async function getProductDetails(id?: string | null) {
  const { data } = await api.get<ProductGetDto>(`/products/${id}`)

  return data
}

interface ProductPageProps {
  id: string
}

const ProductPage: NextPage<ProductPageProps> = ({ id }) => {
  const { productsSugestions } = useConfig()

  const queryClient = useQueryClient()

  const productQuery = useQuery(['product', id], () => getProductDetails(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  }) as UseQueryResult<ProductGetDto, unknown>

  React.useEffect(() => {
    queryClient.invalidateQueries(['products-sugestions'])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!productQuery.data?.product && !productQuery.isLoading) {
    return (
      <HeaderFooterLayout glassEffect={false}>
        <NextSeo title={productQuery.data?.product?.title} />

        <div className="flex flex-col items-center justify-center mt-10 h-[50vh] mx-6">
          <Icons.EmptyCart className="scale-75 text-primary" />

          <p className="text-2xl text-primary font-medium">
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
          products={productsSugestions}
        />
      </HeaderFooterLayout>
    )
  }

  return (
    <HeaderFooterLayout glassEffect={false}>
      <NextSeo title={productQuery.data?.product?.title} />

      <div className="sticky top-0 bg z-30">
        <div className="max-w-screen-2xl mx-auto px-8 sm:px-16 pt-20 pb-6">
          <BreadCrumbs
            links={[
              {
                title: 'Início',
                href: '/',
                icon: TbHome,
              },
              ...(productQuery.data?.product?.title
                ? [
                    {
                      title: String(productQuery.data?.product?.title || ''),
                      href: `/product/${productQuery.data?.product?.id}`,
                      icon: TbBox,
                    },
                  ]
                : []),
            ]}
          />
        </div>
      </div>

      <ProductPageSection
        product={productQuery.data?.product}
        products={productsSugestions}
        loading={productQuery.isLoading && !productQuery.data}
      />
    </HeaderFooterLayout>
  )
}

export default ProductPage

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {
        id: ctx.params?.id,
      },
    }
  },
  {
    mustBeAuthenticated: false,
  }
)
