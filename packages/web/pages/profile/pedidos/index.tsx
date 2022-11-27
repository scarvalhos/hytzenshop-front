import { withSSRAuth } from '@hocs/withSSRAuth'
import { Pagination } from '@components/Pagination'
import { useOrders } from '@hooks/useOrders'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Icons } from '@core'

import OrdersListHeader from '@features/orders/OrdersListHeader'
import ProfileLayout from '@layouts/ProfileLayout'
import OrdersList from '@features/orders/OrdersList'
import Button from '@components/Button'
import React from 'react'

const ProfileOrdersPage: NextPage = () => {
  const [page, setPage] = React.useState(1)

  const limit = 10

  const {
    getOrders: { data, isLoading },
  } = useOrders(page, limit, undefined, 'createdAt', 'desc')

  return (
    <ProfileLayout>
      <NextSeo title="Meus pedidos" />

      <div className="mx-8 sm:mx-16 my-24 space-y-4">
        {data?.data.count && <OrdersListHeader loading={isLoading} />}

        <OrdersList orders={data?.data.orders} />

        {!isLoading && !data?.data.orders && (
          <div className="flex flex-col items-center justify-center mt-20">
            <Icons.EmptyCart className="scale-75" />

            <p className="text-xl text-light-gray-100 font-medium mb-4">
              Seu carrinho está vazio
            </p>

            <div className="w-full sm:max-w-[264px] space-y-2">
              <Button href="/" variant="outlined" className="w-full">
                Ir as compras
              </Button>
            </div>
          </div>
        )}

        {!isLoading && data?.data.count && (
          <Pagination
            currentPage={page}
            totalCountOfRegisters={data?.data.count || 0}
            onPageChange={setPage}
            registersPerPage={limit}
          />
        )}
      </div>
    </ProfileLayout>
  )
}

export default ProfileOrdersPage

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  }
})
