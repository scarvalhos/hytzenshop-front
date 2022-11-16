import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'

import { defaultToastError } from '@utils/helpers'
import { OrderGetAllDto } from '@utils/dtos/orderDto'
import { StatusOrders } from '@utils/types'
import { toast } from 'react-toastify'
import { api } from '@services/apiClient'

const getOrdersList = async (
  page: number,
  limit: number,
  filter?: string
): Promise<OrderGetAllDto> => {
  const { data } = await api.get<OrderGetAllDto>('/orders', {
    params: {
      page,
      limit,
      filter,
    },
  })

  return data
}

const updatedOrderStatus = async ({
  id,
  status,
}: {
  id: string
  status: StatusOrders
}) => {
  return api.patch(`/orders/${id}/${status}`)
}

export function useOrders(page?: number, limit?: number, filter?: string) {
  const queryClient = useQueryClient()

  const getOrders = useQuery(
    ['orders', page, filter],
    () => getOrdersList(page || 1, limit || 10, filter),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<OrderGetAllDto, unknown>

  const updatedOrderStatusMutation = useMutation(updatedOrderStatus, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(['orders', page, filter])
      toast.success(data.message)
    },

    onError: defaultToastError,
  })

  return {
    getOrders,
    updatedOrderStatus: updatedOrderStatusMutation.mutate,
  }
}
