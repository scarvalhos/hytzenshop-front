import React from 'react'

import {
  Category,
  FileRecord,
  CategoryGetAllDto,
  SystemConfigDto,
  ProductGetAllDto,
} from '@hytzenshop/types'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getProductList } from '@hooks/useProducts'
import { api } from '@hytzenshop/services'

interface ConfigContextType {
  categories: Category[]
  sliderImages?: FileRecord[]
  announcement?: string
  showAnnouncement?: boolean
  productsSugestions?: ProductGetAllDto | undefined
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
    productsSugestions: undefined,
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

  const { data: productsSugestions } = useQuery(
    ['products-sugestions'],
    () => getProductList(1, 30),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<ProductGetAllDto, unknown>

  React.useEffect(() => {
    setState({
      categories: dataCategories?.categories || [],
      sliderImages: configData?.systemConfiguration.sliderImages,
      announcement: configData?.systemConfiguration.announcement,
      showAnnouncement: configData?.systemConfiguration.showAnnouncement,
      productsSugestions,
    })
  }, [configData, dataCategories, productsSugestions])

  return (
    <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = () => React.useContext(ConfigContext)
