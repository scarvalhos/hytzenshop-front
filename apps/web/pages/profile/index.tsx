import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'

import ProfileLayout from '@layouts/ProfileLayout'

const ProfilePage: NextPage = () => {
  return <ProfileLayout></ProfileLayout>
}

export default ProfilePage

export const getServerSideProps = withSSRAuth(async () => {
  return {
    redirect: {
      destination: '/profile/dados-pessoais',
      permanent: false,
    },
  }
})
