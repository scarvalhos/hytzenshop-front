import type { NextPage } from 'next'

import { validateToken } from '@hytzenshop/helpers'
import { withSSRGuest } from '@hocs/withSSRGuest'
import { NextSeo } from 'next-seo'

import ResetPasswordSection from '@features/auth/ResetPasswordSection'

const ResetPasswordPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Redefinir senha - Hytzen Shop" />

      <ResetPasswordSection
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
              Redefina
              <br />a sua senha
            </p>
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
