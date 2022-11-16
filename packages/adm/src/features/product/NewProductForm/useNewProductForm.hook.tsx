import * as React from 'react'

import { validateCreateProductSchema } from '@utils/validators'
import { FieldValues, useForm } from 'react-hook-form'
import { useFileInput } from '@core/Input/File/File.hook'
import { useProducts } from '@hooks/useProducts'
import { yupResolver } from '@hookform/resolvers/yup'
import { FileRecord } from '@utils/types'
import { useRouter } from 'next/router'
import { strtonum } from '@utils/helpers'

export const useNewProductForm = () => {
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false)

  const { uploadedFiles, deleteFile } = useFileInput()
  const { createProduct } = useProducts({})
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
  })

  const handleOpenSuccessModal = React.useCallback(() => {
    setOpenSuccessModal(true)
  }, [])

  const onCloseSuccessModal = React.useCallback(
    (clearForm?: boolean) => {
      if (clearForm) {
        reset({
          title: 'asdasasasas',
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
      createProduct(
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
        },
        { onSuccess: () => handleOpenSuccessModal() }
      )
    },
    [createProduct, handleOpenSuccessModal]
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
