import * as React from 'react'

import { Error404 as Error } from '@luma/ui'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import Header from '@components/Header'

const Error404: React.FC = () => {
  const { back } = useRouter()

  return (
    <>
      <NextSeo title="Página não encontrada" />

      <Header />

      <Error onButtonClick={() => back()} />
    </>
  )
}

export default Error404
