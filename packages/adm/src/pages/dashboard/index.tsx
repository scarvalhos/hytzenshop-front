import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

const Dashboard: NextPage = () => {
  return <NextSeo title="Dashboard" />
}

export default Dashboard

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      redirect: {
        destination: '/dashboard/home',
        permanent: false,
      },
    }
  },
  {
    isAdmin: true,
  }
)
