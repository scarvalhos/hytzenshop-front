import React from 'react'

import { TbEye, TbInfoCircle, TbThumbUp, TbTruck } from 'react-icons/tb'
import { Order as IOrder } from '@utils/types'
import { c, date, money } from '@utils/helpers'
import { useBreakpoint } from '@hooks/useBreakpoint'
import { useOrder } from './Order.hook'
import { Link } from '@core'

interface OrderProps {
  order: IOrder
}

const Order: React.FC<OrderProps> = ({ order }) => {
  const { sm, md } = useBreakpoint()

  const { iconButtonColor, iconTruckColor, statusColor, statusLabel } =
    useOrder(order)

  return (
    <div className="flex flex-row justify-between items-center relative rounded-md bg-dark-gray-400 flex-nowrap px-8 py-6">
      {md && (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-left space-y-1">
          <p className="text-sm">Data do pedido</p>
          <p className="text-light-gray-100">
            {date(order.createdAt, 'long-short')}
          </p>
        </div>
      )}

      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-left">
        <p className="text-sm">Número do pedido</p>
        <p className="text-light-gray-100">#{order.mpPaymentId}</p>
        {!sm && (
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-left mt-1">
            <p className="text-sm">Status</p>

            <p
              className={c(
                statusColor,
                'flex flex-row items-center justify-center text-xs text-light-gray-100 select-none px-2 py-1 space-x-2 rounded-full'
              )}
            >
              {statusLabel}
              <TbInfoCircle style={{ marginLeft: 4 }} />
            </p>
          </div>
        )}
      </div>

      {sm && (
        <>
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
        </>
      )}

      {sm && (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-left">
          <p className="text-sm">Status</p>

          <p
            className={c(
              statusColor,
              'flex flex-row items-center justify-center text-xs text-light-gray-100 select-none px-2 py-1 space-x-2 rounded-full'
            )}
          >
            {statusLabel}
            <TbInfoCircle style={{ marginLeft: 4 }} />
          </p>
        </div>
      )}

      <div className="w-fit flex flex-col sm:flex-row items-center justify-center max-sm:space-y-2 sm:space-x-2">
        {order.status === 'pending' ? (
          <button className={c(iconButtonColor, 'p-2 rounded-full')} disabled>
            <TbTruck size={16} color={iconTruckColor} />
          </button>
        ) : (
          <button className={c(iconButtonColor, 'p-2 rounded-full')}>
            {order.status === 'delivered' ? (
              <TbThumbUp size={16} color={iconTruckColor} />
            ) : (
              <TbTruck size={16} color={iconTruckColor} />
            )}
          </button>
        )}
        <Link href={`/profile/pedidos/${order.id}`} passHref>
          <button
            className={c(iconButtonColor, 'bg-dark-gray-300 p-2 rounded-full')}
          >
            <TbEye size={16} />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Order
