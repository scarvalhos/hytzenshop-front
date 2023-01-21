import { c, money, numtostr } from '@hytzenshop/helpers'
import { MdFavoriteBorder } from 'react-icons/md'
import { useCartCard } from './CartCard.hook'
import { CartProduct } from '@hytzenshop/types'
import { Chip, Link } from '@luma/ui'
import { TbTrash } from 'react-icons/tb'

import Image from 'next/image'
import React from 'react'

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
    <div className="flex relative flex-col sm:flex-row bg-primary sm:pr-8 rounded-md">
      <Link href={`/product/${productData?.id}`}>
        <div className="relative w-full sm:w-[100px] h-[300px] sm:h-full bg-third rounded-sm">
          {productData?.images[0]?.url && (
            <Image
              src={encodeURI(productData?.images[0]?.url || '')}
              alt={productData?.images[0]?.name || ''}
              className="object-cover object-center rounded-sm"
              sizes="100%"
              fill
              priority
            />
          )}
        </div>
      </Link>

      <div className="flex flex-col justify-center items-start space-y-2 py-4 px-6">
        <Link href={`/product/${product?.productId}`}>
          <p className="text-xl text-primary font-medium">
            {productData?.title}
          </p>
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
                  className="bg-secondary py-1 px-3 rounded-l-md disabled:cursor-not-allowed text-primary disabled:text-light-gray-500"
                >
                  -
                </button>

                <span className="bg-primary border-none outline-none py-1 px-3 flex items-center justify-center text-primary">
                  {quant}
                </span>

                <button
                  name="increment"
                  disabled={quant === +(productData?.stock || '')}
                  onClick={incrementQuantity}
                  className="bg-secondary py-1 px-3 rounded-r-md disabled:cursor-not-allowed text-primary disabled:text-light-gray-500"
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
                isFavorited ? 'bg-danger-300' : 'bg-secondary'
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
                'p-1.5 rounded-full drop-shadow-lg bg-secondary brightness-110'
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
