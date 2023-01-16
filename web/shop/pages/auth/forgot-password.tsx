import type { NextPage } from 'next'

import { withSSRGuest } from '@hocs/withSSRGuest'
import { NextSeo } from 'next-seo'

import ForgotPasswordSection from '@features/auth/ForgotPasswordFormSection'
import Header from '@components/Header'

const ForgotPasswordPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Esqueci minha senha - Hytzen Shop" />

      <Header glassEffect />

      <ForgotPasswordSection
        containerClassName="h-[100vh]"
        title={
          <div className="space-y-2">
            <strong className="text-4xl md:text-5xl text-light-gray-100">
              Por favor
              <br />
              informe seu email
            </strong>
            <p className="text-xl max-w-md text-light-gray-100 font-medium">
              Iremos te enviar um email com as instruções para reconfigurar sua
              senha.
            </p>
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
