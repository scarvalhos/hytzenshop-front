import * as React from 'react'

import { validateCreateProductSchema } from '@utils/validators'
import { FieldValues, useForm } from 'react-hook-form'
import { FileRecord, Product } from '@hytzenshop/types'
import { useFileInput } from '@core/Input/File/File.hook'
import { useProducts } from '@hooks/useProducts'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { strtonum } from '@hytzenshop/helpers'

export interface DefaultValuesProps {
  title: string
  price: string
  description: string
  stock: string
  images: FileRecord[]
  colors: string[]
  sizes: string[]
  categories: string[]
}

interface UseNewProductFormProps {
  defaultValues?: FieldValues
  type?: 'POST' | 'PUT'
  product?: Product
  onClose?: () => void
}

export const useNewProductForm = ({
  defaultValues,
  type,
  product,
  onClose,
}: UseNewProductFormProps) => {
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false)

  const { createProduct, updateProduct } = useProducts({})
  const { uploadedFiles, deleteFile } = useFileInput()
  const { reset } = useForm()
  const { push } = useRouter()

  const pushRef = React.useRef(push)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(validateCreateProductSchema),
    ...(defaultValues && {
      defaultValues,
    }),
  })

  const handleOpenSuccessModal = React.useCallback(() => {
    setOpenSuccessModal(true)
  }, [])

  const onCloseSuccessModal = React.useCallback(
    (clearForm?: boolean) => {
      if (clearForm) {
        reset({
          title: 'asdasasa',
          price: '',
          description: '',
          stock: '',
          images: [],
          colors: [],
          sizes: 'Selecione',
          categories: 'Selecione',
        })
      }

      setOpenSuccessModal(false)
    },
    [reset]
  )

  const onDismissModal = React.useCallback(() => {
    pushRef.current('/dashboard/products')
  }, [])

  const onSubmit = React.useCallback(
    (values: FieldValues) => {
      type === 'POST'
        ? createProduct(
            {
              categories: values.categories,
              sizes: values.sizes,
              colors: values.colors,
              images: values.images.map((file: FileRecord) => {
                return file?.id
              }),
              title: values.title,
              description: values.description,
              price: strtonum(values.price),
              stock: strtonum(values.stock),
              questions: [],
              evaluation: [],
            },
            { onSuccess: () => handleOpenSuccessModal() }
          )
        : updateProduct(
            {
              id: product?.id,
              categories: values.categories,
              sizes: values.sizes,
              colors: values.colors,
              images: values.images.map((file: FileRecord) => {
                return file?.id
              }),
              title: values.title,
              description: values.description,
              price: strtonum(values.price),
              stock: strtonum(values.stock),
            },
            { onSuccess: () => onClose && onClose() }
          )
    },
    [
      createProduct,
      handleOpenSuccessModal,
      onClose,
      product?.id,
      type,
      updateProduct,
    ]
  )

  const onCancel = React.useCallback(() => {
    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((item) => deleteFile(item.id))
    }

    pushRef.current('/dashboard/products')
  }, [deleteFile, uploadedFiles])

  return {
    setValue,
    onCancel,
    onSubmit,
    onDismissModal,
    onCloseSuccessModal,
    openSuccessModal,
    register,
    handleSubmit,
    control,
    errors,
    clearErrors,
  }
}
