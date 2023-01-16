import * as React from 'react'

import { ConfigProvider } from '@contexts/ConfigContext'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import ProductsListPage from '@features/product/ProductsListPage'
import SiderbarLayout from '@layouts/SiderbarLayout'

const ProductsListDashboard: NextPage = () => {
  return (
    <ConfigProvider>
      <NextSeo title="Produtos" />

      <ProductsListPage />
    </ConfigProvider>
  )
}

// @ts-expect-error layout
ProductsListDashboard.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default ProductsListDashboard

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
