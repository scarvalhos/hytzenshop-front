import * as React from 'react'

import { HeaderOrdersList } from '@features/orders/OrdersList/Header'
import { useNewProduct } from '@hooks/useNewProduct'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { OrdersList } from '@features/orders/OrdersList'
import { Pagination } from '@core/Pagination'
import { useOrders } from '@hooks/useOrders'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Stack } from '@mui/material'

import SiderbarLayout from '@layouts/SiderbarLayout'

const Orders: NextPage = () => {
  const [page, setPage] = React.useState(1)

  const limit = 10

  const { filter } = useNewProduct()

  const {
    getOrders: { data, isLoading },
  } = useOrders(page, limit, filter)

  return (
    <>
      <NextSeo title="Pedidos" />

      <HeaderOrdersList loading={isLoading} />

      <Stack spacing={4} mb={10}>
        <OrdersList orders={data?.data.orders} />

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
Orders.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default Orders

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
