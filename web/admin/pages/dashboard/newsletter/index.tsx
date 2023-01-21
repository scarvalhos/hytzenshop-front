import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { NewsletterGetAllDto } from '@hytzenshop/types'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { c, date } from '@hytzenshop/helpers'
import { api } from '@hytzenshop/services'

import SendNewsletterButtonModal from '@components/Modal/SendNewsletterButtonModal '
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
          buttons: () => <SendNewsletterButtonModal />,
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
                    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-4 relative rounded-md bg-primary'
                  )}
                >
                  <div>
                    <p>E-mail</p>
                    <p className="text-primary">{newsletterSub.email}</p>
                  </div>

                  <div>
                    <p>Entrou em</p>
                    <p className="text-primary">
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
