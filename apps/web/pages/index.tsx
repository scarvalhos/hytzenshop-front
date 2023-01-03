import { makePrismaWhere, randonfy } from '@hytzenshop/helpers'
import { useDebounceCallback } from '@react-hook/debounce'
import { useConfigTypes } from '@utils/types/config'
import { useProducts } from '@hooks/useProducts'
import { Pagination } from '@components/Pagination'
import { useConfig } from '@contexts/ConfigContext'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { socket } from '@services/socket'

import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import ProductSection from '@features/product/ProductSection/ProductSection'
import TabsFilters from '@components/TabsFilters'
import Slider from '@components/Slider'
import React from 'react'
import Head from 'next/head'

interface PaginationStateProps {
  page: number
  limit?: number
  filter?: string
}

const Home: NextPage = () => {
  const [state, dispatch] = React.useState<PaginationStateProps>({
    page: 1,
    limit: 30,
    filter: undefined,
  })

  const { categoriesTabs } = useConfigTypes()
  const { announcement } = useConfig()

  const call = useDebounceCallback((arg) => console.log(arg, 'Connection'))

  React.useEffect(() => {
    socket.on('Connection', (arg) => {
      call(arg)
    })
  }, [call])

  const {
    getProducts: { data, isLoading },
  } = useProducts({
    page: state.page,
    limit: state.limit || 10,
    filter: state.filter,
  })

  const onPageChange = React.useCallback(
    (page: number) => {
      dispatch({ ...state, page })
      document.documentElement.scrollTop = 0
    },
    [state]
  )

  const onFilterChange = React.useCallback(
    (v: string) => {
      const filterString = JSON.stringify({
        ...makePrismaWhere(v, {
          OR: ['title'],
        }),
      })

      dispatch({ ...state, filter: filterString })
    },
    [state]
  )

  const onFilterChangeDebounce = useDebounceCallback(onFilterChange, 500)

  return (
    <HeaderFooterLayout>
      <NextSeo
        title={`Hytzen Shop ${announcement}`}
        description="As camisetas do seu personagem favorito você encontra aqui."
        additionalMetaTags={[
          {
            property: 'og:url',
            content: 'https://www.shop.hytzen.com/images/preview.png',
          },
        ]}
      />

      <Head>
        <title>Hytzen Shop</title>
        <meta name="title" content="Hytzen Shop" />
        <meta
          name="description"
          content="As camisetas do seu personagem favorito você encontra aqui."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shop.hytzen.com/" />
        <meta property="og:title" content="Hytzen Shop" />
        <meta
          property="og:description"
          content="As camisetas do seu personagem favorito você encontra aqui."
        />
        <meta
          property="og:image"
          content="https://www.shop.hytzen.com/images/preview.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://shop.hytzen.com/" />
        <meta property="twitter:title" content="Hytzen Shop" />
        <meta
          property="twitter:description"
          content="As camisetas do seu personagem favorito você encontra aqui."
        />
        <meta
          property="twitter:image"
          content="https://www.shop.hytzen.com/images/preview.png"
        />
      </Head>

      <Slider />

      <TabsFilters
        className="px-8 sm:px-16"
        tabs={categoriesTabs}
        onFilterChange={onFilterChangeDebounce}
      />

      <ProductSection
        products={randonfy(data?.data.products)}
        isLoading={isLoading}
      />

      <div className="mx-16 mb-16">
        {(data?.data.count || 0) > (state.limit || 30) && (
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

export default Home
