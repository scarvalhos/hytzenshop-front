import * as React from 'react'
import * as yup from 'yup'

import { TbBox, TbBuildingStore, TbDashboard } from 'react-icons/tb'
import { useBreakpoint } from '@hytzenshop/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Product } from '@hytzenshop/types'

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
  const { lg } = useBreakpoint()

  const [openModal, setOpenModal] = React.useState(false)

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateProductToCart),
  })

  const handleCloseModal = React.useCallback(() => {
    setOpenModal(false)
  }, [])

  const images = React.useMemo(
    () =>
      product?.images?.map((image) => {
        return encodeURI(image.url)
      }),
    [product?.images]
  )

  const breadCrumbsLinks = React.useMemo(
    () => [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: TbDashboard,
      },
      {
        title: 'Produtos',
        href: '/dashboard/products',
        icon: TbBuildingStore,
      },
      {
        title: String(product?.title),
        href: `/dashboard/products/${product?.id}`,
        icon: TbBox,
      },
    ],
    [product?.id, product?.title]
  )

  return {
    breadCrumbsLinks,
    handleCloseModal,
    handleSubmit,
    openModal,
    register,
    control,
    setValue,
    errors,
    images,
    lg,
  }
}
