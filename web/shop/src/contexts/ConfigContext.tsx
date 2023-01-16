import React from 'react'

import {
  Category,
  FileRecord,
  CategoryGetAllDto,
  SystemConfigDto,
  ProductGetAllDto,
  Product,
} from '@hytzenshop/types'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getProductList } from '@hooks/useProducts'
import { api } from '@hytzenshop/services'
import { randonfy } from '@hytzenshop/helpers'

interface ConfigContextType {
  categories: Category[]
  sliderImages?: FileRecord[]
  announcement?: string
  showAnnouncement?: boolean
  announcementImage?: FileRecord
  productsSugestions?: Product[] | undefined
}

type ConfigProviderType = {
  children: React.ReactNode
}

const ConfigContext = React.createContext<ConfigContextType>(
  {} as ConfigContextType
)

export function ConfigProvider({ children }: ConfigProviderType) {
  const [state, dispatch] = React.useReducer(
    (prev: ConfigContextType, next: ConfigContextType) => {
      return { ...prev, ...next }
    },
    {
      categories: [],
      sliderImages: [],
      announcement: '',
      showAnnouncement: false,
      announcementImage: undefined,
      productsSugestions: undefined,
    }
  )

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
    dispatch({
      categories: dataCategories?.categories || [],
      sliderImages: configData?.systemConfiguration.sliderImages,
      announcement: configData?.systemConfiguration.announcement,
      showAnnouncement: configData?.systemConfiguration.showAnnouncement,
      announcementImage: configData?.systemConfiguration.announcementImage,
      productsSugestions: randonfy(productsSugestions?.data.products).slice(
        0,
        5
      ),
    })
  }, [configData, dataCategories, productsSugestions])

  return (
    <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = () => React.useContext(ConfigContext)
