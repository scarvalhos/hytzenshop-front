import type { NextPage } from 'next'

import { withSSRGuest } from '@hocs/withSSRGuest'
import { NextSeo } from 'next-seo'

import LoginFormSection from '@features/auth/LoginFormFormSection'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="Faça seu login" />

      <LoginFormSection
        containerClassName="h-[100vh] max-md:mx-8"
        title={
          <span className="flex flex-col space-y-4 items-start">
            <Image
              src="/icons/logo.svg"
              alt="Hytzen Shop Adm"
              width={32}
              height={32}
            />
            <span>
              Faça login
              <br />
              para começar
            </span>
          </span>
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
