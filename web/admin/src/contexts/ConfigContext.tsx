import * as React from 'react'

import {
  Category,
  FileRecord,
  SystemConfigDto,
  CategoryGetAllDto,
} from '@hytzenshop/types'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@hytzenshop/services'

interface ConfigContextType {
  categories?: Category[]
  sliderImages?: FileRecord[]
  announcementImage?: FileRecord
  announcement?: string
  showAnnouncement?: boolean
  updateAnnouncement: (params: {
    announcementImage?: string
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
  announcementImage,
  showAnnouncement,
  announcement,
}: {
  announcementImage?: string
  showAnnouncement?: boolean
  announcement?: string
}) => {
  return api.put('/config', {
    announcementImage,
    showAnnouncement,
    announcement,
  })
}

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
      updateAnnouncement: () => undefined,
    }
  )

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

  const updateAnnouncementMutation = useMutation(updateAnnouncement, {
    onMutate: async (newSystemConfig) => {
      await queryClient.cancelQueries({ queryKey: ['config_system'] })

      const previousSystemConfig = queryClient.getQueryData<SystemConfigDto>([
        'config_system',
      ])

      queryClient.setQueryData(['config_system'], {
        ...previousSystemConfig,
        systemConfiguration: {
          ...previousSystemConfig?.systemConfiguration,
          announcement: newSystemConfig.announcement,
          showAnnouncement: newSystemConfig.showAnnouncement,
          announcementImage: newSystemConfig.announcementImage,
        },
      })

      return {
        previousSystemConfig,
        data: {
          ...previousSystemConfig?.systemConfiguration,
          announcement: newSystemConfig.announcement,
          showAnnouncement: newSystemConfig.showAnnouncement,
          announcementImage: newSystemConfig.announcementImage,
        },
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['config_system'] })
    },

    onError: (_err, _newSystemConfig, context) => {
      queryClient.setQueryData(['config_system'], context?.previousSystemConfig)
    },
  })

  React.useEffect(() => {
    dispatch({
      categories: dataCategories?.categories,
      sliderImages: configData?.systemConfiguration.sliderImages,
      announcement: configData?.systemConfiguration.announcement,
      showAnnouncement: Boolean(
        configData?.systemConfiguration.showAnnouncement
      ),
      announcementImage: configData?.systemConfiguration.announcementImage,
      updateAnnouncement: updateAnnouncementMutation.mutate,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configData, dataCategories])

  return (
    <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = () => React.useContext(ConfigContext)
