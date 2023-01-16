import type { NextPage } from 'next'

import { validateToken } from '@hytzenshop/helpers'
import { withSSRGuest } from '@hocs/withSSRGuest'
import { NextSeo } from 'next-seo'

import ResetPasswordSection from '@features/auth/ResetPasswordSection'
import Header from '@components/Header'

const ResetPasswordPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Redefinir senha - Hytzen Shop" />

      <Header glassEffect />

      <ResetPasswordSection
        containerClassName="h-[100vh]"
        title={
          <div className="space-y-2 max-md:max-w-md max-md:w-full md:mr-20">
            <strong className="text-4xl md:text-5xl text-light-gray-100">
              Redefina
              <br />a sua senha
            </strong>
          </div>
        }
      />
    </>
  )
}

export default ResetPasswordPage

export const getServerSideProps = withSSRGuest(async (ctx) => {
  if (!validateToken(ctx.query.token as string)) {
    return {
      notFound: true,
    }
  }
  return {
    props: {},
  }
})
