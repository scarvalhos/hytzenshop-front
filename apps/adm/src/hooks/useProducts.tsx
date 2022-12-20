import {
  useQueryClient,
  useMutation,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'

import { ProductGetAllDto, ProductGetDto, Product } from '@hytzenshop/types'
import { defaultToastError } from '@hytzenshop/helpers'
import { toast } from 'react-toastify'
import { api } from '@services/apiClient'

const getProductList = async (
  page: number,
  limit: number,
  filter?: string,
  sort?: string,
  order?: string
): Promise<ProductGetAllDto> => {
  const { data } = await api.get<ProductGetAllDto>('/products', {
    params: {
      page,
      limit,
      filter,
      sort,
      order,
    },
  })

  return data
}

const deleteProduct = async (id: string) => {
  return api.delete<ProductGetDto>(`/products/${id}`)
}

const createProduct = async (product: Omit<Product, 'id'>) => {
  return api.post<ProductGetDto>('/products', product)
}

export function useProducts({
  page,
  limit,
  filter,
  sort,
  order,
}: {
  page?: number
  limit?: number
  filter?: string
  sort?: string
  order?: string
}) {
  const queryClient = useQueryClient()

  const getProducts = useQuery(
    ['products', page, filter],
    () => getProductList(page || 1, limit || 10, filter, sort, order),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<ProductGetAllDto, unknown>

  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(['products', page, filter])
      toast.success(data.message)
    },

    onError: defaultToastError,
  })

  const createProductMutation = useMutation(createProduct, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      queryClient.invalidateQueries(['products', page, filter])
    },

    onError: defaultToastError,
  })

  return {
    getProducts,
    deleteProduct: deleteProductMutation.mutate,
    createProduct: createProductMutation.mutate,
  }
}
