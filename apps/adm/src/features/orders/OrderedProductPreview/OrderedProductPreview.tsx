import * as React from 'react'

import { Chip, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ProductGetDto, CartProduct } from '@hytzenshop/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { money } from '@hytzenshop/helpers'
import { Link } from '@core/Link'
import { api } from '@services/apiClient'

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
  const theme = useTheme()

  const sm = useMediaQuery(theme.breakpoints.down('sm'))

  const { data } = useQuery(
    ['product', product?.productId],
    () => getProductDetails(product?.productId),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<ProductGetDto, unknown>

  return (
    <Stack direction={sm ? 'column' : 'row'} spacing={2}>
      <Link href={`/admin/dashboard/products/${product?.productId}`}>
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
            }}
          />
        )}
      </Link>

      <Stack spacing={1} direction="column" justifyContent="center">
        <Link href={`/admin/dashboard/products/${product?.productId}`}>
          <Typography>{data?.product.title}</Typography>
        </Link>

        <Stack direction="row" sx={{ flexFlow: 'wrap', gap: 1 }}>
          <Chip
            key={product.colors?.[0]}
            label={product.colors?.[0]}
            variant="outlined"
            size="small"
            sx={{
              color: theme.palette.text.primary,
              borderColor: theme.palette.primary.dark,
            }}
          />
          <Chip
            key={product.sizes?.[0]}
            label={product.sizes?.[0]}
            variant="outlined"
            size="small"
            sx={{
              color: theme.palette.text.primary,
              borderColor: theme.palette.primary.dark,
            }}
          />
          <Chip
            key={product.quantity}
            label={product.quantity}
            variant="outlined"
            size="small"
            sx={{
              color: theme.palette.text.primary,
              borderColor: theme.palette.primary.dark,
            }}
          />
          <Chip
            key={data?.product.price}
            label={money(data?.product.price)}
            variant="outlined"
            size="small"
            sx={{
              color: theme.palette.text.primary,
              borderColor: theme.palette.primary.dark,
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default OrderedProductPreview
