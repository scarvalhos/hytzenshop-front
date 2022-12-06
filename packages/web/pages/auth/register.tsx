import type { NextPage } from 'next'

import { withSSRGuest } from '@hocs/withSSRGuest'
import { NextSeo } from 'next-seo'

import RegisterFormSection from '@features/auth/RegisterFormSection'
import Header from '@components/Header'

const RegisterPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Cadastro - Hytzen Shop" />

      <Header />

      <RegisterFormSection
        containerClassName="h-[100vh] max-md:mx-8"
        title={
          <span>
            Faça login
            <br />
            para começar
          </span>
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
