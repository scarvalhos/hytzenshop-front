import * as React from 'react'

import { setUpAPIClient } from '@services/api'
import { UserGetDto } from '@hytzenshop/types'

export const useFetchers = () => {
  const getUser = React.useCallback(async (id: string) => {
    const apiClient = setUpAPIClient()
    const {
      data: { user },
    } = await apiClient.get<UserGetDto>(`/users/${id}`)

    return user
  }, [])

  return {
    getUser,
  }
}
