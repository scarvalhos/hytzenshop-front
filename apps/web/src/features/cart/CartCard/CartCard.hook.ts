import * as React from 'react'

import { CartProduct, Product, ProductGetDto } from '@hytzenshop/types'
import { useWishlist } from '@contexts/WishlistContext'
import { useCart } from '@contexts/CartContext'
import { api } from '@services/api'

interface UseCartCard {
  canUpdate?: boolean
  product: CartProduct
  uptadeQuantity?: (productId: string, quant: number) => void
  handleSetCanUpdate?: (value: boolean) => void
}

export const useCartCard = ({
  handleSetCanUpdate,
  uptadeQuantity,
  canUpdate,
  product,
}: UseCartCard) => {
  const [quant, setQuant] = React.useState(1)
  const [productData, setProductData] = React.useState<Product>()

  const { deleteProductFromCart, cart } = useCart()
  const { addToWishlist, wishlist } = useWishlist()

  const isFavorited = React.useMemo(
    () =>
      wishlist &&
      wishlist?.length > 0 &&
      wishlist?.find((p) => p?.id === product?.productId),
    [product?.productId, wishlist]
  )

  const getProductData = React.useCallback(async () => {
    const { data } = await api.get<ProductGetDto>(
      `/products/${product.productId}`
    )
    setProductData(data.product)
  }, [product.productId])

  const handleDeleteProductFromCart = React.useCallback(() => {
    deleteProductFromCart(product?.id || '')
  }, [deleteProductFromCart, product.id])

  const incrementQuantity = React.useCallback(() => {
    if (quant || quant === 0) {
      setQuant(quant + 1)
      handleSetCanUpdate && handleSetCanUpdate(true)
    }
  }, [handleSetCanUpdate, quant])

  const decrementQuantity = React.useCallback(() => {
    if (quant && quant > 0) {
      setQuant(quant - 1)
      handleSetCanUpdate && handleSetCanUpdate(true)
    }
  }, [handleSetCanUpdate, quant])

  React.useEffect(() => {
    if (canUpdate) {
      uptadeQuantity && uptadeQuantity(product?.id || '', quant)

      handleSetCanUpdate && handleSetCanUpdate(false)
    }
  }, [canUpdate, cart, handleSetCanUpdate, product, quant, uptadeQuantity])

  React.useEffect(() => {
    getProductData()
    setQuant(product.quantity || 1)
  }, [getProductData, product.quantity])

  return {
    quant,
    productData,
    isFavorited,
    addToWishlist,
    incrementQuantity,
    decrementQuantity,
    handleDeleteProductFromCart,
  }
}
