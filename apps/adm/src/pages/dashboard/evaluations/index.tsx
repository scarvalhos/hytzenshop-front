import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import EvaluationsPage from '@features/evaluations/EvaluationsPage'
import SiderbarLayout from '@layouts/SiderbarLayout'
import React from 'react'

const DashboardEvaluations: NextPage = () => {
  return (
    <>
      <NextSeo title="Avaliações" />

      <EvaluationsPage />
    </>
  )
}

// @ts-expect-error layout
DashboardEvaluations.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default DashboardEvaluations

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
