import { Shared } from '@luma/ui'
import { Order } from '@hytzenshop/types'

interface OrdersListProps {
  orders?: Order[]
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  return (
    <div className="space-y-4">
      {orders?.map((order) => (
        <Shared.OrderCard key={order.id} order={order} application="adm" />
      ))}
    </div>
  )
}
