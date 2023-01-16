import { Order as IOrder } from '@hytzenshop/types'
import { Shared } from '@luma/ui'
import { map } from '@hytzenshop/helpers'

interface OrdersListProps {
  orders?: IOrder[]
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  return orders ? (
    <>
      {map(orders, (order) => (
        <Shared.OrderCard key={order.id} order={order} application="web" />
      ))}
    </>
  ) : null
}

export default OrdersList
