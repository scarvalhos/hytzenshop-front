import React from 'react'

import { c, money, numtostr } from '@hytzenshop/helpers'
import { MdFavoriteBorder } from 'react-icons/md'
import { Image, Link } from '@core'
import { useCartCard } from './CartCard.hook'
import { CartProduct } from '@hytzenshop/types'
import { TbTrash } from 'react-icons/tb'
import { Chip } from '@luma/ui'

interface CartCardProps {
  canUpdate?: boolean
  isReadonly?: boolean
  product: CartProduct
  uptadeQuantity?: (productId: string, quant: number) => void
  handleSetCanUpdate?: (value: boolean) => void
}

const CartCard: React.FC<CartCardProps> = ({
  handleSetCanUpdate,
  uptadeQuantity,
  isReadonly,
  canUpdate,
  product,
}) => {
  const {
    handleDeleteProductFromCart,
    decrementQuantity,
    incrementQuantity,
    addToWishlist,
    isFavorited,
    productData,
    quant,
  } = useCartCard({
    handleSetCanUpdate,
    uptadeQuantity,
    canUpdate,
    product,
  })

  return (
    <div className="flex relative flex-col sm:flex-row space-x-8 bg-dark-gray-500 bg-opacity-30 sm:pr-8 rounded-md">
      <Link href={`/product/${productData?.id}`}>
        {productData?.images[0]?.url ? (
          <Image
            src={encodeURI(productData?.images[0]?.url || '')}
            alt={productData?.images[0]?.name || ''}
            className="w-full max-h-[140px] sm:w-[140px] sm:h-full"
          />
        ) : (
          <div className="w-full h-[140px] sm:w-[140px] bg-dark-gray-400 rounded-sm" />
        )}
      </Link>

      <div className="flex flex-col justify-center items-start space-y-2 py-4">
        <Link href={`/product/${product?.productId}`}>
          <p className="text-lg text-light-gray-100">{productData?.title}</p>
        </Link>

        <div className="flex flex-col sm:flex-row items-start sm:items-center max-sm:space-y-2 sm:space-x-2">
          <div>
            {isReadonly ? (
              <Chip label={`${numtostr(quant)}x`} variant="filled" />
            ) : (
              <div className="flex flex-row">
                <button
                  name="decrement"
                  disabled={quant === 1}
                  onClick={decrementQuantity}
                  className="bg-dark-gray-400 py-1 px-3 rounded-l-md disabled:cursor-not-allowed text-light-gray-100 disabled:text-light-gray-500"
                >
                  -
                </button>

                <span className="bg-dark-gray-500 border-none outline-none py-1 px-3 flex items-center justify-center text-light-gray-100">
                  {quant}
                </span>

                <button
                  name="increment"
                  disabled={quant === +(productData?.stock || '')}
                  onClick={incrementQuantity}
                  className="bg-dark-gray-400 py-1 px-3 rounded-r-md disabled:cursor-not-allowed text-light-gray-100 disabled:text-light-gray-500"
                >
                  +
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-row items-center space-x-2">
            <Chip label={product.colors?.[0]} variant="filled" />
            <Chip label={product.sizes?.[0]} variant="filled" />
            <Chip
              label={money(+(productData?.price || '') * quant)}
              variant="filled"
            />
          </div>
        </div>

        {!isReadonly && (
          <div className="absolute top-2 right-4 flex flex-col space-y-2">
            <button
              onClick={() => addToWishlist(productData)}
              className={c(
                'p-1.5 rounded-full drop-shadow-lg brightness-110',
                isFavorited ? 'bg-danger-300' : 'bg-dark-gray-400'
              )}
            >
              {isFavorited ? (
                <MdFavoriteBorder className="text-light-gray-100" />
              ) : (
                <MdFavoriteBorder className="text-light-gray-500" />
              )}
            </button>

            <button
              onClick={handleDeleteProductFromCart}
              className={c(
                'p-1.5 rounded-full drop-shadow-lg bg-dark-gray-400 brightness-110'
              )}
            >
              <TbTrash className="text-light-gray-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartCard
