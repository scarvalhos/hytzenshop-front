import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import SiderbarLayout from '@layouts/SiderbarLayout'

const DashboardTransactions: NextPage = () => {
  return <NextSeo title="Transações" />
}

// @ts-expect-error layout
DashboardTransactions.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default DashboardTransactions

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
