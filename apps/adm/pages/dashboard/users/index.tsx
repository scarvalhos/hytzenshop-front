import * as React from 'react'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { HeaderUsersTable } from '@features/users/UsersList/Header'
import { UserGetAllDto } from '@hytzenshop/types'
import { useNewProduct } from '@hooks/useNewProduct'
import { LoadAnimated } from '@core/LoadAnimated'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { Pagination } from '@core/Pagination'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Stack } from '@mui/material'
import { api } from '@hytzenshop/services'

import SiderbarLayout from '@layouts/SiderbarLayout'
import UsersList from '@features/users/UsersList'

const getUsersList = async (
  page: number,
  limit: number,
  filter?: string,
  sort?: string,
  order?: string
): Promise<UserGetAllDto> => {
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
  const [page, setPage] = React.useState(1)

  const limit = 10

  const { filter } = useNewProduct()

  const { data, isLoading } = useQuery(
    ['products', page, filter],
    () => getUsersList(page || 1, limit || 10, filter),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<UserGetAllDto, unknown>

  return (
    <>
      <NextSeo title="Usuários" />

      <HeaderUsersTable />

      <Stack spacing={4} mb={10}>
        <Stack
          {...(isLoading
            ? {
                justifyContent: 'center',
                alignItems: 'center',
              }
            : {})}
        >
          {isLoading ? (
            <LoadAnimated size={160} />
          ) : (
            <UsersList users={data?.data.users || []} />
          )}
        </Stack>

        {!isLoading && (
          <Pagination
            currentPage={page}
            totalCountOfRegisters={data?.data.count || 0}
            registersPerPage={limit}
            onPageChange={setPage}
          />
        )}
      </Stack>
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
