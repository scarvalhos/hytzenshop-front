import * as React from 'react'

import { MetricsDto } from '@hytzenshop/types'
import { useQuery } from '@tanstack/react-query'
import { api } from '@hytzenshop/services'

interface HomeMetricsContextType {
  ordersDeliveredCount?: number
  openCartsCount?: number
  totalSalesCount?: number
  totalUsersCount?: number
  isLoading?: boolean
}

type HomeMetricsProviderType = {
  children: React.ReactNode
}

const HomeMetricsContext = React.createContext<HomeMetricsContextType>(
  {} as HomeMetricsContextType
)

export function HomeMetricsProvider({ children }: HomeMetricsProviderType) {
  const [state, dispatch] = React.useReducer(
    (prev: HomeMetricsContextType, next: HomeMetricsContextType) => {
      return { ...prev, ...next }
    },
    {
      ordersDeliveredCount: undefined,
      openCartsCount: undefined,
      totalSalesCount: undefined,
      totalUsersCount: undefined,
      isLoading: undefined,
    }
  )

  const metricsQuery = useQuery({
    queryKey: ['metrics'],
    queryFn: () =>
      api
        .get<MetricsDto>('/metrics', {
          params: {
            filter: JSON.stringify({
              status: 'delivered',
            }),
          },
        })
        .then(({ data }) => data.data),
    staleTime: 60000,
  })

  React.useEffect(() => {
    dispatch({
      ordersDeliveredCount: metricsQuery.data?.ordersDeliveredCountQuery,
      openCartsCount: metricsQuery.data?.openCartsCountQuery,
      totalSalesCount: metricsQuery.data?.totalSalesCountQuery,
      totalUsersCount: metricsQuery.data?.totalUsersCountQuery,
      isLoading: metricsQuery.isLoading,
    })
  }, [metricsQuery.data, metricsQuery.isLoading])

  return (
    <HomeMetricsContext.Provider value={state}>
      {children}
    </HomeMetricsContext.Provider>
  )
}

export const useHomeMetrics = () => React.useContext(HomeMetricsContext)
