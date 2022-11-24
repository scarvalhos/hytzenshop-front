import type { NextPage } from 'next'

import { withSSRGuest } from '@hocs/withSSRGuest'
import { NextSeo } from 'next-seo'

import LoginFormSection from '@features/auth/LoginFormSection/LoginFormSection'
import Header from '@components/Header'

const SignInPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Faça seu login - Hytzen Shop" />

      <Header />

      <div className="my-24 mx-8">
        <LoginFormSection
          title={
            <span>
              Faça login
              <br />
              para começar
            </span>
          }
        />
      </div>
    </>
  )
}

export default SignInPage

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  }
})
