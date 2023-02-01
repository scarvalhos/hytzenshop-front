import { Loader } from '@luma/ui'

import React from 'react'

interface OrdersListHeaderProps {
  loading?: boolean
}

const OrdersListHeader: React.FC<OrdersListHeaderProps> = ({ loading }) => {
  return (
    <div className="flex flex-row justify-between items-center bg-black py-4 sticky top-[3.25rem] z-40">
      <div className="flex flex-row items-center justify-between space-x-2">
        <p className="text-light-gray-100 font-medium text-2xl">Meus Pedidos</p>
        {loading && <Loader className="static" />}
      </div>
    </div>
  )
}

export default OrdersListHeader
