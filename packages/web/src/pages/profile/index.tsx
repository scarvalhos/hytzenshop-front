import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { User } from '@utils/types/auth'

import ProfileLayout from '@layouts/ProfileLayout'

type ProfilePageProps = {
  user: User
}

const ProfilePage: NextPage<ProfilePageProps> = ({ user }) => {
  return (
    <ProfileLayout>
      <NextSeo title={`Hytzen Shop - ${user.username}`} />
    </ProfileLayout>
  )
}

export default ProfilePage

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
    redirect: {
      destination: '/profile/dados-pessoais',
      permanent: false,
    },
  }
})
