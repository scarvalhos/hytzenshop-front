import * as React from 'react'

import { NewProductForm } from '@features/product/NewProductForm'
import { ConfigProvider } from '@contexts/ConfigContext'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import SiderbarLayout from '@layouts/SiderbarLayout'

const NewProduct: NextPage = () => {
  return (
    <ConfigProvider>
      <NextSeo title="Novo produto" />

      <NewProductForm />
    </ConfigProvider>
  )
}

// @ts-expect-error layout
NewProduct.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default NewProduct

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
