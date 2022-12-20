import { Stack, Typography } from '@mui/material'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import AnnouncementSection from '@features/Sections/AnnouncementSection'
import SliderImagesSection from '@features/Sections/SliderImagesSection'
import CategoriesSections from '@features/Sections/CategoriesSections'
import SiderbarLayout from '@layouts/SiderbarLayout'
import Divide from '@core/Divide'
import Head from 'next/head'

const Settings: NextPage = () => {
  // const theme = useTheme()
  // const md = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <NextSeo title="Configurações" />

      <Head>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>

      <Stack spacing={4} mt={4} mb={10} width="50%">
        <Typography variant="h5" color="white" fontWeight="bold">
          Configurações do sistema
        </Typography>
        <Divide>
          <CategoriesSections />
          <AnnouncementSection />
          <SliderImagesSection />
        </Divide>
      </Stack>
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
