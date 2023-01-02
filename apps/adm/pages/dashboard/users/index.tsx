import * as React from 'react'

import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import SiderbarLayout from '@layouts/SiderbarLayout'
import UsersListPage from '@features/users/UsersListPage'

const UsersDashboard: NextPage = () => {
  return (
    <>
      <NextSeo title="Usuários" />

      <UsersListPage />
    </>
  )
}

// @ts-expect-error layout
UsersDashboard.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default UsersDashboard

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
