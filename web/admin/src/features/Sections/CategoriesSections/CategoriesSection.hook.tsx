import * as React from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CategoryGetDto, Category } from '@hytzenshop/types'
import { CategoriesDto } from '@hytzenshop/types/src/dtos/categoryDto'
import { useForm } from 'react-hook-form'
import { api } from '@hytzenshop/services'

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
    onMutate: async (category) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] })

      const previousCategories = queryClient.getQueryData<CategoriesDto>([
        'categories',
      ])

      queryClient.setQueryData(['categories'], {
        ...previousCategories,
        categories: previousCategories?.categories.concat({
          id: '',
          name: category.replaceAll(' ', '-').toLocaleLowerCase(),
        }),
      })

      return {
        previousCategories,
        data: {
          ...previousCategories,
          categories: previousCategories?.categories.concat({
            id: '',
            name: category.replaceAll(' ', '-').toLocaleLowerCase(),
          }),
        },
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },

    onError: (_err, _newCategories, context) => {
      queryClient.setQueryData(['categories'], context?.previousCategories)
    },
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
    onMutate: async (category) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] })

      const previousCategories = queryClient.getQueryData<CategoriesDto>([
        'categories',
      ])

      queryClient.setQueryData(['categories'], {
        ...previousCategories,
        categories: previousCategories?.categories.filter(
          (c) => c.name !== category.replaceAll(' ', '-').toLocaleLowerCase()
        ),
      })

      return {
        previousCategories,
        data: {
          ...previousCategories,
          categories: previousCategories?.categories.filter(
            (c) => c.name !== category.replaceAll(' ', '-').toLocaleLowerCase()
          ),
        },
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },

    onError: (_err, _newCategories, context) => {
      queryClient.setQueryData(['categories'], context?.previousCategories)
    },
  })
  return {
    register,
    control,
    setValue,
    onAdd: onAddMutation.mutate,
    onDelete: onDeleteMutation.mutate,
  }
}
