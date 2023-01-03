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
        title={`Hytzen Shop - ${announcement || ''}`}
        description="As camisetas do seu personagem favorito você encontra aqui."
        additionalMetaTags={[
          {
            name: 'title',
            content: 'Hytzen Shop',
          },
          {
            name: 'description',
            content:
              'As camisetas do seu personagem favorito você encontra aqui.',
          },
          {
            property: 'og:type',
            content: 'website',
          },
          {
            property: 'og:url',
            content: 'https://www.shop.hytzen.com/',
          },
          {
            property: 'og:title',
            content: 'Hytzen Shop',
          },
          {
            property: 'og:description',
            content:
              'As camisetas do seu personagem favorito você encontra aqui.',
          },
          {
            property: 'og:image',
            content: 'https://www.shop.hytzen.com/preview.jpg',
          },
          {
            property: 'twitter:card',
            content: 'summary_large_image',
          },
          {
            property: 'twitter:url',
            content: 'https://www.shop.hytzen.com/',
          },
          {
            property: 'twitter:title',
            content: 'Hytzen Shop',
          },
          {
            property: 'twitter:description',
            content:
              'As camisetas do seu personagem favorito você encontra aqui.',
          },
          {
            property: 'twitter:image',
            content: 'https://www.shop.hytzen.com/preview.jpg',
          },
        ]}
      />

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
