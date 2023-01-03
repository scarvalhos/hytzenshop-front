import * as React from 'react'

import { Error404 as Error } from '@luma/ui'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

const Error404: React.FC = () => {
  const { back } = useRouter()

  return (
    <>
      <NextSeo title="Página não encontrada" />

      <Error onButtonClick={() => back()} />
    </>
  )
}

export default Error404
