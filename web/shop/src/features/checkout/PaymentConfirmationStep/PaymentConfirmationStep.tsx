import React from 'react'

import { TbAlertTriangle, TbCircleCheck, TbCircleX } from 'react-icons/tb'
import { PaymentStatus } from '@hytzenshop/types'
import { useRouter } from 'next/router'
import { Button } from '@luma/ui'

interface PaymentConfirmationStepProps {
  paymentStatus?: PaymentStatus
  orderId?: string
  confirmation?: () => void
}

const PaymentConfirmationStep: React.FC<PaymentConfirmationStepProps> = ({
  paymentStatus,
  orderId,
}) => {
  const { reload } = useRouter()

  if (paymentStatus === 'pending') {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[40vh] px-6">
        <TbAlertTriangle size={92} className="text-light-gray-100" />
        <h2 className="text-2xl text-light-gray-100 font-medium">
          Seu pagamento está pendente
        </h2>
        <p className="text-center">
          Estamos aguardando o pagamento para prosseguirmos com seu pedido.
        </p>

        <span className="flex flex-col sm:flex-row mt-8 max-sm:space-y-2 sm:space-x-2 max-sm:w-full">
          <Button
            href={`/profile/pedidos/${orderId}`}
            variant="filled"
            className="max-sm:w-full bg-success-400"
            rounded
          >
            Ver pedido
          </Button>
        </span>
      </div>
    )
  }

  if (paymentStatus === 'rejected') {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[40vh] px-6">
        <TbCircleX size={92} className="text-light-gray-100" />
        <h2 className="text-2xl text-light-gray-100 font-medium">
          Seu pagamento foi recusado
        </h2>
        <p className="text-center">
          Verifique se está tudo certo com sua forma de pagamento e tente
          novamente.
        </p>

        <span className="flex flex-col sm:flex-row mt-8 max-sm:space-y-2 sm:space-x-2 max-sm:w-full">
          <Button
            onClick={() => reload()}
            variant="filled"
            className="max-sm:w-full"
            rounded
          >
            Pagar novamente
          </Button>
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-[40vh] px-6">
      <TbCircleCheck size={92} className="text-light-gray-100" />
      <h2 className="text-2xl text-light-gray-100 font-medium">
        Seu pagamento foi aprovado
      </h2>
      <p className="text-center">
        Pagamento aprovado! Estamos processando seu pedido e assim que for
        enviado te informaremos.
      </p>

      <span className="flex flex-col sm:flex-row mt-8 max-sm:space-y-2 sm:space-x-2 max-sm:w-full">
        <Button
          href={`/profile/pedidos/${orderId}`}
          variant="filled"
          className="max-sm:w-full bg-success-400"
          rounded
        >
          Acompanhar pedido
        </Button>
        <Button href="/" variant="outlined" className="max-sm:w-full" rounded>
          Comprar novamente
        </Button>
      </span>
    </div>
  )
}

export default PaymentConfirmationStep
