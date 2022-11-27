import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import UserProfileFormSection from '@features/user/UserProfileFormSection'
import ProfileLayout from '@layouts/ProfileLayout'
import React from 'react'

const ProfileDadosPessoaisPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Meu perfil" />

      <ProfileLayout>
        <main className="my-20 max-w-screen-md mx-auto">
          {/* <SiderbarProfile /> */}
          <UserProfileFormSection />
        </main>
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
