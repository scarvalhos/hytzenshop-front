import * as React from 'react'

import {
  displayStatusOrders,
  statusOrdersOptions,
  statusOrdersColor,
  Order,
} from '@hytzenshop/types'

import { BreadCrumbs, Button, StepperBar } from '@luma/ui'
import { useOrdersDetails } from './OrdersDetails.hook'
import { date, money } from '@hytzenshop/helpers'
import { TbUpload } from 'react-icons/tb'
import { Status } from '@components/Input'

import OrderedProductPreview from '../OrderedProductPreview'
import UserCard from '@features/users/UserCard'

export interface OrderDetailsProps {
  order: Order
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const {
    orderPaymentQuery,
    breadCrumbsLinks,
    onChangeStatus,
    statusBySteps,
    getValues,
    register,
    setValue,
    stepIcon,
    control,
    steps,
  } = useOrdersDetails({ order })

  return (
    <>
      <BreadCrumbs
        className="py-4 mb-4 sticky top-0 z-40 bg"
        links={breadCrumbsLinks}
      />

      <div className="flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-2 items-start sm:items-center justify-between">
        <div className="flex flex-row space-x-2 items-center">
          <p className="text-xl text-primary">Pedido #{order?.mpPaymentId}</p>

          <Status
            {...register('status')}
            control={control}
            setValue={setValue}
            onChangeValue={onChangeStatus as any}
            value={getValues('status')}
            options={statusOrdersOptions}
            getColor={statusOrdersColor as any}
            defaultValue={{
              label: displayStatusOrders[order.status],
              value: order.status,
            }}
          />
        </div>
      </div>

      <StepperBar
        steps={steps}
        activeStep={statusBySteps}
        activeColor="success"
        stepIcon={stepIcon}
      />

      <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between max-sm:w-full my-8">
        <div className="flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-4 max-sm:w-full">
          <div className="flex flex-row sm:items-center justify-between sm:justify-center space-x-1 max-sm:w-full">
            <p className="text-sm">Data do pedido:</p>
            <p className="text-primary">{date(order?.createdAt)}</p>
          </div>
          <div className="flex flex-row sm:items-center justify-between sm:justify-center space-x-1 max-sm:w-full">
            <p className="text-sm">Previsão de entrega:</p>
            <p className="text-primary">
              {order?.shipping && date(JSON.parse(order?.shipping).dtPrevEnt)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 space-y-4 mt-4">
        <p className="text-primary">Pagamento:</p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between max-sm:space-y-4 bg-primary rounded-md px-6 py-4 flex-1 h-fit">
          <div className="flex flex-col sm:flex-row justify-between sm:space-x-8 max-sm:space-y-2">
            <div>
              <p className="text-sm">Forma de pagamento:</p>
              <p className="text-primary capitalize">
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

            <div>
              <p className="text-sm">Total:</p>
              <p className="text-primary">{money(order?.amount)}</p>
            </div>
          </div>

          {order?.status !== 'pending' ? (
            <Button
              className="max-sm:w-full bg-success-400"
              variant="filled"
              target="_blank"
              rounded
            >
              <span className="flex flex-row max-sm:justify-center space-x-2">
                <TbUpload />
                <p>Enviar comprovante</p>
              </span>
            </Button>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col space-y-4 flex-1 mt-4">
        <p className="text-primary">Dados do cliente:</p>
        <UserCard
          user={order.user}
          renderInsideCard={() => (
            <div>
              <p className="text-sm">Endereço:</p>
              <p className="text-sm text-primary">
                {`${order?.address?.street}, ${order?.address?.number}` || '-'}{' '}
                - {`${order?.address?.district}` || '-'}
              </p>
              <p className="text-sm text-primary">
                {`${order?.address?.city}/${order?.address?.uf}` || '-'} -{' '}
                {order?.address?.cep || '-'}, {order?.address?.country || '-'}
              </p>
            </div>
          )}
        />
      </div>

      <div className="flex flex-col md:flex-row max-sm:space-y-4 md:space-x-4 mt-4">
        <div className="flex flex-col space-y-4 flex-1">
          <p className="text-primary">Items do pedido:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-fit">
            {order?.orderedProducts &&
              order?.orderedProducts.map((item) => (
                <OrderedProductPreview key={item.id} product={item} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetails
