import React from 'react'

import { DivideLine } from '@luma/ui'
import { useRouter } from 'next/router'
import { useCart } from '@contexts/CartContext'

import Button from '@components/Button'

interface CartSummaryProps {
  render?: React.ReactNode
  summaryButtonTitle?: string
  buttonClick?: () => void
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  render,
  buttonClick,
  summaryButtonTitle,
}) => {
  const { totalAmount, totalQuantity } = useCart()
  const { push } = useRouter()

  const frete = 16

  const handleSendToCheckout = () => {
    push('/checkout/payment')
  }

  return (
    <div className="flex flex-col space-y-8 max-w-md flex-1 h-fit bg-dark-gray-400 px-8 py-6 rounded-md">
      <p className="text-xl font-medium text-light-gray-100">
        Resumo do pedido
      </p>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex flex-row justify-between">
            <p>{totalQuantity} Produtos</p>
            <p>
              {totalAmount?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </div>

          <div className="flex flex-row justify-between">
            <p>Frete:</p>
            <p>
              {frete.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </div>
        </div>

        <DivideLine />

        <div className="flex flex-row justify-between">
          <p>Total:</p>
          <p>
            {(frete + totalAmount).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
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
                onClick={buttonClick || handleSendToCheckout}
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
