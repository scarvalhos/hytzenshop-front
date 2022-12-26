import React from 'react'

import { EvaluateButtonModalProps } from './EvaluateButtonModal'
import { FieldValues, useForm } from 'react-hook-form'
import { defaultToastError } from '@hytzenshop/helpers'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '@hytzenshop/services'

export const useEvaluateButtonModal = ({
  order,
  product,
}: EvaluateButtonModalProps) => {
  const [success, setSuccess] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [note, setNote] = React.useState(5)

  const { control, register, handleSubmit } = useForm()

  const queryClient = useQueryClient()

  const onSubmit = React.useCallback(
    async (values: FieldValues) => {
      setLoading(true)
      return api
        .post('/evaluation', {
          note,
          comment: values.comment,
          orderId: order.id,
          productId: product?.id,
        })
        .then(() => {
          setLoading(false)
          setSuccess(true)
          queryClient.invalidateQueries(['product', product?.id])
        })
        .catch(defaultToastError)
    },
    [note, order.id, product?.id, queryClient]
  )

  return {
    success,
    loading,
    open,
    setOpen,
    setNote,
    control,
    register,
    handleSubmit,
    onSubmit,
    note,
  }
}
