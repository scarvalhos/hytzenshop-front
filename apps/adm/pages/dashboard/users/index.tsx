import * as React from 'react'

import { PaginationParams, UserGetAllDto } from '@hytzenshop/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { HeaderUsersTable } from '@features/users/UsersList/Header'
import { LoadAnimated } from '@core/LoadAnimated'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { Pagination } from '@core/Pagination'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { api } from '@hytzenshop/services'
import { c } from '@hytzenshop/helpers'

import SiderbarLayout from '@layouts/SiderbarLayout'
import UsersList from '@features/users/UsersList'

const getUsersList = async ({
  filter,
  limit,
  order,
  page,
  sort,
}: PaginationParams): Promise<UserGetAllDto> => {
  const { data } = await api.get<UserGetAllDto>('/users', {
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

const DashboardUsers: NextPage = () => {
  const [state, dispatch] = React.useState<PaginationParams>({
    page: 1,
    limit: 10,
    filter: '',
    sort: 'createdAt',
    order: 'desc',
  })

  const { data, isLoading } = useQuery(
    ['users', state.page, state.filter],
    () =>
      getUsersList({
        filter: state.filter,
        limit: state.limit,
        page: state.page,
        order: state.order,
        sort: state.sort,
      }),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<UserGetAllDto, unknown>

  const setPage = React.useCallback(
    (page: number) => {
      dispatch({
        ...state,
        page,
      })
    },
    [state]
  )

  const onFilterChange = React.useCallback(
    (filter?: string) => {
      dispatch({
        ...state,
        filter,
      })
    },
    [state]
  )

  return (
    <>
      <NextSeo title="Usuários" />

      <HeaderUsersTable
        onFilterChange={onFilterChange}
        users={data?.data.users || []}
      />

      <div className="mb-20">
        <div className={c(isLoading && 'flex justify-center items-center')}>
          {isLoading ? (
            <LoadAnimated size={160} />
          ) : (
            <UsersList users={data?.data.users || []} />
          )}
        </div>

        {!isLoading && (
          <Pagination
            currentPage={state.page}
            totalCountOfRegisters={data?.data.count || 0}
            registersPerPage={state.limit}
            onPageChange={setPage}
          />
        )}
      </div>
    </>
  )
}

// @ts-expect-error layout
DashboardUsers.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default DashboardUsers

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    }
  },
  {
    isAdmin: true,
  }
)
