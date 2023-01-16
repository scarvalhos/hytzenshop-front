import { GetServerSideProps, NextPage } from 'next'
import { LoadingAnimation } from '@luma/ui'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import React from 'react'

const Redirect: NextPage = () => {
  const router = useRouter()

  React.useEffect(() => {
    setTimeout(() => {
      router.reload()
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NextSeo title="Redirecioando... | Hytzen Shop" />

      <main className="flex items-center justify-center w-[100vw] h-[100vh]">
        <p className="text-3xl text-light-gray-100 font-semibold text-left">
          Aguarde, você está
          <br />
          sendo redirecionado!
        </p>

        <LoadingAnimation />
      </main>
    </>
  )
}

export default Redirect

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'hytzenshopadm.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  }

  return {
    props: {},
  }
}
