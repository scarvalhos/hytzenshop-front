// import { PersonalDataBox } from '@features/profile/PersonalDataBox'

// import { SiderbarProfile } from '@features/profile/Siderbar'
import { setUpAPIClient } from '@services/api'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { UserGetDto } from '@utils/dtos/userDto'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { User } from '@utils/types/auth'

import UserProfileFormSection from '@features/user/UserProfileFormSection'
import ProfileLayout from '@layouts/ProfileLayout'
import React from 'react'

type ProfileDadosPessoaisPageProps = {
  user: User
}

const ProfileDadosPessoaisPage: NextPage<ProfileDadosPessoaisPageProps> = ({
  user,
}) => {
  return (
    <>
      <NextSeo title={user.profile?.completeName || user.username} />

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

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setUpAPIClient(ctx)
  const {
    data: { user },
  } = await apiClient.get<UserGetDto>('/auth/me')

  return {
    props: {
      user,
    },
  }
})
