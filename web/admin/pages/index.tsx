import type { NextPage } from 'next'

import { LoginFormSection } from '@features/auth/LoginFormFormSection'
import { withSSRGuest } from '@hocs/withSSRGuest'
import { NextSeo } from 'next-seo'

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="Faça seu login" />

      <LoginFormSection
        containerClassName="h-[100vh] max-md:mx-8"
        title={
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <p className="py-4 text-2xl font-bebas text-light-gray-100">
                <span className="text-success-300">Hytzen</span>
                Shop
              </p>
            </div>

            <p className="text-4xl md:text-5xl max-w-sm text-light-gray-100 font-bold">
              Faça seu login para começar
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
