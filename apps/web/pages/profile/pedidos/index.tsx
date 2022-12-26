import { TbShoppingCartPlus } from 'react-icons/tb'
import { PaginationParams } from '@hytzenshop/types'
import { LoadAnimated } from '@core'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { Pagination } from '@components/Pagination'
import { useOrders } from '@hooks/useOrders'
import { NextPage } from 'next'
import { useAuth } from '@contexts/AuthContext'
import { NextSeo } from 'next-seo'
import { Icons } from '@luma/ui'

import OrdersListHeader from '@features/orders/OrdersListHeader'
import ProfileLayout from '@layouts/ProfileLayout'
import OrdersList from '@features/orders/OrdersList'
import Button from '@components/Button'
import React from 'react'

const ProfileOrdersPage: NextPage = () => {
  const { user } = useAuth()

  const [state, dispatch] = React.useState<PaginationParams>({
    page: 1,
    limit: 10,
    sort: 'createdAt',
    order: 'desc',
  })

  const setPage = (page: number) => {
    dispatch({
      ...state,
      page,
    })
  }

  const {
    getOrders: { data, isLoading },
  } = useOrders({ ...state, userId: user?.id })

  return (
    <ProfileLayout>
      <NextSeo title="Meus pedidos" />

      <div className="mx-8 my-24 space-y-4 max-w-5xl lg:mx-auto">
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
            currentPage={state.page}
            totalCountOfRegisters={data?.data.count || 0}
            onPageChange={setPage}
            registersPerPage={state.limit}
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
