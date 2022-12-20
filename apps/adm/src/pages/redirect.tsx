import { GetServerSideProps, NextPage } from 'next'
import { Typography, useTheme, Stack } from '@mui/material'
import { parseCookies } from 'nookies'
import { LoadAnimated } from '@core/LoadAnimated'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { NextSeo } from 'next-seo'

const Redirect: NextPage = () => {
  const router = useRouter()
  const theme = useTheme()

  useEffect(() => {
    setTimeout(() => {
      router.reload()
    }, 1000)
  }, [])

  return (
    <>
      <NextSeo title="Redirecioando... | Hytzen Shop" />

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100vw', height: '100vh' }}
      >
        <Typography
          color={theme.palette.text.primary}
          fontSize="2rem"
          textAlign="right"
        >
          Aguarde, você está
          <br />
          sendo redirecionado!
        </Typography>
        <LoadAnimated />
      </Stack>
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
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
