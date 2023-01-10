import { RequestsServicesList } from '@features/customerservice/RequestsServicesList'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import SiderbarLayout from '@layouts/SiderbarLayout'

const CustomerServiceDashboard: NextPage = () => {
  return (
    <>
      <NextSeo title="Central de atendimento ao cliente" />

      <RequestsServicesList />
    </>
  )
}

// @ts-expect-error layout
CustomerServiceDashboard.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default CustomerServiceDashboard

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
