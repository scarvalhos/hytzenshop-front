import { Shared } from '@luma/ui'
import { Order } from '@hytzenshop/types'

interface OrdersListProps {
  orders?: Order[]
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  return (
    <div className="space-y-4">
      {orders?.length ? (
        orders?.map((order) => (
          <Shared.OrderCard key={order.id} order={order} application="adm" />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-[25vh]">
          <p className="text-light-gray-100 font-medium text-xl">
            Nenhum pedido encontrado.
          </p>
          <p>Ops! Parece que nenhum pedido foi encontrado aqui.</p>
        </div>
      )}
    </div>
  )
}
