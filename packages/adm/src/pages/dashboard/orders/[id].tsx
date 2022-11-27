import { setUpAPIClient } from '@services/api'
import { OrderDetails } from '@features/orders/OrderDetails'
import { OrderGetDto } from '@utils/dtos/orderDto'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { UserGetDto } from '@utils/dtos/userDto'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Stack } from '@mui/material'
import { Order } from '@utils/types'
import { User } from '@utils/types/auth'

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
  const apiClient = setUpAPIClient(ctx)
  const { id } = ctx.query

  const {
    data: { user },
  } = await apiClient.get<UserGetDto>('/auth/me')

  const {
    data: { order },
  } = await apiClient.get<OrderGetDto>(`/orders/order/${id}`)

  const { data: payment } = await apiClient.get(
    `/checkout/${order.mpPaymentId}`
  )

  return {
    props: {
      user,
      order,
      payment: payment.response,
    },
  }
})
