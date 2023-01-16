import {
  PaginationParams,
  ProductGetAllDto,
  ProductGetDto,
  Product,
} from '@hytzenshop/types'

import { useQueryClient, useMutation } from '@tanstack/react-query'
import { defaultToastError } from '@hytzenshop/helpers'
import { toast } from '@luma/ui'
import { api } from '@hytzenshop/services'

export const getProductList = async (
  params: PaginationParams
): Promise<ProductGetAllDto> => {
  const { data } = await api.get<ProductGetAllDto>('/products', {
    params,
  })

  return data
}

const deleteProduct = async (id: string) => {
  return api.delete<ProductGetDto>(`/products/${id}`)
}

const createProduct = async (product: Omit<Product, 'id'>) => {
  return api.post<ProductGetDto>('/products', product)
}

const updateProduct = async (product: Partial<Product>) => {
  return api.put<ProductGetDto>(`/products/${product.id}`, product)
}

export function useProducts(queryKey: unknown[]) {
  const queryClient = useQueryClient()

  const deleteProductMutation = useMutation(deleteProduct, {
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey })

      const previousProducts =
        queryClient.getQueryData<ProductGetAllDto>(queryKey)

      queryClient.setQueryData(queryKey, {
        ...previousProducts,
        data: {
          ...previousProducts?.data,
          products: previousProducts?.data.products.filter(
            (p) => p.id !== productId
          ),
        },
      })

      return {
        previousProducts,
        products: {
          ...previousProducts,
          data: {
            ...previousProducts?.data,
            products: previousProducts?.data.products.filter(
              (p) => p.id !== productId
            ),
          },
        },
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },

    onError: (err, _newProducts, context) => {
      queryClient.setQueryData(queryKey, context?.previousProducts)
      defaultToastError(err)
    },
  })

  const createProductMutation = useMutation(createProduct, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey })
      toast.success(data.message)
    },

    onError: defaultToastError,
  })

  const updateProductMutation = useMutation(updateProduct, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey })
      queryClient.invalidateQueries(['product', data.product.id])
    },

    onError: defaultToastError,
  })

  return {
    deleteProduct: deleteProductMutation.mutate,
    createProduct: createProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
  }
}
