import React from 'react'

import {
  paymentMethods,
  paymentMethodsMessage,
  Order,
  OrderStatus,
  ProductGetDto,
  OrderGetDto,
} from '@hytzenshop/types'

import { defaultToastError, numtostr } from '@hytzenshop/helpers'
import { PaymentResponseProps } from '@features/checkout/PaymentCheckoutStep/PaymentCheckoutStep'
import { useCart } from '@contexts/CartContext'
import { useAuth } from '@contexts/AuthContext'
import { api } from '@hytzenshop/services'

export interface Payment {
  token?: string
  issuer_id?: string
  payment_method_id: string
  transaction_amount: number
  installments?: number
  description: string
  payer: {
    email: string
    first_name: string
    last_name?: string
    identification: {
      type: string
      number: string
    }
  }
  notification_url?: string
}

export interface CreatePaymentProps {
  cardFormData: Payment
  callback: (props: PaymentResponseProps) => void
}

export const useFetchers = () => {
  const { cart, totalAmount, resetCart, setShipping, shipping } = useCart()
  const { user } = useAuth()

  const createOrder = React.useCallback(
    async (mpPaymentId: string, status: OrderStatus) => {
      if (!user) return

      const order: Partial<Order> = {
        userId: user.id,
        orderedProducts: cart?.products?.map((item) => ({
          productId: item.productId,
          colors: item.colors,
          sizes: item.sizes,
          quantity: item.quantity,
        })),
        status,
        amount: (totalAmount || 0) + (shipping?.vlrFrete || 0),
        addressId: user.profile?.address?.id,
        mpPaymentId,
        shipping: JSON.stringify(shipping),
      }

      try {
        return api.post<OrderGetDto>('/orders', order).then(() => {
          if (cart?.products?.length) {
            resetCart()
            setShipping && setShipping(null)
          }
        })
      } catch (error) {
        return defaultToastError(error)
      }
    },
    [cart?.products, resetCart, setShipping, shipping, totalAmount, user]
  )

  const createPayment = React.useCallback(
    async ({ cardFormData, callback }: CreatePaymentProps) => {
      try {
        const {
          data: { response, status },
        } = await api.post(
          `/checkout/payment${paymentMethods[cardFormData.payment_method_id]}`,
          cardFormData
        )

        switch (status) {
          case 400:
            return callback({
              message: paymentMethodsMessage[cardFormData.payment_method_id],
              response,
            })

          case 201 || 200:
            createOrder(response?.id && numtostr(response.id), response.status)

            return callback({
              response,
            })
          default:
            break
        }
      } catch (error) {
        callback({
          message: `${
            paymentMethodsMessage[cardFormData.payment_method_id]
          } ${error}`,
          response: {
            status: 'rejected',
          },
        })

        defaultToastError(error)
      }
    },
    [createOrder]
  )

  const getProductsFromOrder = React.useCallback(async (productId: string) => {
    const {
      data: { product },
    } = await api.get<ProductGetDto>(`/products/${productId}`)

    return product
  }, [])

  return {
    createPayment,
    createOrder,
    getProductsFromOrder,
  }
}
