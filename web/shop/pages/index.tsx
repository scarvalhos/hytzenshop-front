import { defaultSeo } from 'src/config/seo'
import { useConfig } from '@contexts/ConfigContext'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import MainProductsList from '@features/home/MainProductsList'
import WarningModal from '@components/Modal/WarningModal'
import Announcement from '@features/home/Announcement'
import Newsletter from '@features/home/Newsletter'
import Slider from '@components/Slider'
import React from 'react'

const Home: NextPage = () => {
  const { announcement } = useConfig()

  return (
    <HeaderFooterLayout glassEffect>
      <NextSeo
        title={announcement ? `Hytzen Shop - ${announcement}` : 'Home'}
        {...defaultSeo}
      />

      <WarningModal />

      <Slider />
      <MainProductsList />
      <Announcement />
      <Newsletter />
    </HeaderFooterLayout>
  )
}

export default Home
