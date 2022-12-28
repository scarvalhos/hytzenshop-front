import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'

import { OrderGetAllDto, OrderGetDto, PaymentStatus } from '@hytzenshop/types'
import { defaultToastError } from '@hytzenshop/helpers'
import { toast } from '@luma/ui'
import { api } from '@hytzenshop/services'

interface OrdersListParams {
  page?: number
  limit?: number
  filter?: string
  sort?: string
  order?: string
  userId?: string
}

const getOrdersList = async ({
  limit,
  page,
  filter,
  order,
  sort,
  userId,
}: OrdersListParams): Promise<OrderGetAllDto> => {
  const url = userId ? `/orders/${userId}` : '/orders'

  const { data } = await api.get<OrderGetAllDto>(url, {
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
  userId,
}: OrdersListParams) {
  const queryClient = useQueryClient()

  const getOrders = useQuery(
    ['orders', page, filter, userId],
    () =>
      getOrdersList({
        limit,
        page,
        filter,
        sort,
        order,
        userId,
      }),
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
