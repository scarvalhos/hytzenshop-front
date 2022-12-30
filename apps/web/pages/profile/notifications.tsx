import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import ProfileLayout from '@layouts/ProfileLayout'
import React from 'react'

const NotificationsProfilePage: NextPage = () => {
  return (
    <>
      <NextSeo title="Notificações" />

      <ProfileLayout></ProfileLayout>
    </>
  )
}

export default NotificationsProfilePage

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  }
})
