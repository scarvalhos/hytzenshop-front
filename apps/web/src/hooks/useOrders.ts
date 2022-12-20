import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { OrderGetAllDto } from '@hytzenshop/types'
import { api } from '@services/apiClient'

const getOrdersList = async (
  page: number,
  limit: number,
  filter?: string,
  sort?: string,
  order?: string
): Promise<OrderGetAllDto> => {
  const { data } = await api.get<OrderGetAllDto>('/orders', {
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

export function useOrders(
  page?: number,
  limit?: number,
  filter?: string,
  sort?: string,
  order?: string
) {
  const getOrders = useQuery(
    ['orders', page, filter],
    () => getOrdersList(page || 1, limit || 10, filter, sort, order),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<OrderGetAllDto, unknown>

  return {
    getOrders,
  }
}
