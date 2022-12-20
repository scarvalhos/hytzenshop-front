import * as React from 'react'

import { Stack, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ErrorAnimation } from '@luma/ui'
import { NextSeo } from 'next-seo'
import { Link } from '@core/Link'

import Lottie from 'react-lottie'

const NotAllow: React.FC = () => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('md'))

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ErrorAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <>
      <NextSeo title="Acesso negado" />

      <Stack
        direction={sm ? 'column' : 'row'}
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <Lottie
          options={defaultOptions}
          height={sm ? '18rem' : 420}
          width={sm ? '18rem' : 420}
          style={{ margin: 0 }}
        />

        <Stack
          marginTop={sm ? 0 : 10}
          zIndex={9999}
          alignItems={sm ? 'center' : 'flex-start'}
          maxWidth={600}
          spacing={2}
        >
          <Typography
            textAlign={sm ? 'center' : 'left'}
            fontWeight="bold"
            fontSize="1.875rem"
            color="#FFF"
          >
            Ops! Parace que você não tem permissão para acessar essa área...
          </Typography>
          <Link href="https://localhost:3000">Voltar para a loja</Link>
        </Stack>
      </Stack>
    </>
  )
}

export default NotAllow

// FF1D32
