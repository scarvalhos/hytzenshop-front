import * as React from 'react'

import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import SiderbarLayout from '@layouts/SiderbarLayout'
import OrdersListPage from '@features/orders/OrdersListPage'

const Orders: NextPage = () => {
  return (
    <>
      <NextSeo title="Pedidos" />

      <OrdersListPage />
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
