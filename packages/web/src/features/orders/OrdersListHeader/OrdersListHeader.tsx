import { Loader } from '@components/Button'

import React from 'react'

interface OrdersListHeaderProps {
  loading?: boolean
}

const OrdersListHeader: React.FC<OrdersListHeaderProps> = ({ loading }) => {
  return (
    <div className="flex flex-row justify-between items-center bg-dark-gray-500 py-8 sticky top-[2.85rem] z-[9999]">
      <div className="flex flex-row items-center space-x-2">
        <p className="text-light-gray-100 text-2xl">Meus Pedidos</p>

        {loading && <Loader />}
      </div>
    </div>
  )
}

export default OrdersListHeader
