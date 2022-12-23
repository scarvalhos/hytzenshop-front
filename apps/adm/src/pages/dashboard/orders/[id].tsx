import { OrderGetDto, UserGetDto, Order, User } from '@hytzenshop/types'
import { OrderDetails } from '@features/orders/OrderDetails'
import { parseCookies } from 'nookies'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Stack } from '@mui/material'
import { api } from '@services/api'

import SiderbarLayout from '@layouts/SiderbarLayout'

type ProfilePedidosPageProps = {
  user: User
  order: Order
  payment: any
}

const ProfilePedidosPage: NextPage<ProfilePedidosPageProps> = ({
  user,
  order,
  payment,
}) => {
  return (
    <>
      <NextSeo title={`Pedido #${order.mpPaymentId}`} />

      <Stack spacing={4} mb={10}>
        <OrderDetails order={order} user={user} payment={payment} />
      </Stack>
    </>
  )
}

// @ts-expect-error layout
ProfilePedidosPage.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default ProfilePedidosPage

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const cookies = parseCookies(ctx)

  if (cookies) {
    api.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${cookies['hytzenshopadm.token']}`
  }

  const { id } = ctx.query

  const {
    data: { user },
  } = await api.get<UserGetDto>('/auth/me')

  const {
    data: { order },
  } = await api.get<OrderGetDto>(`/orders/order/${id}`)

  const { data: payment } = await api.get(`/checkout/${order.mpPaymentId}`)

  return {
    props: {
      user,
      order,
      payment: payment.response,
    },
  }
})
