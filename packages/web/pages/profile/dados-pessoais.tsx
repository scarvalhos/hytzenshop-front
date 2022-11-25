import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useAuth } from '@contexts/AuthContext'

import UserProfileFormSection from '@features/user/UserProfileFormSection'
import ProfileLayout from '@layouts/ProfileLayout'
import React from 'react'

const ProfileDadosPessoaisPage: NextPage = () => {
  const { user } = useAuth()

  return (
    <>
      <NextSeo title={user?.profile?.completeName || user?.username} />

      <ProfileLayout>
        {/* <SiderbarProfile /> */}
        <UserProfileFormSection />
      </ProfileLayout>
    </>
  )
}

export default ProfileDadosPessoaisPage

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  }
})
