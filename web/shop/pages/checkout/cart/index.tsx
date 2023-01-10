import { CartProduct, UserGetDto, CartGetDto } from '@hytzenshop/types'
import { DivideLine, Icons, Button } from '@luma/ui'
import { withAuthValidate } from '@hocs/withAuthValidate'
import { useConfig } from '@contexts/ConfigContext'
import { CartList } from '@features/cart/CartList'
import { randonfy } from '@hytzenshop/helpers'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useAuth } from '@contexts/AuthContext'
import { useCart } from '@contexts/CartContext'
import { api } from '@hytzenshop/services'

import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import ProductSection from '@features/product/ProductSection'
import nookies, { parseCookies } from 'nookies'
import React from 'react'

const CartPage: NextPage = () => {
  const { productsSugestions } = useConfig()
  const { cart } = useCart()
  const { user } = useAuth()

  return (
    <HeaderFooterLayout>
      <NextSeo
        title={cart.products?.length > 0 ? 'Meu carrinho' : 'Carrinho vazio'}
      />

      <main className="max-w-screen-2xl mx-auto my-20">
        {cart.products?.length > 0 ? (
          <CartList />
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] mx-6">
            <Icons.EmptyCart className="scale-75 text-dark-gray-400" />

            <p className="text-2xl text-light-gray-100 font-medium">
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

        <DivideLine dividerClassName="mx-8 sm:mx-16 my-16" />

        <ProductSection
          title="Você Também Pode Gostar"
          products={randonfy(productsSugestions?.data.products || []).slice(
            0,
            5
          )}
        />
      </main>
    </HeaderFooterLayout>
  )
}

export default CartPage

export const getServerSideProps = withAuthValidate(async (ctx) => {
  const cookies = parseCookies(ctx)

  if (cookies) {
    api.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${cookies['hytzenshop.token']}`
  }

  const { 'hytzenshop.token': token } = parseCookies(ctx)
  const { 'hytzenshop.cart': cartCookie } = parseCookies(ctx)

  if (!token && !cartCookie) {
    nookies.set(
      ctx,
      'hytzenshop.cart',
      JSON.stringify({
        products: [],
      }),
      {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/', // Whitch paths in my app has access to this cookie
      }
    )
  }

  if (token) {
    const {
      data: { user },
    } = await api.get<UserGetDto>('/auth/me')

    const {
      data: { cart },
    } = await api.get<CartGetDto>(`/carts/${user.id}`)

    if (!cart && !cartCookie) {
      const { data } = await api.post('/carts', {
        userId: user.id,
        products: [],
      })

      nookies.set(
        ctx,
        'hytzenshop.cart',
        JSON.stringify({
          id: data.id,
          userId: user.id,
          products: [],
        }),
        {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/', // Whitch paths in my app has access to this cookie
        }
      )
    }

    if (!cart && cartCookie) {
      const {
        data: { cart },
      } = await api.post<CartGetDto>('/carts', {
        userId: user.id,
        products: JSON.parse(cartCookie).products.map(
          (product: CartProduct) => product.productId
        ),
      })

      nookies.set(
        ctx,
        'hytzenshop.cart',
        JSON.stringify({
          id: cart.id,
          userId: user.id,
          products: JSON.parse(cartCookie).products,
        }),
        {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/', // Whitch paths in my app has access to this cookie
        }
      )
    }

    if (cart && cartCookie) {
      await api.put<CartGetDto>(`/carts/${cart.id}`, {
        userId: user.id,
        products: JSON.parse(cartCookie).products.map(
          (i: CartProduct) => i.productId
        ),
      })
    }

    if (cart && !cartCookie) {
      nookies.set(ctx, 'hytzenshop.cart', JSON.stringify(cart), {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/', // Whitch paths in my app has access to this cookie
      })
    }
  }

  return {
    props: {},
  }
})
