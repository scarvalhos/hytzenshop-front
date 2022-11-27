import { Order as IOrder } from '@utils/types'

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
