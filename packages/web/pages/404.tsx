import * as React from 'react'
import * as errorAnimated from 'src/assets/error-animated.json'

import { useBreakpoint } from '@hooks/useBreakpoint'
import { TbArrowLeft } from 'react-icons/tb'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import Header from '@components/Header'
import Button from '@components/Button'
import Lottie from 'react-lottie'

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

      <div className="flex flex-col sm:flex-row justify-center items-center h-[90vh] sm:space-x-10">
        <Lottie
          options={defaultOptions}
          height={!sm ? '18rem' : 420}
          width={!sm ? '18rem' : 420}
          style={{ margin: 0 }}
        />

        <div className="flex flex-col items-center sm:items-start space-y-2 sm:mt-10">
          <p className="text-2xl font-semibold text-light-gray-100">
            Ops! Página não encontrada...
          </p>
          <Button onClick={() => back()} className="p-0">
            <span className="flex flex-row space-x-2">
              <TbArrowLeft />
              <p>Voltar à página anterior</p>
            </span>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Error404
