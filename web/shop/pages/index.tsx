import { defaultSeo } from 'src/config/seo'
import { useConfig } from '@contexts/ConfigContext'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { api } from '@hytzenshop/services'

import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import MainProductsList from '@features/home/MainProductsList'
import Announcement from '@features/home/Announcement'
import Newsletter from '@features/home/Newsletter'
import Slider from '@components/Slider'
import React from 'react'

const Home: NextPage = () => {
  const { announcement } = useConfig()

  React.useEffect(() => {
    fetch('https://shop.hytzen.com:4000/api')
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, [])

  return (
    <HeaderFooterLayout glassEffect>
      <NextSeo
        title={announcement ? `Hytzen Shop - ${announcement}` : 'Home'}
        {...defaultSeo}
      />

      <Slider />
      <MainProductsList />
      <Announcement />
      <Newsletter />
    </HeaderFooterLayout>
  )
}

export default Home
