import { useDebounceCallback } from '@react-hook/debounce'
import { makePrismaWhere } from '@hytzenshop/helpers'
import { useConfigTypes } from '@utils/types/config'
import { useProducts } from '@hooks/useProducts'
import { Pagination } from '@components/Pagination'
import { useConfig } from '@contexts/ConfigContext'
import { NextPage } from 'next'

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

  const {
    getProducts: { data, isLoading },
  } = useProducts({
    page: state.page,
    limit: state.limit || 10,
    filter: state.filter,
  })

  const onPageChange = React.useCallback((page: number) => {
    dispatch({ page })
    document.documentElement.scrollTop = 0
  }, [])

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
      <Head>
        <title>Hytzen Shop {announcement}</title>

        <meta name="title" content="Hytzen Shop" />
        <meta
          name="description"
          content="As camisetas do seu personagem favorito você encontra aqui."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.shop.hytzen.com/" />
        <meta property="og:title" content="Hytzen Shop" />
        <meta
          property="og:description"
          content="As camisetas do seu personagem favorito você encontra aqui."
        />
        <meta
          property="og:image"
          content="https://www.shop.hytzen.com/icons/logo.svg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.shop.hytzen.com/" />
        <meta
          property="twitter:title"
          content="Hytzen Shop - As camisetas do seu personagem favorito você encontra aqui."
        />
        <meta
          property="twitter:description"
          content="As camisetas do seu personagem favorito você encontra aqui."
        />
        <meta
          property="twitter:image"
          content="https://www.shop.hytzen.com/icons/logo.svg"
        />
      </Head>

      <Slider />

      <TabsFilters
        className="px-8 sm:px-16"
        tabs={categoriesTabs}
        onFilterChange={onFilterChangeDebounce}
      />

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

export default Home
