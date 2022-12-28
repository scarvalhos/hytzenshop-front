import { ProductGetDto, CartProduct, Order } from '@hytzenshop/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { c, money } from '@hytzenshop/helpers'
import { useAuth } from '@contexts/AuthContext'
import { Chip } from '@luma/ui'
import { Link } from '@core'
import { api } from '@hytzenshop/services'

import EvaluateButtonModal from '@components/Modal/EvaluateButtonModal'
import React from 'react'
import Image from 'next/image'

interface OrderedProductPreviewProps {
  product: CartProduct
  order: Order
}

const getProductDetails = async (id?: string): Promise<ProductGetDto> => {
  return api.get<ProductGetDto>(`/products/${id}`).then(({ data }) => data)
}

const OrderedProductPreview: React.FC<OrderedProductPreviewProps> = ({
  product,
  order,
}) => {
  const { user } = useAuth()

  const { data } = useQuery(
    ['product', product?.productId],
    () => getProductDetails(product?.productId),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<ProductGetDto, unknown>

  const isAlReadyAvaliated = React.useMemo(
    () =>
      Boolean(data?.product?.evaluation?.some((e) => e.userId === user?.id)),
    [data?.product?.evaluation, user?.id]
  )

  return (
    <div
      className={c(
        'flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-2 rounded-md px-4 py-4 bg-dark-gray-500',
        order.status === 'delivered' &&
          !isAlReadyAvaliated &&
          'sm:justify-between sm:items-center'
      )}
    >
      <Link href={`/product/${product?.productId}`}>
        {data?.product && (
          <div className="relative w-[70px] h-[70px] rounded-sm">
            <Image
              src={data?.product.images[0].url || ''}
              alt={data?.product.title}
              sizes="100%"
              className="object-cover object-center rounded-sm"
              fill
            />
          </div>
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

      {order.status === 'delivered' && data?.product && !isAlReadyAvaliated && (
        <EvaluateButtonModal product={product.product} order={order} />
      )}
    </div>
  )
}

export default OrderedProductPreview
