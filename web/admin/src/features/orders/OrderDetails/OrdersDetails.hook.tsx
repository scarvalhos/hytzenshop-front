import {
  TbBox,
  TbCheck,
  TbClock,
  TbCreditCard,
  TbDashboard,
  TbTruck,
  TbTruckDelivery,
} from 'react-icons/tb'

import { Order, Option, StatusOrders } from '@hytzenshop/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { OrderDetailsProps } from './OrderDetails'
import { useOrders } from '@hooks/useOrders'
import { useForm } from 'react-hook-form'
import { api } from '@hytzenshop/services'

import React from 'react'

const steps = [
  'Aguardando pagamento',
  'Pagamento aprovado',
  'Preparando pedido',
  'Pedido enviado',
  'Pedido entregue',
]

const getOrderPaymentDetails = async (order?: Order) => {
  return api.get(`/checkout/${order?.mpPaymentId}`).then(({ data }) => data)
}

export const useOrdersDetails = ({ order }: OrderDetailsProps) => {
  const { register, control, setValue, getValues } = useForm()
  const { updatedOrderStatus } = useOrders({})

  const orderPaymentQuery = useQuery(
    ['order-payment', order?.mpPaymentId],
    () => getOrderPaymentDetails(order),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<any, unknown>

  const onChangeStatus = React.useCallback(
    (e: Option<StatusOrders>) => {
      updatedOrderStatus({ id: order.mpPaymentId, status: e.value })
    },
    [order.mpPaymentId, updatedOrderStatus]
  )

  const statusBySteps = React.useMemo(() => {
    return {
      pending: 0,
      approved: 1,
      processing: 2,
      sending: 3,
      delivered: 4,
    }[(order.status as string) || '']
  }, [order.status])

  const stepIcon = React.useMemo(() => {
    const icons: { [index: string]: React.ReactElement } = {
      1: <TbClock className="text-light-gray-100" />,
      2: <TbCreditCard className="text-light-gray-100" />,
      3: <TbBox className="text-light-gray-100" />,
      4: <TbTruckDelivery className="text-light-gray-100" />,
      5: <TbCheck className="text-light-gray-100" />,
    }

    return icons
  }, [])

  const breadCrumbsLinks = React.useMemo(
    () => [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: TbDashboard,
      },
      {
        title: 'Pedidos',
        href: '/dashboard/orders',
        icon: TbTruck,
      },
      {
        title: `Pedido #${order?.mpPaymentId}`,
        href: `/dashboard/orders/${order?.id}`,
        icon: TbBox,
      },
    ],
    [order?.id, order?.mpPaymentId]
  )

  return {
    register,
    control,
    setValue,
    getValues,
    orderPaymentQuery,
    onChangeStatus,
    statusBySteps,
    stepIcon,
    breadCrumbsLinks,
    steps,
  }
}
