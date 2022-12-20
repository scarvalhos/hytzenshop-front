import { TbShoppingCartPlus } from 'react-icons/tb'
import { LoadAnimated } from '@core'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { Pagination } from '@components/Pagination'
import { useOrders } from '@hooks/useOrders'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Icons } from '@luma/ui'

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
        {data?.data.count ? <OrdersListHeader loading={isLoading} /> : null}

        <OrdersList orders={data?.data.orders} />

        {isLoading ? (
          <div className="flex items-center justify-center">
            <LoadAnimated />
          </div>
        ) : null}

        {!isLoading && data?.data.orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh] space-y-10">
            <Icons.EmptyCart className="text-success-300" />

            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl text-light-gray-100 font-medium text-center">
                Parece que você ainda não fez nenhum pedido.
              </p>
              <p>
                Aproveite nossa promoção e{' '}
                <strong className="text-light-gray-100">ganhe 10% OFF</strong>{' '}
                na primeira compra:
              </p>

              <Button href="/" variant="filled" rounded className="w-fit mt-6">
                <span className="flex flex-row space-x-1">
                  <TbShoppingCartPlus />
                  <p>Ir as compras</p>
                </span>
              </Button>
            </div>
          </div>
        ) : null}

        {!isLoading && data?.data.count ? (
          <Pagination
            currentPage={page}
            totalCountOfRegisters={data?.data.count || 0}
            onPageChange={setPage}
            registersPerPage={limit}
          />
        ) : null}
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
