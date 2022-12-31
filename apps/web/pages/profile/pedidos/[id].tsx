import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { OrderDetails } from '@features/orders/OrderDetails'
import { OrderGetDto } from '@hytzenshop/types'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { api } from '@hytzenshop/services'

import ProfileLayout from '@layouts/ProfileLayout'

async function getOrderDetails(id?: string | null) {
  const { data } = await api.get<OrderGetDto>(`/orders/order/${id}`)

  return data
}

interface ProfileOrderPageProps {
  id: string
}

const ProfileOrderPage: NextPage<ProfileOrderPageProps> = ({ id }) => {
  const orderQuery = useQuery(['order', id], () => getOrderDetails(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  }) as UseQueryResult<OrderGetDto, unknown>

  return (
    <ProfileLayout>
      <NextSeo title={`Pedido #${orderQuery.data?.order.mpPaymentId}`} />

      <div className="mx-8 sm:mx-16 my-24 space-y-4">
        <OrderDetails order={orderQuery.data?.order} />
      </div>
    </ProfileLayout>
  )
}

export default ProfileOrderPage

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {
        id: ctx.params?.id,
      },
    }
  },
  {
    mustBeAuthenticated: true,
  }
)
