import type { NextPage } from 'next'

import { withSSRGuest } from '@hocs/withSSRGuest'
import { NextSeo } from 'next-seo'

import RegisterFormSection from '@features/auth/RegisterFormSection'
import Header from '@components/Header'
import Image from 'next/image'

const RegisterPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Faça seu cadastro - Hytzen Shop" />

      <Header glassEffect />

      <RegisterFormSection
        containerClassName="h-[100vh]"
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
              Faça o seu cadastro
            </p>
            <p className="text-xl max-w-sm text-light-gray-100 font-medium">
              Para começar preencha os campos ao lado e faça o seu cadastro.
            </p>
          </div>
        }
      />
    </>
  )
}

export default RegisterPage

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  }
})
