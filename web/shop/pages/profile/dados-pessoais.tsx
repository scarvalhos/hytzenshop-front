import * as Avatar from '@radix-ui/react-avatar'

import { getFirstLetters } from '@hytzenshop/helpers'
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
      <NextSeo title="Meu perfil" />

      <ProfileLayout>
        <div className="w-full h-44 bg-dark-gray-400">
          <div className="max-w-screen-md mx-auto h-full relative px-6">
            <Avatar.Root>
              <Avatar.Image
                src={user?.profile?.avatar}
                alt={user?.profile?.completeName}
                className="w-32 h-32 rounded-full border-[1.5px] border-success-300 bg-dark-gray-400 absolute -bottom-16"
              />

              <Avatar.AvatarFallback className="text-light-gray-100 border border-success-300 bg-dark-gray-300 rounded-full text-xl p-12 absolute -bottom-16">
                {getFirstLetters(user?.username || '')}
              </Avatar.AvatarFallback>
            </Avatar.Root>
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
