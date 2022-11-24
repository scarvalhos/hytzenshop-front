import * as React from 'react'

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'

import { defaultToastError } from '@utils/helpers'
import { Product } from '@utils/types'

type WishlistProviderProps = {
  children: React.ReactNode
}

type WishlistContextData = {
  wishlist?: Product[]
  addToWishlist: (product?: Product) => void
}

export const WishlistContext = React.createContext({} as WishlistContextData)

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const queryClient = useQueryClient()

  const queryKey = React.useMemo(() => ['wishlist'], [])

  const { data: wishlist } = useQuery(
    queryKey,
    () => {
      const wishlistStoraged = localStorage.getItem('hytzenshop.wishlist') || ''

      return JSON.parse(wishlistStoraged)
    },
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<Product[], unknown>

  const addToWishlist = React.useCallback(
    async (product?: Product) => {
      if (wishlist?.find((p) => p.id === product?.id)) {
        const newWishlist = [...wishlist]

        const filter = newWishlist.filter((item) => item.id !== product?.id)

        return localStorage.setItem(
          'hytzenshop.wishlist',
          JSON.stringify(filter)
        )
      } else {
        const newWishlist = wishlist ? wishlist : []

        const toWishlist = [...newWishlist, product]

        return localStorage.setItem(
          'hytzenshop.wishlist',
          JSON.stringify(toWishlist)
        )
      }
    },
    [wishlist]
  )

  const addToWishlistMutation = useMutation(addToWishlist, {
    onMutate: async (data) => {
      await queryClient.cancelQueries(queryKey)
      const prevFavorites = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old = []) => {
        return [...(old as Product[]), data]
      })

      return { prevFavorites }
    },

    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },

    onError: (err, _, c) => {
      defaultToastError(err)
      if (c?.prevFavorites) {
        queryClient.setQueryData(queryKey, c.prevFavorites)
      }
    },
  })

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
