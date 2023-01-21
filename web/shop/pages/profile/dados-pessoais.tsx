import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useAuth } from '@contexts/AuthContext'
import { Avatar } from '@luma/ui'

import UserProfileFormSection from '@features/user/UserProfileFormSection'
import ProfileLayout from '@layouts/ProfileLayout'
import React from 'react'

const ProfileDadosPessoaisPage: NextPage = () => {
  const { user } = useAuth()
  return (
    <>
      <NextSeo title="Meu perfil" />

      <ProfileLayout>
        <div className="w-full h-44 bg-primary">
          <div className="max-w-screen-md mx-auto h-full relative px-6">
            <Avatar
              src={user?.profile?.avatar}
              name={user?.profile?.completeName || user?.username}
              imageClassName="w-32 h-32 absolute -bottom-16"
              fallbackClassName="p-12 bg-primary text-xl absolute -bottom-16"
            />
          </div>
        </div>

        <main className="my-20 max-w-screen-md mx-auto">
          <UserProfileFormSection />
        </main>
      </ProfileLayout>
    </>
  )
}

export default ProfileDadosPessoaisPage

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    }
  },
  {
    mustBeAuthenticated: true,
  }
)
