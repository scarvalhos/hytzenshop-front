import { GetServerSideProps, NextPage } from 'next'
import { parseCookies } from 'nookies'
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'hytzenshop.cart': cartCookie } = parseCookies(ctx)

  if (JSON.parse(cartCookie).products.length === 0) {
    return {
      redirect: {
        destination: '/checkout/cart',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
