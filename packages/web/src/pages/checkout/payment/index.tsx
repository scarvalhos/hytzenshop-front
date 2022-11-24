import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import CheckoutStepper from '@features/checkout/CheckoutStepper'

const Payment: NextPage = () => {
  return (
    <HeaderFooterLayout>
      <NextSeo title="Finalize sua compra" />

      <CheckoutStepper />
    </HeaderFooterLayout>
  )
}

export default Payment
