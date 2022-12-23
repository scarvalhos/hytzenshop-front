import * as React from 'react'

import { Chip, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ProductGetDto, UserGetDto, Product } from '@hytzenshop/types'
import { TbArrowLeft, TbPencil } from 'react-icons/tb'
import { ReactMinimalGallery } from 'react-minimal-gallery'
import { parseCookies } from 'nookies'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Button } from '@core/Button'
import { money } from '@hytzenshop/helpers'
import { api } from '@services/api'

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
    const cookies = parseCookies(ctx)

    if (cookies) {
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${cookies['hytzenshopadm.token']}`
    }

    const {
      data: { user },
    } = await api.get<UserGetDto>('/auth/me')

    const {
      data: { product },
    } = await api.get<ProductGetDto>(`/products/${ctx.params?.id}`)

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
