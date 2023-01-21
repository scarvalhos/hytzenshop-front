import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import CheckoutStepper from '@features/checkout/CheckoutStepper'

const Payment: NextPage = () => {
  return (
    <HeaderFooterLayout glassEffect={false}>
      <NextSeo title="Finalize sua compra" />

      <main className="max-w-screen-2xl mx-auto px-8 sm:px-16 my-20">
        <CheckoutStepper />
      </main>
    </HeaderFooterLayout>
  )
}

export default Payment
