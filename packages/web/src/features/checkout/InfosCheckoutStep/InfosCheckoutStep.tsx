import React from 'react'

import { CheckoutFluxLayout } from '@layouts/CheckoutFluxLayout'

import UserProfileFormSection from '@features/user/UserProfileFormSection'

interface CartListProps {
  isReadonly?: boolean
  summaryButtonTitle?: string
  buttonClick?: () => void
}

const InfosCheckoutStep: React.FC<CartListProps> = ({
  buttonClick,
  summaryButtonTitle,
}) => {
  return (
    <CheckoutFluxLayout
      buttonClick={buttonClick}
      summaryButtonTitle={summaryButtonTitle}
    >
      <UserProfileFormSection checkout />
    </CheckoutFluxLayout>
  )
}

export default InfosCheckoutStep
