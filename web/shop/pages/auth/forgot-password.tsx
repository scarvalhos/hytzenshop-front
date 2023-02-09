import type { NextPage } from 'next'

import { withSSRGuest } from '@hocs/withSSRGuest'
import { NextSeo } from 'next-seo'

import ForgotPasswordSection from '@features/auth/ForgotPasswordFormSection'

const ForgotPasswordPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Esqueci minha senha - Hytzen Shop" />

      <ForgotPasswordSection
        containerClassName="h-[100vh]"
        title={
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <p className="py-4 text-2xl font-bebas text-light-gray-100">
                <span className="text-success-300">Hytzen</span>
                Shop
              </p>
            </div>

            <span>
              <strong className="text-4xl md:text-5xl text-light-gray-100">
                Por favor
                <br />
                informe seu email
              </strong>
              <p className="text-xl max-w-md text-light-gray-100 font-medium">
                Iremos te enviar um email com as instruções para reconfigurar
                sua senha.
              </p>
            </span>
          </div>
        }
      />
    </>
  )
}

export default ForgotPasswordPage

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  }
})
