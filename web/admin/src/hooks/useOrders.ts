import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'

import {
  OrderGetAllDto,
  PaginationParams,
  StatusOrders,
} from '@hytzenshop/types'

import { defaultToastError } from '@hytzenshop/helpers'
import { toast } from '@luma/ui'
import { api } from '@hytzenshop/services'

const getOrdersList = async (
  params: PaginationParams
): Promise<OrderGetAllDto> => {
  const { data } = await api.get<OrderGetAllDto>('/orders', {
    params,
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
  return api.put(`/orders/${id}/${status}`)
}

export function useOrders(params: PaginationParams) {
  const queryClient = useQueryClient()

  const getOrders = useQuery(
    ['orders', params.page, params.filter],
    () => getOrdersList(params),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<OrderGetAllDto, unknown>

  const updatedOrderStatusMutation = useMutation(updatedOrderStatus, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(['orders', params.page, params.filter])
      toast.success(data.message)
    },

    onError: defaultToastError,
  })

  return {
    getOrders,
    updatedOrderStatus: updatedOrderStatusMutation.mutate,
  }
}
