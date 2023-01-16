import * as React from 'react'
import * as yup from 'yup'

import { generateMongoObjectId } from '@hytzenshop/helpers'
import { useForm, FieldValues } from 'react-hook-form'
import { useBreakpoint } from '@hytzenshop/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useCart } from '@contexts/CartContext'
import { Product } from '@hytzenshop/types'
import { toast } from '@luma/ui'

const validateProductToCart = yup.object().shape({
  color: yup.string().required('Escolha uma cor'),
  size: yup.string().required('Escolha um tamanho'),
})

interface UseProductPageSectionProps {
  product?: Product
}

export const useProductPageSection = ({
  product,
}: UseProductPageSectionProps) => {
  const [openModal, setOpenModal] = React.useState(false)

  const { addToCart, cart, uptadeQuantity } = useCart()
  const { push } = useRouter()
  const { lg } = useBreakpoint()

  const {
    handleSubmit,
    clearErrors,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateProductToCart),
  })

  const handleCloseModal = React.useCallback(() => {
    setOpenModal(false)
  }, [])

  const onSubmit = React.useCallback(
    (values: FieldValues, type: 'buyNow' | 'addToCart') => {
      const p = cart?.products?.filter(
        (item) => item.productId === String(product?.id)
      )

      const quantities = p
        ?.map((item) => item.quantity || 0)
        .reduce((prev, next) => prev + next, 0)

      if ((quantities || 1) >= Number(product?.stock)) {
        return toast.primary(
          'Poxa! A quantidade escolhida está fora de estoque no momento! :('
        )
      }

      const productInCart = cart?.products?.find(
        (item) =>
          item.productId === String(product?.id) &&
          item.colors?.includes(values.color) &&
          item.sizes?.includes(values.size)
      )

      if (productInCart) {
        uptadeQuantity(
          productInCart.id || '',
          (productInCart.quantity || 0) + 1,
          true
        )
        if (type === 'addToCart') {
          return setOpenModal(true)
        } else {
          return push('/checkout/cart')
        }
      }

      addToCart({
        id: generateMongoObjectId(),
        productId: product?.id,
        unitaryPrice: product?.price,
        colors: [values.color],
        sizes: [values.size],
        quantity: 1,
      })

      if (type === 'addToCart') {
        return setOpenModal(true)
      } else {
        return push('/checkout/cart')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart?.products, product?.id, product?.price, product?.stock]
  )

  const handleAddToCart = React.useCallback(
    async (values: FieldValues) => {
      onSubmit(values, 'addToCart')
    },
    [onSubmit]
  )

  const handleBuyNow = React.useCallback(
    async (values: FieldValues) => {
      onSubmit(values, 'buyNow')
    },
    [onSubmit]
  )

  const images = React.useMemo(
    () =>
      product?.images?.map((image) => {
        return encodeURI(image.url)
      }),
    [product?.images]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => clearErrors(), [product?.id])

  return {
    openModal,
    control,
    register,
    handleSubmit,
    setValue,
    errors,
    handleCloseModal,
    handleAddToCart,
    handleBuyNow,
    images,
    lg,
  }
}
