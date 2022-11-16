import * as React from 'react'

import { Stack, Typography, useTheme, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { Button } from '@core/Button'

import WestIcon from '@mui/icons-material/West'
import Lottie from 'react-lottie'

import * as errorAnimated from 'assets/error-animated.json'

const Error404: React.FC = () => {
  const { back } = useRouter()
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('md'))

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: errorAnimated,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <>
      <NextSeo title="Página não encontrada" />

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
        >
          <Typography
            textAlign={sm ? 'center' : 'left'}
            fontWeight="bold"
            fontSize="1.875rem"
            color="#FFF"
          >
            Ops! Página não encontrada...
          </Typography>
          <Button
            onClick={() => back()}
            icon={<WestIcon sx={{ marginRight: 1 }} />}
            title="Voltar à página anterior"
            variant="text"
            sx={{ marginTop: 2 }}
          />
        </Stack>
      </Stack>
    </>
  )
}

export default Error404

// FF1D32
