import * as React from 'react'

import { Button, ErrorAnimation } from '@luma/ui'
import { useBreakpoint } from '@hytzenshop/hooks'
import { NextSeo } from 'next-seo'

import Lottie from 'react-lottie'

const NotAllow: React.FC = () => {
  const { sm } = useBreakpoint()

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

      <div className="flex flex-col sm:flex-row items-center justify-center h-[80vh] mx-8 sm:space-x-4">
        <Lottie
          options={defaultOptions}
          height={!sm ? '18rem' : 420}
          width={!sm ? '18rem' : 420}
          style={{ margin: 0 }}
        />

        <div className="flex flex-col items-center sm:items-start max-w-xl space-y-4 sm:mt-12">
          <p className="text-center sm:text-left text-light-gray-100 font-semibold text-2xl">
            Ops! Parace que você não tem permissão para acessar essa área...
          </p>
          <Button href="https://localhost:3000" variant="filled" rounded>
            Voltar para a loja
          </Button>
        </div>
      </div>
    </>
  )
}

export default NotAllow
