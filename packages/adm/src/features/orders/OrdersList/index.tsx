import { Order as IOrder } from '@utils/types'
import { List } from './styles'

import Order from '../Order'

interface OrdersListProps {
  orders?: IOrder[]
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  return (
    <List>
      {orders?.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </List>
  )
}
