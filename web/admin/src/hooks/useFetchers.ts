import * as React from 'react'

import { api } from '@hytzenshop/services'
import { UserGetDto } from '@hytzenshop/types'

export const useFetchers = () => {
  const getUser = React.useCallback(async (id: string) => {
    const {
      data: { user },
    } = await api.get<UserGetDto>(`/users/${id}`)

    return user
  }, [])

  return {
    getUser,
  }
}
