import { GetServerSideProps, NextPage } from 'next'
import { parseCookies } from 'nookies'
import { LoadAnimated } from '@core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { NextSeo } from 'next-seo'

const Redirect: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.reload()
    }, 1000)
  }, [])

  return (
    <>
      <NextSeo title="Redirecioando... | Hytzen Shop" />

      <div
      // direction="row"
      // justifyContent="center"
      // alignItems="center"
      // sx={{ width: '100vw', height: '100vh' }}
      >
        <p
        // color={theme.palette.text.primary}
        // fontSize="2rem"
        // textAlign="right"
        >
          Aguarde, você está
          <br />
          sendo redirecionado!
        </p>
        <LoadAnimated />
      </div>
    </>
  )
}

export default Redirect

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'hytzenshop.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
