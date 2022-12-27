import * as React from 'react'

import { HeaderProductsList } from '@features/product/ProductsList/Header'
import { useNewProduct } from '@hooks/useNewProduct'
import { ProductsList } from '@features/product/ProductsList'
import { LoadAnimated } from '@core/LoadAnimated'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { useProducts } from '@hooks/useProducts'
import { Pagination } from '@core/Pagination'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Stack } from '@mui/material'

import SiderbarLayout from '@layouts/SiderbarLayout'

const QuikMenuProducts: NextPage = () => {
  const [page, setPage] = React.useState(1)

  const limit = 10

  const { filter } = useNewProduct()

  const {
    getProducts: { data, isLoading },
    deleteProduct,
  } = useProducts({
    page,
    limit,
    filter,
  })

  return (
    <>
      <NextSeo title="Produtos" />

      <HeaderProductsList loading={isLoading} products={data?.data.products} />

      <Stack spacing={4} mb={10}>
        <Stack
          {...(isLoading
            ? {
                justifyContent: 'center',
                alignItems: 'center',
              }
            : {})}
        >
          {isLoading ? (
            <LoadAnimated size={160} />
          ) : (
            <ProductsList
              products={data?.data.products || []}
              deleteProduct={deleteProduct}
            />
          )}
        </Stack>

        {!isLoading && (
          <Pagination
            currentPage={page}
            totalCountOfRegisters={data?.data.count || 0}
            registersPerPage={limit}
            onPageChange={setPage}
          />
        )}
      </Stack>
    </>
  )
}

// @ts-expect-error layout
QuikMenuProducts.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default QuikMenuProducts

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    }
  },
  {
    isAdmin: true,
  }
)
