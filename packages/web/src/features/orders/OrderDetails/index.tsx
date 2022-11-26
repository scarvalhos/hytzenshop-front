import {
  TbArrowLeft,
  TbBox,
  TbCheck,
  TbClock,
  TbCreditCard,
  TbInfoCircle,
  TbTruckDelivery,
} from 'react-icons/tb'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Order as IOrder, Order } from '@utils/types'
import { Divide, StepperBar } from '@core'
import { c, date, money } from '@utils/helpers'
import { useRouter } from 'next/router'
import { useOrder } from '../Order/Order.hook'
import { api } from '@services/apiClient'

import OrderedProductPreview from '../OrderedProductPreview'
import InfoCard from './InfoCard'
import Button from '@components/Button'
import React from 'react'

interface OrderDetailsProps {
  order?: IOrder
}

const steps = [
  'Aguardando pagamento',
  'Pagamento aprovado',
  'Preparando pedido',
  'Pedido enviado',
  'Pedido entregue',
]

async function getOrderPaymentDetails(order?: Order) {
  const { data } = await api.get(`/checkout/${order?.mpPaymentId}`)

  return data
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const orderPaymentQuery = useQuery(
    ['order-payment', order?.mpPaymentId],
    () => getOrderPaymentDetails(order),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<any, unknown>

  const { statusLabel, statusColor } = useOrder(order || ({} as Order))
  const { back } = useRouter()

  const statusBySteps = React.useMemo(() => {
    return {
      pending: 0,
      approved: 1,
      processing: 2,
      sending: 3,
      delivered: 4,
    }[(order?.status as string) || '']
  }, [order?.status])

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

  return (
    <div className="relative">
      <Button
        onClick={back}
        className="absolute top-0 pl-6 p-0 hover:text-light-gray-100"
      >
        <TbArrowLeft className="absolute left-0" size={16} />
        Voltar
      </Button>

      <div className="flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-2 items-start sm:items-center justify-between pt-8">
        <div className="flex flex-row space-x-2 items-center">
          <p className="text-xl text-light-gray-100">
            Pedido #{order?.mpPaymentId}
          </p>{' '}
          {/* <Tooltip title={statusTooltip}> */}
          <p
            className={c(
              statusColor,
              'flex flex-row items-center justify-center text-xs min-w-max text-light-gray-100 select-none px-2 py-1 space-x-2 rounded-full'
            )}
          >
            {statusLabel}
            <TbInfoCircle style={{ marginLeft: 4 }} />
          </p>
          {/* </Tooltip> */}
        </div>
      </div>

      <StepperBar
        steps={steps}
        activeStep={statusBySteps}
        stepIcon={stepIcon}
      />

      <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between max-sm:w-full my-8">
        <div className="flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-4 max-sm:w-full">
          <div className="flex flex-row sm:items-center justify-between sm:justify-center space-x-1 max-sm:w-full">
            <p className="text-sm">Data do pedido:</p>
            <p className="text-light-gray-100">
              {date(order?.createdAt || '')}
            </p>
          </div>
          <div className="flex flex-row sm:items-center justify-between sm:justify-center space-x-1 max-sm:w-full">
            <p className="text-sm">Previsão de entrega:</p>
            <p className="text-light-gray-100">30/09/2022</p>
          </div>
        </div>
      </div>

      <Divide.DivideY>
        <div className="flex flex-col space-y-4 mt-4">
          <p className="text-light-gray-100">Informações:</p>
          <InfoCard
            renderInsideCard={() => (
              <div className="flex flex-col max-sm:w-full">
                <p className="text-sm">Endereço do pedido:</p>
                <p className="text-sm text-light-gray-100">
                  {`${order?.address?.street}, ${order?.address?.number}` ||
                    '-'}{' '}
                  - {`${order?.address?.district}` || '-'}
                </p>
                <p className="text-sm text-light-gray-100">
                  {`${order?.address?.city}/${order?.address?.uf}` || '-'} -{' '}
                  {order?.address?.cep || '-'}, {order?.address?.country || '-'}
                </p>
              </div>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row max-sm:space-y-4 md:space-x-4">
          <div className="flex flex-col space-y-4 h-fit flex-1">
            <p className="text-light-gray-100">Detalhes do pedido:</p>
            <div className="flex flex-col space-y-2 bg-dark-gray-400 rounded-md px-6 py-4 flex-1 h-fit">
              <div className="flex flex-col sm:flex-row justify-between max-sm:space-y-2 ">
                <div>
                  <p className="text-sm">Produtos:</p>
                  <p className="text-light-gray-100">
                    {order?.orderedProducts.length} itens
                  </p>
                </div>

                <div>
                  <p className="text-sm">Forma de pagamento:</p>
                  <p className="text-light-gray-100 capitalize">
                    {
                      orderPaymentQuery.data?.response
                        .payment_method_id as string
                    }{' '}
                    {orderPaymentQuery.data?.response.payment_type_id ===
                      'credit_card' &&
                      `${
                        orderPaymentQuery.data?.response.transaction_details
                          .total_paid_amount /
                        orderPaymentQuery.data?.response.transaction_details
                          .installment_amount
                      }x`}
                  </p>
                </div>

                <div>
                  <p className="text-sm">Total:</p>
                  <p className="text-light-gray-100">{money(order?.amount)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4 flex-1">
            <p className="text-light-gray-100">Items do pedido:</p>
            <div className="flex flex-col space-y-2 bg-dark-gray-400 rounded-md px-6 py-4 flex-1 h-fit">
              <Divide.DivideY>
                {order?.orderedProducts &&
                  order?.orderedProducts.map((item) => (
                    <OrderedProductPreview key={item.id} product={item} />
                  ))}
              </Divide.DivideY>
            </div>
          </div>
        </div>
      </Divide.DivideY>
    </div>
  )
}
