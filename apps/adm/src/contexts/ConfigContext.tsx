import * as React from 'react'

import {
  Category,
  FileRecord,
  CategoryGetAllDto,
  SystemConfigDto,
  OrderGetAllDto,
  CartGetAllDto,
  UserGetAllDto,
} from '@hytzenshop/types'

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'

import { useDebounceCallback } from '@react-hook/debounce'
import { defaultToastError } from '@hytzenshop/helpers'
import { toast } from 'react-toastify'
import { api } from '@hytzenshop/services'

interface ConfigContextType {
  categories?: Category[]
  sliderImages?: FileRecord[]
  announcement?: string
  showAnnouncement?: boolean
  ordersDeliveredCountQuery?: UseQueryResult<number, unknown>
  openCartsCountQuery?: UseQueryResult<number, unknown>
  totalSalesCountQuery?: UseQueryResult<number, unknown>
  totalUsersCountQuery?: UseQueryResult<number, unknown>
  updateSlideImages: (ids: string[]) => void
  updateAnnouncement: ({
    showAnnouncement,
    announcement,
  }: {
    showAnnouncement?: boolean
    announcement?: string
  }) => void
}

type ConfigProviderType = {
  children: React.ReactNode
}

const ConfigContext = React.createContext<ConfigContextType>(
  {} as ConfigContextType
)

const updateAnnouncement = async ({
  showAnnouncement,
  announcement,
}: {
  showAnnouncement?: boolean
  announcement?: string
}) => {
  return api.put('/config', {
    showAnnouncement,
    announcement,
  })
}

const updateSlideImages = async (ids: any[]) => {
  return api.put('/config', {
    sliderImages: ids.map((i) => i.id),
  })
}

export function ConfigProvider({ children }: ConfigProviderType) {
  const [state, setState] = React.useState<ConfigContextType>({
    categories: [],
    sliderImages: [],
    announcement: '',
    showAnnouncement: false,
    updateAnnouncement: () => null,
    updateSlideImages: () => null,
    ordersDeliveredCountQuery: undefined,
    openCartsCountQuery: undefined,
    totalSalesCountQuery: undefined,
    totalUsersCountQuery: undefined,
  })

  const queryClient = useQueryClient()

  const { data: dataCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      api.get<CategoryGetAllDto>('/categories').then(({ data: { data } }) => {
        return data
      }),
    staleTime: 60000,
  })

  const { data: configData } = useQuery({
    queryKey: ['config_system'],
    queryFn: () =>
      api.get<SystemConfigDto>('/config').then(({ data }) => {
        return data
      }),
    staleTime: 60000,
  })

  const ordersDeliveredCountQuery = useQuery({
    queryKey: ['orders-done-count'],
    queryFn: () =>
      api
        .get<OrderGetAllDto>('/orders', {
          params: {
            filter: JSON.stringify({
              status: 'delivered',
            }),
          },
        })
        .then(({ data }) => {
          return data.data.count
        }),
    staleTime: 60000,
  })

  const openCartsCountQuery = useQuery({
    queryKey: ['open-carts-count'],
    queryFn: () =>
      api.get<CartGetAllDto>('/carts').then(({ data }) => {
        return data.data.count
      }),
    staleTime: 60000,
  })

  const totalSalesCountQuery = useQuery({
    queryKey: ['total-sales-count'],
    queryFn: () =>
      api
        .get<OrderGetAllDto>('/orders', {
          params: {
            filter: JSON.stringify({
              status: {
                in: [
                  'approved',
                  'processing',
                  'sending',
                  'delivered',
                  'authorized',
                ],
              },
            }),
          },
        })
        .then(({ data }) => {
          return data.data.count
        }),
    staleTime: 60000,
  })

  const totalUsersCountQuery = useQuery({
    queryKey: ['total-users-count'],
    queryFn: () =>
      api.get<UserGetAllDto>('/users').then(({ data }) => {
        return data.data.count
      }),
    staleTime: 60000,
  })

  const updateAnnouncementMutation = useMutation(updateAnnouncement, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      queryClient.invalidateQueries(['config_system'])
    },
    onError: defaultToastError,
  })

  const updateSlideImagesMutation = useMutation(updateSlideImages, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      queryClient.invalidateQueries(['config_system'])
    },
    onError: defaultToastError,
  })

  const updateSlideImagesDebounce = useDebounceCallback(
    updateSlideImagesMutation.mutate,
    1000
  )

  React.useEffect(() => {
    setState({
      categories: dataCategories?.categories,
      sliderImages: configData?.systemConfiguration.sliderImages,
      announcement: configData?.systemConfiguration.announcement,
      showAnnouncement: Boolean(
        configData?.systemConfiguration.showAnnouncement
      ),
      updateAnnouncement: updateAnnouncementMutation.mutate,
      updateSlideImages: updateSlideImagesDebounce,
      ordersDeliveredCountQuery,
      openCartsCountQuery,
      totalSalesCountQuery,
      totalUsersCountQuery,
    })
  }, [
    configData,
    dataCategories,
    ordersDeliveredCountQuery.data,
    openCartsCountQuery.data,
    totalSalesCountQuery.data,
    totalUsersCountQuery.data,
  ])

  return (
    <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = () => React.useContext(ConfigContext)
