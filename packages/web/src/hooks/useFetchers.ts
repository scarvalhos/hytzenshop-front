import React from 'react'

import { paymentMethods, paymentMethodsMessage } from '@utils/etc'
import { defaultToastError, numtostr } from '@utils/helpers'
import { Order, OrderStatus, PaymentStatus } from '@utils/types'
import { ProductGetDto } from '@utils/dtos/productDto'
import { OrderGetDto } from '@utils/dtos/orderDto'
import { useCart } from '@contexts/CartContext'
import { useAuth } from '@contexts/AuthContext'
import { toast } from 'react-toastify'
import { api } from '@services/apiClient'

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
  callback: (props: any) => void
}

export const useFetchers = () => {
  const { cart, totalAmount, resetCart } = useCart()
  const { user } = useAuth()

  const createOrder = React.useCallback(
    async (mpPaymentId: string, status: OrderStatus) => {
      if (!user) return

      const order: Partial<Order> = {
        userId: user.id,
        orderedProducts: cart.products.map((item) => ({
          productId: item.productId,
          colors: item.colors,
          sizes: item.sizes,
          quantity: item.quantity,
        })),
        status,
        amount: totalAmount,
        addressId: user.profile?.address?.id,
        mpPaymentId,
      }

      try {
        const { data } = await api.post<OrderGetDto>('/orders', order)

        resetCart()

        return toast.success(data.message)
      } catch (error) {
        return defaultToastError(error)
      }
    },
    [cart.products, resetCart, totalAmount, user]
  )

  const updateOrder = React.useCallback(
    async (status: PaymentStatus, mpPaymentId: string) => {
      if (!user) return

      try {
        const { data } = await api.patch<OrderGetDto>(
          `/orders/${mpPaymentId}/${status}`
        )

        return toast(data.message)
      } catch (error) {
        return defaultToastError(error)
      }
    },
    [user]
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

        if (status && status === 400) {
          return callback({
            message: paymentMethodsMessage[cardFormData.payment_method_id],
            status: response.status,
          })
        }

        switch (status) {
          case 400:
            return callback({
              message: paymentMethodsMessage[cardFormData.payment_method_id],
              status: response.status,
            })

          case 201 || 200:
            createOrder(response?.id && numtostr(response.id), response.status)

            if (cardFormData.payment_method_id === 'pix') {
              return callback({
                qr_code_base64:
                  response.point_of_interaction.transaction_data.qr_code_base64,
                qr_code: response.point_of_interaction.transaction_data.qr_code,
              })
            } else {
              callback({ status: response.status })
            }
            break
          default:
            break
        }
      } catch (error) {
        callback({
          message: `${
            paymentMethodsMessage[cardFormData.payment_method_id]
          } ${error}`,
          status: 400,
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
    updateOrder,
    getProductsFromOrder,
  }
}
