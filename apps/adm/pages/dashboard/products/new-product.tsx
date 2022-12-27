import * as React from 'react'

import { ProductProvider } from '@contexts/NewProductContext'
import { NewProductForm } from '@features/product/NewProductForm'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import SiderbarLayout from '@layouts/SiderbarLayout'

const NewProduct: NextPage = () => {
  return (
    <ProductProvider>
      <NextSeo title="Novo produto" />

      <NewProductForm />
    </ProductProvider>
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
