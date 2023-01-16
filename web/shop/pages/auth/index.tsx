import type { NextPage } from 'next'

import { withSSRGuest } from '@hocs/withSSRGuest'
import { NextSeo } from 'next-seo'

import LoginFormSection from '@features/auth/LoginFormSection/LoginFormSection'
import Header from '@components/Header'
import Image from 'next/image'

const SignInPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Faça seu login - Hytzen Shop" />

      <Header glassEffect />

      <LoginFormSection
        containerClassName="h-[100vh]"
        title={
          <div className="space-y-2">
            <Image
              src="/icons/logo.svg"
              alt="Hytzen Shop"
              width={46}
              height={46}
              className="mb-6"
            />

            <p className="text-4xl md:text-5xl text-light-gray-100 font-bold">
              Faça login
            </p>
            <p className="text-xl max-w-sm text-light-gray-100 font-medium">
              Para começar digite seu username e senha ou efetue seu cadastro.
            </p>
          </div>
        }
      />
    </>
  )
}

export default SignInPage

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  }
})
