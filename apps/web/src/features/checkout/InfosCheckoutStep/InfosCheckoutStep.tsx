import UserProfileFormSection from '@features/user/UserProfileFormSection'
import React from 'react'

import { CheckoutFluxLayout } from '@layouts/CheckoutFluxLayout'

interface InfosCheckoutStepProps {
  isReadonly?: boolean
  summaryButtonTitle?: string
  checkoutNextStep?: () => void
}

const InfosCheckoutStep: React.FC<InfosCheckoutStepProps> = ({
  checkoutNextStep,
  summaryButtonTitle,
}) => {
  return (
    <CheckoutFluxLayout
      checkoutNextStep={checkoutNextStep}
      summaryButtonTitle={summaryButtonTitle}
    >
      <UserProfileFormSection checkout />
    </CheckoutFluxLayout>
  )
}

export default InfosCheckoutStep
