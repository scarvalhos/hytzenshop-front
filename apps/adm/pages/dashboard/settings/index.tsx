import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { DivideY } from '@luma/ui'

import AnnouncementSection from '@features/Sections/AnnouncementSection'
import SliderImagesSection from '@features/Sections/SliderImagesSection'
import CategoriesSections from '@features/Sections/CategoriesSections'
import SiderbarLayout from '@layouts/SiderbarLayout'

const Settings: NextPage = () => {
  return (
    <>
      <NextSeo title="Configurações" />

      <div className="space-y-8 w-full mb-20 lg:w-[50%]">
        <h1 className="text-light-gray-100 font-bold text-2xl">
          Configurações do sistema
        </h1>
        <DivideY>
          <CategoriesSections />
          <AnnouncementSection />
          <SliderImagesSection />
        </DivideY>
      </div>
    </>
  )
}

// @ts-expect-error layout
Settings.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default Settings

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    }
  },
  {
    isAdmin: true,
  }
)
