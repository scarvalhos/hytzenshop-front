import * as React from 'react'

import { useBreakpoint } from '@hooks/useBreakpoint'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import Header from '@components/Header'
import Button from '@components/Button'
import Lottie from 'react-lottie'

import * as errorAnimated from 'assets/error-animated.json'

const Error404: React.FC = () => {
  const { back } = useRouter()

  const { sm } = useBreakpoint()

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

      <Header />

      <div
      // direction={sm ? 'column' : 'row'}
      // justifyContent="center"
      // alignItems="center"
      // height="80vh"
      >
        <Lottie
          options={defaultOptions}
          height={!sm ? '18rem' : 420}
          width={!sm ? '18rem' : 420}
          style={{ margin: 0 }}
        />

        <div
        // marginTop={sm ? 0 : 10}
        // zIndex={9999}
        // alignItems={sm ? 'center' : 'flex-start'}
        >
          <p
          // textAlign={sm ? 'center' : 'left'}
          // fontWeight="bold"
          // fontSize="1.875rem"
          // color="#FFF"
          >
            Ops! Página não encontrada...
          </p>
          <Button
            onClick={() => back()}
            // icon={<WestIcon sx={{ marginRight: 1 }} />}
          >
            Voltar à página anterior
          </Button>
        </div>
      </div>
    </>
  )
}

export default Error404

// FF1D32
