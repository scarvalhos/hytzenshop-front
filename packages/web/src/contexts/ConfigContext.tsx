import React from 'react'

import { Category, FileRecord } from '@utils/types'
import { CategoryGetAllDto } from '@utils/dtos/categoryDto'
import { SystemConfigDto } from '@utils/dtos/systemConfigDto'
import { useQuery } from '@tanstack/react-query'
import { api } from '@services/apiClient'

interface ConfigContextType {
  categories: Category[]
  sliderImages?: FileRecord[]
  announcement?: string
  showAnnouncement?: boolean
}

type ConfigProviderType = {
  children: React.ReactNode
}

const ConfigContext = React.createContext<ConfigContextType>(
  {} as ConfigContextType
)

export function ConfigProvider({ children }: ConfigProviderType) {
  const [state, setState] = React.useState<ConfigContextType>({
    categories: [],
    sliderImages: [],
    announcement: '',
    showAnnouncement: false,
  })

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

  React.useEffect(() => {
    setState({
      categories: dataCategories?.categories || [],
      sliderImages: configData?.systemConfiguration.sliderImages,
      announcement: configData?.systemConfiguration.announcement,
      showAnnouncement: configData?.systemConfiguration.showAnnouncement,
    })
  }, [configData, dataCategories])

  return (
    <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = () => React.useContext(ConfigContext)
