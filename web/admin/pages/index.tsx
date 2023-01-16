import type { NextPage } from 'next'

import { LoginFormSection } from '@features/auth/LoginFormFormSection'
import { withSSRGuest } from '@hocs/withSSRGuest'
import { NextSeo } from 'next-seo'

import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="Faça seu login" />

      <LoginFormSection
        containerClassName="h-[100vh] max-md:mx-8"
        title={
          <div className="space-y-2">
            <Image
              src="/icons/logo.svg"
              alt="Hytzen Shop Adm"
              width={46}
              height={46}
              className="mb-6"
            />

            <p className="text-4xl md:text-5xl text-light-gray-100 font-bold">
              Faça login
            </p>
            <p className="text-xl max-w-sm text-light-gray-100 font-medium">
              Para começar digite seu username e senha.
            </p>
          </div>
        }
      />
    </>
  )
}

export default Home

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  }
})
