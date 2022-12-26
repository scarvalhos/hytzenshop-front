import { Order as IOrder } from '@hytzenshop/types'
import { Shared } from '@luma/ui'

interface OrdersListProps {
  orders?: IOrder[]
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  return (
    <>
      {orders?.map((order) => (
        <Shared.OrderCard key={order.id} order={order} application="web" />
      ))}
    </>
  )
}

export default OrdersList
