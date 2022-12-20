import * as React from 'react'
import * as errorAnimated from '../../assets/error-animated.json'

import { useBreakpoint } from '@hytzenshop/hooks'
import { TbArrowLeft } from 'react-icons/tb'
import { Button } from '../../components/Button'

import Lottie from 'react-lottie'

export interface Error404Props {
  onButtonClick: () => void
}

export const Error404: React.FC<Error404Props> = ({ onButtonClick }) => {
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
        <Button onClick={onButtonClick} className="p-0">
          <span className="flex flex-row space-x-2">
            <TbArrowLeft />
            <p>Voltar à página anterior</p>
          </span>
        </Button>
      </div>
    </div>
  )
}
