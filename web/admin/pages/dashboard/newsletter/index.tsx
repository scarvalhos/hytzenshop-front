import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { NewsletterGetAllDto } from '@hytzenshop/types'
import { TbMailForward } from 'react-icons/tb'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { c, date } from '@hytzenshop/helpers'
import { Button } from '@luma/ui'
import { api } from '@hytzenshop/services'

import DashboardPagesLayout from '@layouts/DashboardPagesLayout'
import SiderbarLayout from '@layouts/SiderbarLayout'
import React from 'react'

const getNewsletter = async () => {
  return api.get<NewsletterGetAllDto>('/newsletter').then(({ data }) => data)
}

const NewsletterDashboard: NextPage = () => {
  const [state, dispatch] = React.useState({
    page: 1,
    limit: 10,
  })

  const newsletterQuery = useQuery(['newsletter'], () => getNewsletter(), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  }) as UseQueryResult<NewsletterGetAllDto, unknown>

  const setPage = React.useCallback(
    (page: number) => {
      dispatch({
        ...state,
        page,
      })
    },
    [state]
  )
  return (
    <>
      <NextSeo title="Newsletter" />

      <DashboardPagesLayout
        title="Newsletter"
        isLoading={newsletterQuery.isLoading}
        header={{
          buttons: () => (
            <Button variant="filled" className="max-sm:p-3" rounded>
              <span className="flex items-center justify-center space-x-2">
                <TbMailForward />
                <p className="max-sm:hidden">Enviar e-mail</p>
              </span>
            </Button>
          ),
        }}
        pagination={{
          page: state.page,
          limit: state.limit,
          totalRegisters: newsletterQuery.data?.data.count,
          onPageChange: setPage,
        }}
        renderList={() => (
          <div className="space-y-4">
            {newsletterQuery.data?.data.newsletterSubs
              ?.slice(
                (state?.page - 1) * state.limit,
                state?.page * state.limit
              )
              .map((newsletterSub) => (
                <div
                  key={newsletterSub?._id}
                  className={c(
                    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-4 relative rounded-md bg-dark-gray-500 bg-opacity-70'
                  )}
                >
                  <div>
                    <p>E-mail</p>
                    <p className="text-light-gray-100">{newsletterSub.email}</p>
                  </div>

                  <div>
                    <p>Entrou em</p>
                    <p className="text-light-gray-100">
                      {date(newsletterSub?.createdAt, { type: 'long' })}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      />
    </>
  )
}

// @ts-expect-error layout
NewsletterDashboard.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default NewsletterDashboard

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