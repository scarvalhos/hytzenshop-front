import { ProductGetDto, CartProduct, Order } from '@hytzenshop/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { c, money } from '@hytzenshop/helpers'
import { Chip } from '@luma/ui'
import { Link } from '@core/Link'
import { api } from '@hytzenshop/services'

import React from 'react'
import Image from 'next/image'

interface OrderedProductPreviewProps {
  product: CartProduct
}

const getProductDetails = async (id?: string): Promise<ProductGetDto> => {
  return api.get<ProductGetDto>(`/products/${id}`).then(({ data }) => data)
}

const OrderedProductPreview: React.FC<OrderedProductPreviewProps> = ({
  product,
}) => {
  const { data } = useQuery(
    ['product', product?.productId],
    () => getProductDetails(product?.productId),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<ProductGetDto, unknown>

  return (
    <div
      className={c(
        'flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-2 rounded-md px-4 py-4 bg-dark-gray-500'
      )}
    >
      <Link href={`/product/${product?.productId}`}>
        {data?.product && (
          <Image
            src={data?.product.images[0].url || ''}
            alt={data?.product.title}
            width={70}
            height={70}
            objectFit="cover"
            objectPosition="center"
            style={{
              borderRadius: 4,
              width: '70px',
              height: '70px',
            }}
          />
        )}
      </Link>

      <div className="flex flex-col justify-center space-y-2">
        <Link href={`/product/${product?.productId}`}>
          {data?.product.title}
        </Link>

        <div className="flex flex-row flex-wrap gap-2">
          <Chip
            key={product.quantity}
            label={product.quantity?.toString()}
            variant="outlined"
            rounded
          />
          <Chip
            key={product.colors?.[0]}
            label={product.colors?.[0]}
            variant="outlined"
            rounded
          />
          <Chip
            key={product.sizes?.[0]}
            label={product.sizes?.[0]}
            variant="outlined"
            rounded
          />
          <Chip
            key={data?.product.price}
            label={money(data?.product.price)}
            variant="outlined"
            rounded
          />
        </div>
      </div>
    </div>
  )
}

export default OrderedProductPreview
