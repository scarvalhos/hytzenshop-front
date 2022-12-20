import React from 'react'

import {
  ProductGetAllDto,
  CartProduct,
  UserGetDto,
  CartGetDto,
} from '@hytzenshop/types'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { DivideLine, Icons } from '@luma/ui'
import { withAuthValidate } from '@hocs/withAuthValidate'
import { setUpAPIClient } from '@services/api'
import { getProductList } from '@hooks/useProducts'
import { CartList } from '@features/cart/CartList'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useAuth } from '@contexts/AuthContext'
import { useCart } from '@contexts/CartContext'

import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import ProductSection from '@features/product/ProductSection'
import nookies, { parseCookies } from 'nookies'
import Button from '@components/Button'

const CartPage: NextPage = () => {
  const { cart } = useCart()
  const { user } = useAuth()

  const { data } = useQuery(['products-cart'], () => getProductList(1, 5), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  }) as UseQueryResult<ProductGetAllDto, unknown>

  return (
    <HeaderFooterLayout>
      <NextSeo
        title={cart.products?.length > 0 ? 'Meu carrinho' : 'Carrinho vazio'}
      />

      {cart.products?.length > 0 ? (
        <CartList />
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 h-[50vh] mx-6">
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
        products={data?.data.products || []}
      />
    </HeaderFooterLayout>
  )
}

export default CartPage

export const getServerSideProps = withAuthValidate(async (ctx) => {
  const apiClient = setUpAPIClient(ctx)

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
    } = await apiClient.get<UserGetDto>('/auth/me')

    const {
      data: { cart },
    } = await apiClient.get<CartGetDto>(`/carts/${user.id}`)

    if (!cart && !cartCookie) {
      const { data } = await apiClient.post('/carts', {
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
      } = await apiClient.post<CartGetDto>('/carts', {
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
      await apiClient.put<CartGetDto>(`/carts/${cart.id}`, {
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
