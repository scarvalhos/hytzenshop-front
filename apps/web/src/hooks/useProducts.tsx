import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { ProductGetAllDto } from '@hytzenshop/types'
import { api } from '@services/apiClient'

export const getProductList = async (
  page: number,
  limit: number,
  filter?: string
): Promise<ProductGetAllDto> => {
  const { data } = await api.get<ProductGetAllDto>('/products', {
    params: {
      page,
      limit,
      filter,
    },
  })

  return data
}

export function useProducts({
  page,
  limit,
  filter,
}: {
  page?: number
  limit?: number
  filter?: string
}) {
  const getProducts = useQuery(
    ['products', page, filter],
    () => getProductList(page || 1, limit || 10, filter),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<ProductGetAllDto, unknown>

  return {
    getProducts,
  }
}
