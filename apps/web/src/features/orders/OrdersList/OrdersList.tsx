import { Order as IOrder } from '@hytzenshop/types'

import Order from '../Order'

interface OrdersListProps {
  orders?: IOrder[]
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  return (
    <>
      {orders?.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </>
  )
}

export default OrdersList
