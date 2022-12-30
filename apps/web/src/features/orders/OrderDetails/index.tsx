import {
  TbArrowLeft,
  TbBox,
  TbCheck,
  TbClock,
  TbCreditCard,
  TbDownload,
  TbInfoCircle,
  TbTruckDelivery,
} from 'react-icons/tb'

import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { DivideY, CopyToClipboard, Tooltip } from '@luma/ui'
import { Order, PaymentSocketResponse } from '@hytzenshop/types'
import { useDebounceCallback } from '@react-hook/debounce'
import { Shared, StepperBar } from '@luma/ui'
import { c, date, money } from '@hytzenshop/helpers'
import { useRouter } from 'next/router'
import { socket } from '@services/socket'
import { api } from '@hytzenshop/services'

import OrderedProductPreview from '../OrderedProductPreview'
import InfoCard from './InfoCard'
import Button from '@components/Button'
import Image from 'next/image'
import React from 'react'

interface OrderDetailsProps {
  order?: Order
}

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

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const queryClient = useQueryClient()

  const { back } = useRouter()

  const orderPaymentQuery = useQuery(
    ['order-payment', order?.mpPaymentId],
    () => getOrderPaymentDetails(order),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<any, unknown>

  const { statusLabel, statusColor, statusTooltip } = Shared.useOrder(
    order || ({} as Order)
  )

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

  const onSocketUpdatePayment = useDebounceCallback(
    ({ data }: PaymentSocketResponse) => {
      console.log('Order Details', data.status)
      queryClient.invalidateQueries(['order-payment', order?.mpPaymentId])
      queryClient.invalidateQueries(['order', order?.id])
    }
  )

  React.useEffect(() => {
    if (order?.status !== 'approved') {
      socket.on('update.payment', ({ data }: PaymentSocketResponse) => {
        onSocketUpdatePayment({ data })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSocketUpdatePayment])

  return (
    <div className="relative">
      <Button
        onClick={back}
        className="sticky top-[3.23rem] px-6 pt-6 hover:text-light-gray-100 bg-black w-full justify-start z-50"
      >
        <TbArrowLeft className="absolute left-0" size={16} />
        Voltar
      </Button>

      <div className="flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-2 items-start sm:items-center justify-between pt-8">
        <div className="flex flex-row space-x-2 items-center">
          <p className="text-xl text-light-gray-100">
            Pedido #{order?.mpPaymentId}
          </p>
          <Tooltip content={statusTooltip}>
            <p
              className={c(
                statusColor,
                'flex flex-row items-center justify-center text-xs font-semibold min-w-max text-light-gray-100 select-none px-2 py-1 space-x-2 rounded-full'
              )}
            >
              {statusLabel}
              <TbInfoCircle style={{ marginLeft: 4 }} />
            </p>
          </Tooltip>
        </div>
      </div>

      <StepperBar
        steps={steps}
        activeStep={statusBySteps}
        stepIcon={stepIcon}
        activeColor="success"
      />

      <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between max-sm:w-full my-8">
        <div className="flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-4 max-sm:w-full">
          <div className="flex flex-row sm:items-center justify-between sm:justify-center space-x-1 max-sm:w-full">
            <p className="text-sm">Data do pedido:</p>
            <p className="text-light-gray-100">{date(order?.createdAt)}</p>
          </div>
          <div className="flex flex-row sm:items-center justify-between sm:justify-center space-x-1 max-sm:w-full">
            <p className="text-sm">Previsão de entrega:</p>
            <p className="text-light-gray-100">
              {order?.shipping && date(JSON.parse(order?.shipping).dtPrevEnt)}
            </p>
          </div>
        </div>
      </div>

      <DivideY>
        <div className="flex flex-col lg:flex-row max-lg:space-y-4 lg:space-x-4">
          <div className="flex flex-col flex-1 space-y-4 mt-4">
            <p className="text-light-gray-100">Pagamento:</p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between max-sm:space-y-4 bg-dark-gray-400 rounded-md px-6 py-4 flex-1 h-fit">
              <div className="flex flex-col sm:flex-row justify-between sm:space-x-8 max-sm:space-y-2">
                <div>
                  <p className="text-sm">Forma de pagamento:</p>
                  <p className="text-light-gray-100 capitalize">
                    {(orderPaymentQuery.data?.response
                      .payment_method_id as string) ?? '-'}{' '}
                    {orderPaymentQuery.data?.response.payment_type_id ===
                      'credit_card' &&
                      `${
                        orderPaymentQuery.data?.response.transaction_details
                          .total_paid_amount /
                          orderPaymentQuery.data?.response.transaction_details
                            .installment_amount ?? '-'
                      }x`}
                  </p>
                </div>

                {order?.status === 'pending' ? (
                  <div>
                    {orderPaymentQuery.data?.response.payment_method_id ===
                    'pix' ? (
                      <p className="text-sm">Código de pagamento</p>
                    ) : (
                      <p className="text-sm">Código do boleto:</p>
                    )}

                    {orderPaymentQuery.data?.response.payment_method_id ===
                    'pix' ? (
                      <p className="text-light-gray-100">
                        <CopyToClipboard
                          value={
                            orderPaymentQuery.data?.response
                              .point_of_interaction.transaction_data.qr_code
                          }
                          truncate
                        />
                      </p>
                    ) : (
                      <p className="text-light-gray-100">
                        <CopyToClipboard
                          value={
                            orderPaymentQuery.data?.response.barcode.content
                          }
                        />
                      </p>
                    )}
                  </div>
                ) : null}

                <div>
                  <p className="text-sm">Total:</p>
                  <p className="text-light-gray-100">{money(order?.amount)}</p>
                </div>
              </div>

              {order?.status === 'pending' &&
              orderPaymentQuery.data?.response.payment_method_id === 'pix' ? (
                <Image
                  src={`data:image/jpeg;base64,${orderPaymentQuery.data.response.point_of_interaction?.transaction_data?.qr_code_base64}`}
                  alt="QR Code"
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              ) : null}

              {order?.status === 'pending' &&
              orderPaymentQuery.data?.response.payment_method_id ===
                'bolbradesco' ? (
                <a
                  href={
                    orderPaymentQuery.data?.response?.transaction_details
                      ?.external_resource_url
                  }
                  download={
                    orderPaymentQuery.data?.response?.transaction_details
                      ?.external_resource_url
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="flex flex-row space-x-2 text-success-300">
                    <TbDownload />
                    <p>Baixar boleto</p>
                  </span>
                </a>
              ) : null}

              {order?.status !== 'pending' ? (
                <Button
                  href={`https://www.mercadopago.com.br/money-out/transfer/api/receipt/pix_pdf/${order?.mpPaymentId}/pix_account/pix_payment.pdf`}
                  className="max-sm:w-full bg-success-400"
                  variant="filled"
                  target="_blank"
                  rel="noreferrer"
                  download
                  rounded
                >
                  <span className="flex flex-row max-sm:justify-center space-x-2 text-light-gray-100">
                    <TbDownload />
                    <p>Ver comprovante</p>
                  </span>
                </Button>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col space-y-4 flex-1 mt-4">
            <p className="text-light-gray-100">Informações:</p>
            <InfoCard
              renderInsideCard={() => (
                <div className="flex flex-col max-sm:w-full">
                  <p className="text-sm">Endereço do pedido:</p>
                  <p className="text-sm text-light-gray-100">
                    {order?.address
                      ? `${order?.address?.street}, ${order?.address?.number} - ${order?.address?.district}`
                      : '-'}
                  </p>
                  <p className="text-sm text-light-gray-100">
                    {order?.address
                      ? `${order?.address?.city}/${order?.address?.uf} - ${order?.address?.cep}, ${order?.address?.country}`
                      : ''}
                  </p>
                </div>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row max-sm:space-y-4 md:space-x-4">
          <div className="flex flex-col space-y-4 flex-1">
            <p className="text-light-gray-100">Items do pedido:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-fit">
              {order?.orderedProducts &&
                order?.orderedProducts.map((item) => (
                  <OrderedProductPreview
                    key={item.id}
                    product={item}
                    order={order}
                  />
                ))}
            </div>
          </div>
        </div>
      </DivideY>
    </div>
  )
}
