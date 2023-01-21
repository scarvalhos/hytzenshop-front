import { ProductGetAllDto } from '@hytzenshop/types'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { api } from '@hytzenshop/services'

import SiderbarLayout from '@layouts/SiderbarLayout'
import React from 'react'

async function getData(id?: string | null) {
  const filterString = JSON.stringify({
    evaluation: { some: { id } },
  })

  const { data } = await api.get<ProductGetAllDto>(`/products`, {
    params: {
      filter: filterString,
    },
  })

  return data
}

const EvaluationLoadingPage: NextPage = () => {
  return <NextSeo title="Loading..." />
}

// @ts-expect-error layout
EvaluationLoadingPage.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default EvaluationLoadingPage

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const data = await getData(ctx.params?.id as string)

    if (data.data.products[0].id) {
      return {
        redirect: {
          destination: `/dashboard/products/${data.data.products[0].id}`,
          permanent: false,
        },
      }
    }

    return {
      notFound: true,
    }
  },
  {
    isAdmin: true,
  }
)
