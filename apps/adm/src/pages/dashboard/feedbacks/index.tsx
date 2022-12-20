import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import SiderbarLayout from '@layouts/SiderbarLayout'

const DashboardFeedbacks: NextPage = () => {
  return <NextSeo title="Feedbacks" />
}

// @ts-expect-error layout
DashboardFeedbacks.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default DashboardFeedbacks

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
