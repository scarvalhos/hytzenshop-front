import { withGlassEffect, EvaluationStars, trucate } from '@luma/ui'
import { MdFavoriteBorder } from 'react-icons/md'
import { useWishlist } from '@contexts/WishlistContext'
import { Image, Link } from '@core'
import { c, money } from '@hytzenshop/helpers'
import { Product } from '@hytzenshop/types'

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
        className={c('absolute top-3 right-3')}
      >
        {withGlassEffect(
          <>
            {isFavorited ? (
              <MdFavoriteBorder className="text-light-gray-100 w-4 h-4" />
            ) : (
              <MdFavoriteBorder className="text-light-gray-100 w-4 h-4" />
            )}
          </>,
          {
            glassEffect: !isFavorited,
            glassClassName: 'p-2.5 rounded-full drop-shadow-lg',
            divClassName: 'p-2.5 rounded-full drop-shadow-lg bg-danger-300',
          }
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
            <EvaluationStars
              note={props?.averageRating || 0}
              totalEvaluations={props.evaluation?.length || 0}
              show="total"
            />

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
