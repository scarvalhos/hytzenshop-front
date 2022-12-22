import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'

import { OrderGetAllDto, OrderGetDto, PaymentStatus } from '@hytzenshop/types'
import { defaultToastError } from '@hytzenshop/helpers'
import { toast } from 'react-toastify'
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

export const updateOrderStatus = async ({
  mpPaymentId,
  status,
}: {
  status: PaymentStatus
  mpPaymentId: string
}) => {
  return api
    .put<OrderGetDto>(`/orders/${mpPaymentId}/${status}`)
    .then(({ data }) => data)
}

export function useOrders({
  filter,
  limit,
  order,
  page,
  sort,
}: {
  page?: number
  limit?: number
  filter?: string
  sort?: string
  order?: string
}) {
  const queryClient = useQueryClient()

  const getOrders = useQuery(
    ['orders', page, filter],
    () => getOrdersList(page || 1, limit || 10, filter, sort, order),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<OrderGetAllDto, unknown>

  const updateOrderStatusMutation = useMutation(updateOrderStatus, {
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries(['order', order])
      queryClient.invalidateQueries(['orders'])
    },
    onError: defaultToastError,
  })

  return {
    getOrders,
    updateOrderStatus: updateOrderStatusMutation.mutate,
  }
}
