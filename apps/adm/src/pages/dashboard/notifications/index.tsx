import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import SiderbarLayout from '@layouts/SiderbarLayout'

const DashboardNotifications: NextPage = () => {
  return <NextSeo title="Notificações" />
}

// @ts-expect-error layout
DashboardNotifications.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default DashboardNotifications

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
