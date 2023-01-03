import { ProductGetAllDto, ProductGetDto } from '@hytzenshop/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { api } from '@hytzenshop/services'

import SiderbarLayout from '@layouts/SiderbarLayout'
import React from 'react'

async function getData(id?: string | null) {
  const filterString = JSON.stringify({
    evaluation: { some: { id } },
  })

  const { data } = await api.get<ProductGetDto>(`/products`, {
    params: {
      filter: filterString,
    },
  })

  return data
}

const EvaluationLoadingPage: NextPage = () => {
  const id = useSearchParams().get('id')

  const { push } = useRouter()

  const productQuery = useQuery(['product-evaluation', id], () => getData(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  }) as UseQueryResult<ProductGetAllDto, unknown>

  React.useEffect(() => {
    if (productQuery.data?.data.products[0]?.id)
      push(`/dashboard/products/${productQuery.data?.data.products[0]?.id}`)
  }, [productQuery.data?.data.products, push])

  return <NextSeo title="Loading..." />
}

// @ts-expect-error layout
EvaluationLoadingPage.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default EvaluationLoadingPage
