import * as React from 'react'

import { Chip, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ReactMinimalGallery } from 'react-minimal-gallery'
import { setUpAPIClient } from '@services/api'
import { ProductGetDto } from '@utils/dtos/productDto'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { TbArrowLeft, TbPencil } from 'react-icons/tb'
import { UserGetDto } from '@utils/dtos/userDto'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { Product } from '@utils/types'
import { NextSeo } from 'next-seo'
import { Button } from '@core/Button'
import { money } from '@utils/helpers'

import SiderbarLayout from '@layouts/SiderbarLayout'

type QuikMenuProductsData = {
  product: Product
}

const ProductDetails: NextPage<QuikMenuProductsData> = ({ product }) => {
  const { back } = useRouter()

  const theme = useTheme()

  const md = useMediaQuery(theme.breakpoints.down('md'))

  const images = React.useMemo(
    () =>
      product.images.map((image) => {
        return encodeURI(image.url)
      }),
    [product.images]
  )

  return (
    <>
      <NextSeo title={product.title} />

      <Button
        title="Voltar"
        icon={<TbArrowLeft size={16} style={{ marginRight: 5 }} />}
        variant="text"
        fullWidth={false}
        onClick={back}
        sx={{
          position: 'sticky',
          top: '2rem',
          zIndex: 99999,
        }}
      />

      <Stack direction={md ? 'column' : 'row'} spacing={4} mb={10}>
        <Stack justifyContent="center" spacing={1} mt={2}>
          <Stack direction="row" spacing={1}>
            {product.categories?.map((category) => (
              <Chip
                key={category}
                label={category.replaceAll('-', ' ')}
                variant="outlined"
                size="small"
                color="success"
                sx={{
                  textTransform: 'capitalize',
                }}
              />
            ))}
          </Stack>

          <Typography variant="h5" color="white" fontWeight="medium">
            {product.title}
          </Typography>

          <Stack
            direction={md ? 'column' : 'row'}
            spacing={2}
            alignItems={md ? 'start' : 'center'}
          >
            <Typography
              variant="h5"
              color={theme.palette.success.main}
              fontWeight="medium"
            >
              {money(product.price)}
            </Typography>

            <Stack direction="row" spacing={1}>
              {product.sizes?.map((size) => (
                <Chip
                  key={size}
                  label={size}
                  variant="outlined"
                  size="small"
                  sx={{
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.text.disabled,
                  }}
                />
              ))}

              {product.colors?.map((color) => (
                <Chip
                  key={color}
                  label={color}
                  variant="outlined"
                  size="small"
                  sx={{
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.text.disabled,
                  }}
                />
              ))}
            </Stack>
          </Stack>

          {md && (
            <ReactMinimalGallery
              images={images}
              width="100%"
              height={300}
              hoverColor="#4FFF70"
            />
          )}

          <Typography whiteSpace="pre-wrap">{product.description}</Typography>
        </Stack>

        {!md && (
          <Stack spacing={2}>
            <ReactMinimalGallery
              images={images}
              width={300}
              height={300}
              hoverColor="#4FFF70"
            />

            <Button
              title="Editar produto"
              icon={<TbPencil size={16} style={{ marginRight: 5 }} />}
              variant="outlined"
              fullWidth={false}
              onClick={back}
            />
          </Stack>
        )}
      </Stack>
    </>
  )
}

// @ts-expect-error layout
ProductDetails.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default ProductDetails

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-error
    const apiClient = setUpAPIClient(ctx)

    const {
      data: { user },
    } = await apiClient.get<UserGetDto>('/auth/me')

    const {
      data: { product },
    } = await apiClient.get<ProductGetDto>(`/products/${ctx.params?.id}`)

    return {
      props: {
        user,
        product,
      },
    }
  },
  {
    isAdmin: true,
  }
)
