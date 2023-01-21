import { GetServerSideProps, NextPage } from 'next'
import { Icons, Button } from '@luma/ui'
import { parseCookies } from 'nookies'
import { useAuth } from '@contexts/AuthContext'
import { useCart } from '@contexts/CartContext'
import { NextSeo } from 'next-seo'

import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import CheckoutStepper from '@features/checkout/CheckoutStepper'

const Payment: NextPage = () => {
  const { cart } = useCart()
  const { user } = useAuth()

  return (
    <HeaderFooterLayout glassEffect={false}>
      <NextSeo
        title={
          cart?.products && cart?.products.length > 0
            ? 'Finalize sua compra'
            : 'Carrinho vazio'
        }
      />

      <main className="max-w-screen-2xl mx-auto px-8 sm:px-16 my-20">
        {cart?.products && cart.products.length > 0 ? (
          <CheckoutStepper />
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] mx-6">
            <Icons.EmptyCart className="scale-75 text-light-gray-300 dark:text-dark-gray-400 opacity-50" />

            <p className="text-2xl text-primary font-medium">
              Seu carrinho está vazio
            </p>
            <p className="mb-8 text-center">
              Ops, parece que seu carrinho está vazio. Vamos as compras?
            </p>

            <div className="flex flex-col-reverse sm:flex-row sm:space-x-2 max-sm:w-full">
              {!user && (
                <Button
                  href="/auth"
                  variant="outlined"
                  className="flex-nowrap max-sm:w-full max-sm:mt-2"
                  rounded
                >
                  Login/Cadastro
                </Button>
              )}

              <Button
                href="/"
                variant="filled"
                className="flex-nowrap max-sm:w-full bg-success-400"
                rounded
              >
                Voltar para a loja
              </Button>
            </div>
          </div>
        )}
      </main>
    </HeaderFooterLayout>
  )
}

export default Payment

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'hytzenshop.cart': cartCookie } = parseCookies(ctx)

  if (!JSON.parse(cartCookie).products?.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
