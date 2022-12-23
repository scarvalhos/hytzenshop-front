import React from 'react'

import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { useAuth } from './AuthContext'
import { api } from '@services/api'

import {
  Cart,
  CartProduct,
  ShippingSimulationResponse,
} from '@hytzenshop/types'

type CartProviderProps = {
  children: React.ReactNode
}

type CartContextData = {
  cart: Cart
  totalAmount: number
  totalQuantity: number
  shipping?: ShippingSimulationResponse | null
  addToCart: (Cart: CartProduct) => void
  deleteProductFromCart: (productId: string) => void
  updateCart: (productToUpdate: CartProduct[]) => void
  uptadeQuantity: (productId: string, quant: number, canUpdate: boolean) => void
  resetCart: () => Promise<void>
  setShipping?: React.Dispatch<
    React.SetStateAction<ShippingSimulationResponse | null | undefined>
  >
}

export const CartContext = React.createContext({} as CartContextData)

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setToCart] = React.useState<Cart>({} as Cart)
  const [shipping, setShipping] =
    React.useState<ShippingSimulationResponse | null>()

  const [totalAmount, setTotalAmount] = React.useState(0)
  const [totalQuantity, setTotalQuantity] = React.useState(0)

  const { 'hytzenshop.cart': cartCookie } = parseCookies()
  const { user } = useAuth()

  const addToCart = React.useCallback(
    async (productToAdd: CartProduct) => {
      setCookie(
        undefined,
        'hytzenshop.cart',
        JSON.stringify({
          ...cart,
          products: cart.products
            ? [...cart.products, productToAdd]
            : [productToAdd],
        }),
        {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/', // Whitch paths in my app has access to this cookie
        }
      )

      setToCart({
        ...cart,
        products: cart.products
          ? [...cart.products, productToAdd]
          : [productToAdd],
      })
    },
    [cart]
  )

  const deleteProductFromCart = React.useCallback(
    async (productId: string) => {
      const newProducts = cart.products.filter((item) => item.id !== productId)

      setCookie(
        undefined,
        'hytzenshop.cart',
        JSON.stringify({
          ...cart,
          products: newProducts,
        }),
        {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/', // Whitch paths in my app has access to this cookie
        }
      )
      setToCart({ ...cart, products: newProducts })
    },
    [cart]
  )

  const updateCart = React.useCallback(
    async (productToUpdate: CartProduct[]) => {
      setCookie(
        undefined,
        'hytzenshop.cart',
        JSON.stringify({
          ...cart,
          products: productToUpdate,
        }),
        {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/', // Whitch paths in my app has access to this cookie
        }
      )
      setToCart({ ...cart, products: productToUpdate })
    },
    [cart]
  )

  const resetCart = React.useCallback(async () => {
    return api.get(`/carts/${user?.id}`).then(({ data }) => {
      api
        .put(`/carts/${data.cart.id}`, {
          products: [],
        })
        .then(() => {
          setToCart({
            ...cart,
            products: [],
          })
          destroyCookie(null, 'hytzenshop.cart', { path: '/' })
        })
    })
  }, [cart, user])

  const uptadeQuantity = React.useCallback(
    (productId: string, quant: number, canUpdate: boolean) => {
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
    [cart.products, updateCart]
  )

  React.useEffect(() => {
    if (cartCookie) {
      setToCart(JSON.parse(cartCookie))
    }
  }, [cartCookie])

  React.useEffect(() => {
    const quantities = cart && cart.products?.map((item) => item.quantity || 0)

    const totalPerProducts =
      cart &&
      cart.products?.map((item) => {
        const q = item.quantity || 0
        const p = item.unitaryPrice || 0

        return q * p
      })

    setTotalAmount(totalPerProducts?.reduce((p, n) => p + n, 0))
    setTotalQuantity(quantities?.reduce((prev, next) => prev + next, 0))
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteProductFromCart,
        totalAmount,
        totalQuantity,
        updateCart,
        resetCart,
        uptadeQuantity,
        setShipping,
        shipping,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return React.useContext(CartContext)
}
