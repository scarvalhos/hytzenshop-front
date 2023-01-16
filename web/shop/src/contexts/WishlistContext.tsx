import React from 'react'

import { defaultToastError } from '@hytzenshop/helpers'
import { useMutation } from '@tanstack/react-query'
import { Product } from '@hytzenshop/types'

type WishlistProviderProps = {
  children: React.ReactNode
}

type WishlistContextData = {
  wishlist?: Product[]
  addToWishlist: (product?: Product) => void
}

export const WishlistContext = React.createContext({} as WishlistContextData)

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [wishlist, setWishList] = React.useState<Product[]>([])

  const addToWishlist = React.useCallback(
    async (product?: Product) => {
      if (wishlist?.find((p) => p.id === product?.id)) {
        const newWishlist = [...wishlist]

        const filter = newWishlist.filter((item) => item.id !== product?.id)

        setWishList(filter)

        return localStorage.setItem(
          'hytzenshop.wishlist',
          JSON.stringify(filter)
        )
      } else {
        const newWishlist = wishlist ? wishlist : []

        const toWishlist = [...newWishlist, product] as Product[]

        setWishList(toWishlist)

        return localStorage.setItem(
          'hytzenshop.wishlist',
          JSON.stringify(toWishlist)
        )
      }
    },
    [wishlist]
  )

  const addToWishlistMutation = useMutation(addToWishlist, {
    onError: defaultToastError,
  })

  React.useEffect(() => {
    const wishlistStoraged = localStorage.getItem('hytzenshop.wishlist')

    setWishList(JSON.parse(String(wishlistStoraged)))
  }, [])

  return (
    <WishlistContext.Provider
      value={{
        wishlist: wishlist || ([] as Product[]),
        addToWishlist: addToWishlistMutation.mutate,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  return React.useContext(WishlistContext)
}
