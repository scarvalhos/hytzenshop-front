import React from 'react'

import { CartSummary } from '@features/cart/CartSummary'
import { c } from '@hytzenshop/helpers'

interface CheckoutFluxLayoutProps {
  children: React.ReactNode
  summaryButtonTitle?: string
  containerClassName?: string
  checkoutNextStep?: () => void
}

export const CheckoutFluxLayout: React.FC<CheckoutFluxLayoutProps> =
  React.forwardRef(
    ({
      children,
      summaryButtonTitle,
      checkoutNextStep,
      containerClassName,
    }) => {
      return (
        <div
          className={c(
            'flex flex-col lg:flex-row my-8 lg:space-x-4 max-lg:space-y-4',
            containerClassName
          )}
        >
          <div className="flex flex-col flex-1 space-y-4">
            <div className="flex flex-col space-y-4 flex-1">{children}</div>
          </div>

          <CartSummary
            checkoutNextStep={checkoutNextStep}
            summaryButtonTitle={summaryButtonTitle}
          />
        </div>
      )
    }
  )
