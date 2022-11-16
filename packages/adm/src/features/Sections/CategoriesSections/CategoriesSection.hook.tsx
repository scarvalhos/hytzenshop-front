import * as React from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { defaultToastError } from '@utils/helpers'
import { CategoryGetDto } from '@utils/dtos/categoryDto'
import { Category } from '@utils/types'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { api } from '@services/apiClient'

const onAdd = async (v: string) => {
  return api
    .post<CategoryGetDto>('/categories', {
      name: v.replaceAll(' ', '-').toLocaleLowerCase(),
    })
    .then(({ data }) => data)
}

export const useCategoriesSection = ({
  categories,
}: {
  categories?: Category[]
}) => {
  const { register, control, setValue } = useForm()

  const queryClient = useQueryClient()

  const onAddMutation = useMutation(onAdd, {
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success(message)
    },

    onError: defaultToastError,
  })

  const onDelete = React.useCallback(
    async (v: string) => {
      const category = categories?.find((c) => c.name === v)

      return api
        .delete<CategoryGetDto>(`/categories/${category?.id}`)
        .then(({ data }) => data)
    },
    [categories]
  )

  const onDeleteMutation = useMutation(onDelete, {
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries(['categories'])
      toast.success(message)
    },

    onError: defaultToastError,
  })
  return {
    register,
    control,
    setValue,
    onAdd: onAddMutation.mutate,
    onDelete: onDeleteMutation.mutate,
  }
}
