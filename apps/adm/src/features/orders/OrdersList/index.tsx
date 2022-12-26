import { Shared } from '@luma/ui'
import { Order } from '@hytzenshop/types'
import { List } from './styles'

interface OrdersListProps {
  orders?: Order[]
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  return (
    <List>
      {orders?.map((order) => (
        <Shared.OrderCard key={order.id} order={order} application="adm" />
      ))}
    </List>
  )
}
