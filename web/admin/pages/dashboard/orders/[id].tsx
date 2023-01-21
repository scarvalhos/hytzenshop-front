import { OrderGetDto, Order } from '@hytzenshop/types'
import { parseCookies } from 'nookies'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { api } from '@hytzenshop/services'

import SiderbarLayout from '@layouts/SiderbarLayout'
import OrderDetails from '@features/orders/OrderDetails'

type ProfilePedidosPageProps = {
  order: Order
}

const ProfilePedidosPage: NextPage<ProfilePedidosPageProps> = ({ order }) => {
  return (
    <>
      <NextSeo title={`Pedido #${order.mpPaymentId}`} />

      <div className="mb-20">
        <OrderDetails order={order} />
      </div>
    </>
  )
}

// @ts-expect-error layout
ProfilePedidosPage.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default ProfilePedidosPage

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const cookies = parseCookies(ctx)

    if (cookies) {
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${cookies['hytzenshopadm.token']}`
    }

    const { id } = ctx.query

    const {
      data: { order },
    } = await api.get<OrderGetDto>(`/orders/order/${id}`)

    return {
      props: {
        order,
      },
    }
  },
  { isAdmin: true }
)
