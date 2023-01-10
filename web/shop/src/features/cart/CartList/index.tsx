import * as React from 'react'

import { CartSummary } from '@features/cart/CartSummary'
import { useCart } from '@contexts/CartContext'
import { c } from '@hytzenshop/helpers'

import CartCard from '../CartCard'

interface CartListProps {
  isReadonly?: boolean
  summaryButtonTitle?: string
  containerClassName?: string
  checkoutNextStep?: () => void
}

export const CartList: React.FC<CartListProps> = ({
  isReadonly,
  checkoutNextStep,
  summaryButtonTitle,
  containerClassName,
}) => {
  const [canUpdate, setCanUpdate] = React.useState(false)
  const { cart, updateCart } = useCart()

  const uptadeQuantity = React.useCallback(
    (productId: string, quant: number) => {
      if (canUpdate) {
        const newCartProducts = [...cart.products]

        const productInCart = newCartProducts.find(
          (item) => item.id === productId
        )

        if (productInCart) {
          productInCart.quantity = quant

          newCartProducts
            .filter((item) => item.id !== productId)
            .push(productInCart)

          updateCart(newCartProducts)
        }
      }
    },
    [canUpdate, cart.products, updateCart]
  )

  const handleSetCanUpdate = React.useCallback((value: boolean) => {
    setCanUpdate(value)
  }, [])

  return (
    <div
      className={c(
        'flex flex-col sm:flex-row mx-8 my-28 sm:space-x-4 max-sm:space-y-4',
        containerClassName
      )}
    >
      <div className="flex flex-col flex-1 space-y-4">
        {cart &&
          cart.products?.map((item) => (
            <CartCard
              key={item.id}
              product={item}
              canUpdate={canUpdate}
              uptadeQuantity={uptadeQuantity}
              handleSetCanUpdate={handleSetCanUpdate}
              isReadonly={isReadonly}
            />
          ))}
      </div>

      <CartSummary
        checkoutNextStep={checkoutNextStep}
        summaryButtonTitle={summaryButtonTitle}
      />
    </div>
  )
}
