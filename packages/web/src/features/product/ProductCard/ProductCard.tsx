import React from 'react'

import { MdFavoriteBorder } from 'react-icons/md'
import { useWishlist } from '@contexts/WishlistContext'
import { Image, Link } from '@core'
import { c, money } from '@utils/helpers'
import { Product } from '@utils/types'

import EvaluationStars from '@components/EvaluationStars'

interface ProductProps {
  product: Product
}

const ProductCard: React.FC<ProductProps> = ({
  product: { title, id, price, images, ...props },
}) => {
  const { wishlist, addToWishlist } = useWishlist()

  const isFavorited = React.useMemo(
    () => wishlist && wishlist?.find((p) => p.id === id),
    [wishlist, id]
  )

  return (
    <div className="text-left rounded-[4px] bg-dark-gray-400 relative">
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
        <div className="flex flex-col h-[140px] justify-between px-4 py-4">
          <div className="space-y-1">
            <EvaluationStars />

            <p className="text-md text-light-gray-100 capitalize">
              {title.toLowerCase()}
            </p>
            <p className="text-lg text-success-300 font-semibold">
              {money(price)}
            </p>
          </div>

          <p className="text-sm">Em até 6x sem juros</p>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
