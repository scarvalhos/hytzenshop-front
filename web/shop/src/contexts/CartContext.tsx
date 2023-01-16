import React from 'react'

import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { useAuth } from './AuthContext'
import { api } from '@hytzenshop/services'

import {
  Cart,
  CartProduct,
  ShippingSimulationResponse,
} from '@hytzenshop/types'

type CartProviderProps = {
  children: React.ReactNode
}

interface CartState {
  cart?: Partial<Cart>
  totalAmount?: number
  totalQuantity?: number
  shipping?: ShippingSimulationResponse | null
}

type CartContextData = CartState & {
  addToCart: (Cart: CartProduct) => void
  deleteProductFromCart: (productId: string) => void
  updateCart: (productToUpdate: CartProduct[]) => void
  uptadeQuantity: (productId: string, quant: number, canUpdate: boolean) => void
  resetCart: () => Promise<void>
  setShipping?: (s: ShippingSimulationResponse | null) => void
}

export const CartContext = React.createContext({} as CartContextData)

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = React.useReducer(
    (prev: CartState, next: CartState) => {
      return { ...prev, ...next }
    },
    {
      cart: {} as Cart,
      totalAmount: 0,
      totalQuantity: 0,
      shipping: null,
    }
  )

  const { 'hytzenshop.cart': cartCookie } = parseCookies()
  const { user } = useAuth()

  const addToCart = React.useCallback(
    async (productToAdd: CartProduct) => {
      setCookie(
        undefined,
        'hytzenshop.cart',
        JSON.stringify({
          ...state.cart,
          products: state?.cart?.products
            ? [...(state?.cart?.products || []), productToAdd]
            : [productToAdd],
        }),
        {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/', // Whitch paths in my app has access to this cookie
        }
      )

      dispatch({
        cart: {
          ...state.cart,
          products: state?.cart?.products
            ? [...(state?.cart?.products || []), productToAdd]
            : [productToAdd],
        },
      })
    },
    [state.cart]
  )

  const deleteProductFromCart = React.useCallback(
    async (productId: string) => {
      const newProducts = (state?.cart?.products || []).filter(
        (item) => item.id !== productId
      )

      setCookie(
        undefined,
        'hytzenshop.cart',
        JSON.stringify({
          ...state?.cart,
          products: newProducts,
        }),
        {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/', // Whitch paths in my app has access to this cookie
        }
      )

      dispatch({
        cart: { ...state?.cart, products: newProducts },
      })
    },
    [state?.cart]
  )

  const updateCart = React.useCallback(
    async (productToUpdate: CartProduct[]) => {
      setCookie(
        undefined,
        'hytzenshop.cart',
        JSON.stringify({
          ...state?.cart,
          products: productToUpdate,
        }),
        {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/', // Whitch paths in my app has access to this cookie
        }
      )

      dispatch({
        cart: { ...state?.cart, products: productToUpdate },
      })
    },
    [state?.cart]
  )

  const resetCart = React.useCallback(async () => {
    return api.get(`/carts/${user?.id}`).then(({ data }) => {
      api
        .put(`/carts/${data.cart.id}`, {
          products: [],
        })
        .then(() => {
          dispatch({
            cart: {
              ...state?.cart,
              products: [],
            },
          })

          destroyCookie(null, 'hytzenshop.cart', { path: '/' })
        })
    })
  }, [state?.cart, user?.id])

  const uptadeQuantity = React.useCallback(
    (productId: string, quant: number, canUpdate: boolean) => {
      if (canUpdate) {
        const newCartProducts = [...(state?.cart?.products || [])]

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
    [state?.cart?.products, updateCart]
  )

  React.useEffect(() => {
    if (cartCookie) {
      dispatch({ cart: JSON.parse(cartCookie) })
    }
  }, [cartCookie])

  React.useEffect(() => {
    const quantities =
      state?.cart && state.cart.products?.map((item) => item.quantity || 0)

    const totalPerProducts =
      state.cart &&
      state.cart.products?.map((item) => {
        const q = item.quantity || 0
        const p = item.unitaryPrice || 0

        return q * p
      })

    dispatch({
      totalAmount: totalPerProducts?.reduce((p, n) => p + n, 0),
      totalQuantity: quantities?.reduce((prev, next) => prev + next, 0),
    })
  }, [state?.cart])

  return (
    <CartContext.Provider
      value={{
        ...state,
        setShipping: (shipping) => dispatch({ shipping }),
        addToCart,
        deleteProductFromCart,
        updateCart,
        resetCart,
        uptadeQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return React.useContext(CartContext)
}
