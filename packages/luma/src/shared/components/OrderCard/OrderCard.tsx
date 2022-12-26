import React from 'react'

import { TbEye, TbInfoCircle } from 'react-icons/tb'
import { Order as IOrder } from '@hytzenshop/types'
import { c, date, money } from '@hytzenshop/helpers'
import { useRouter } from 'next/router'
import { useOrder } from './OrderCard.hook'
import { Button } from '@luma/ui'

export interface OrderCardProps {
  order: IOrder
  application: 'adm' | 'web'
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, application }) => {
  const { statusColor, statusLabel } = useOrder(order)
  const { push } = useRouter()

  const pushRef = React.useRef(push)

  const link = React.useMemo(
    () =>
      application === 'web'
        ? `/profile/pedidos/${order.id}`
        : `/dashboard/orders/${order.id}`,
    [application, order.id]
  )

  return (
    <div
      onClick={() => pushRef.current(link)}
      className={c(
        application === 'adm' ? 'lg:grid-cols-6' : 'lg:grid-cols-5',
        "grid grid-cols-2 md:grid-cols-3 gap-4 relative rounded-md bg-dark-gray-500 bg-opacity-70 hover:bg-opacity-100 px-6 py-4 cursor-pointer hover:before:content-[''] hover:before:rounded-l-lg hover:before:w-1 hover:before:h-[100%] hover:before:bg-success-300 hover:before:absolute hover:before:bottom-0 hover:before:left-0 transition-all"
      )}
    >
      {application === 'adm' ? (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-left space-y-1">
          <p className="text-sm">Cliente</p>
          <p className="text-light-gray-100">{order.user.email}</p>
        </div>
      ) : null}

      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-left space-y-1">
        <p className="text-sm">Data do pedido</p>
        <p className="text-light-gray-100">{date(order.createdAt, 'digit')}</p>
      </div>

      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-left">
        <p className="text-sm">Número do pedido</p>
        <p className="text-light-gray-100">#{order.mpPaymentId}</p>
      </div>

      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-left">
        <p className="text-sm">Quantidade</p>
        <p className="text-light-gray-100">
          {order.orderedProducts.length || 0} itens
        </p>
      </div>

      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-left">
        <p className="text-sm">Total</p>
        <p className="text-light-gray-100">{money(order.amount)}</p>
      </div>

      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-left max-sm:col-start-1 max-sm:col-end-3">
        <p className="text-sm">Status</p>

        <p
          className={c(
            statusColor,
            'flex flex-row items-center justify-center w-fit text-xs font-semibold text-light-gray-100 select-none px-2 py-1 space-x-2 rounded-full'
          )}
        >
          {statusLabel}
          <TbInfoCircle style={{ marginLeft: 4 }} />
        </p>
      </div>

      <div className="flex flex-row items-center justify-end max-sm:col-start-1 max-sm:col-end-3 mt-2 sm:hidden">
        <Button
          href={link}
          variant="filled"
          className={c(
            'bg-success-500 bg-opacity-10 lg:bg-dark-gray-300 lg:bg-opacity-100 lg:p-2 max-lg:w-full'
          )}
          rounded
        >
          <span className="flex justify-center items-center space-x-2">
            <TbEye className="text-success-300 lg:text-light-gray-100" />
            <p className="lg:hidden text-success-300">Ver pedido</p>
          </span>
        </Button>
      </div>
    </div>
  )
}
