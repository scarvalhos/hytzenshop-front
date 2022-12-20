import { Loader } from '@components/Button'

import React from 'react'

interface OrdersListHeaderProps {
  loading?: boolean
}

const OrdersListHeader: React.FC<OrdersListHeaderProps> = ({ loading }) => {
  return (
    <div className="flex flex-row justify-between items-center bg-black py-4 sticky top-[3rem] z-40">
      <div className="flex flex-row items-center space-x-2">
        <p className="text-light-gray-100 text-xl">Meus Pedidos</p>
        {loading && <Loader />}
      </div>
    </div>
  )
}

export default OrdersListHeader
