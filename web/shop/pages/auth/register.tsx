import type { NextPage } from 'next'

import { withSSRGuest } from '@hocs/withSSRGuest'
import { NextSeo } from 'next-seo'

import RegisterFormSection from '@features/auth/RegisterFormSection'

const RegisterPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Faça seu cadastro - Hytzen Shop" />

      <RegisterFormSection
        containerClassName="h-[100vh]"
        title={
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <p className="py-4 text-2xl font-bebas text-light-gray-100">
                <span className="text-success-300">Hytzen</span>
                Shop
              </p>
            </div>

            <p className="text-4xl md:text-5xl max-w-sm text-light-gray-100 font-bold">
              Faça o seu cadastro para começar
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
