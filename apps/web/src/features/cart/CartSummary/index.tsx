import { DivideLine } from '@luma/ui'
import { useRouter } from 'next/router'
import { useCart } from '@contexts/CartContext'
import { Button } from '@luma/ui'
import { money } from '@hytzenshop/helpers'

import React from 'react'

interface CartSummaryProps {
  render?: React.ReactNode
  summaryButtonTitle?: string
  checkoutNextStep?: () => void
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  render,
  checkoutNextStep,
  summaryButtonTitle,
}) => {
  const { totalAmount, totalQuantity, shipping } = useCart()
  const { push } = useRouter()

  const handleSendToCheckout = () => {
    push('/checkout/payment')
  }

  return (
    <div className="flex flex-col space-y-8 max-w-screen-md flex-1 h-fit bg-dark-gray-500 bg-opacity-30 px-8 py-6 rounded-md">
      <p className="text-xl font-medium text-light-gray-100">
        Resumo do pedido
      </p>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex flex-row justify-between">
            <p>{totalQuantity} Produtos</p>
            <p>{money(totalAmount)}</p>
          </div>

          {shipping?.vlrFrete ? (
            <div className="flex flex-row justify-between">
              <p>Frete:</p>
              <p>{money(shipping?.vlrFrete)}</p>
            </div>
          ) : null}
        </div>

        <DivideLine />

        <div className="flex flex-row justify-between">
          <p>Total:</p>
          <p>{money((shipping?.vlrFrete || 0) + totalAmount)}</p>
        </div>

        {render ? (
          render
        ) : (
          <>
            {render ? (
              render
            ) : (
              <Button
                variant="filled"
                onClick={
                  checkoutNextStep ? checkoutNextStep : handleSendToCheckout
                }
                className="w-full"
              >
                {summaryButtonTitle || 'Continuar'}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
