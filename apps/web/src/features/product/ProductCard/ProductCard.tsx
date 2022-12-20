import { Image, Link, trucate } from '@core'
import { MdFavoriteBorder } from 'react-icons/md'
import { withGlassEffect } from '@luma/ui'
import { useWishlist } from '@contexts/WishlistContext'
import { c, money } from '@hytzenshop/helpers'
import { Product } from '@hytzenshop/types'

import EvaluationStars from '@components/EvaluationStars'
import React from 'react'

interface ProductProps {
  product: Product
  glassEffect?: boolean
}

const ProductCard: React.FC<ProductProps> = ({
  product: { title, id, price, images, ...props },
  glassEffect = true,
}) => {
  const { wishlist, addToWishlist } = useWishlist()

  const isFavorited = React.useMemo(
    () => wishlist && wishlist?.find((p) => p.id === id),
    [wishlist, id]
  )

  return withGlassEffect(
    <>
      <button
        onClick={() => addToWishlist({ title, id, price, images, ...props })}
        className={c(
          'p-1 rounded-full absolute top-2 right-2 drop-shadow-lg',
          isFavorited ? 'bg-danger-300' : 'bg-light-gray-100'
        )}
      >
        {isFavorited ? (
          <MdFavoriteBorder className="text-light-gray-100 w-3 h-3" />
        ) : (
          <MdFavoriteBorder className="text-light-gray-500 w-3 h-3" />
        )}
      </button>

      <Link as={`/product/${id}`} href={`/product/${id}`}>
        <Image
          src={encodeURI(images[0]?.url)}
          alt={images[0]?.name}
          className="w-full h-[200px]"
        />
      </Link>

      <Link as={`/product/${id}`} href={`/product/${id}`}>
        <div className="flex flex-col h-40 justify-between px-6 py-6">
          <div className="space-y-1">
            <EvaluationStars />

            <p className="text-md text-light-gray-100 capitalize">
              {trucate({ text: title.toLowerCase(), line: 2 })}
            </p>
            <p className="text-lg text-success-300 font-semibold">
              {money(price)}
            </p>
          </div>

          <p className="text-sm">Em até 6x sem juros</p>
        </div>
      </Link>
    </>,
    {
      glassClassName:
        'text-left rounded-md relative border border-light-gray-400 hover:border-success-300 hover:border-opacity-100 border-opacity-20 transition-all',
      divClassName:
        'text-left rounded-md bg-dark-gray-500 bg-opacity-30 relative border border-light-gray-400 hover:border-success-300 hover:border-opacity-100 border-opacity-20 transition-all shadow-lg',
      glassEffect,
    }
  )
}

export default ProductCard
