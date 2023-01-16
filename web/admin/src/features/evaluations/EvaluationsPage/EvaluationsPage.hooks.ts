import { EvaluationGetAllDto, PaginationParams } from '@hytzenshop/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { api } from '@hytzenshop/services'

import React from 'react'

const getEvaluationsList = async ({
  filter,
  limit,
  order,
  page,
  sort,
}: PaginationParams) => {
  const { data } = await api.get<EvaluationGetAllDto>('/evaluation', {
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

export const useEvaluationsPage = () => {
  const [state, dispatch] = React.useReducer(
    (prev: PaginationParams, next: PaginationParams) => {
      return { ...prev, ...next }
    },
    {
      page: 1,
      limit: 10,
      filter: undefined,
      sort: 'createdAt',
      order: 'desc',
    }
  )

  const queryKey = React.useMemo(
    () => ['evaluations', state.page, state.filter],
    [state]
  )

  const evaluationsQuery = useQuery(
    queryKey,
    () =>
      getEvaluationsList({
        filter: state.filter,
        limit: state.limit,
        page: state.page,
        order: state.order,
        sort: state.sort,
      }),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<EvaluationGetAllDto, unknown>

  const setPage = (page: number) => {
    dispatch({
      ...state,
      page,
    })
  }

  return {
    evaluationsQuery,
    dispatch,
    queryKey,
    setPage,
    state,
  }
}
