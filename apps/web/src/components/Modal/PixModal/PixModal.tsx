import { PaymentStatus, PaymentWebhookResponse } from '@hytzenshop/types'
import { TbCheck, TbCircleCheck, TbCopy } from 'react-icons/tb'
import { socket } from '@services/socket'

import BaseModal, { BaseModalProps } from '../BaseModal/BaseModal'
import Image from 'next/image'
import React from 'react'
import copy from 'copy-to-clipboard'

export interface PixModalProps extends BaseModalProps {
  paymentResponse: any
}

const PixModal: React.FC<PixModalProps> = ({
  open,
  panelClassName,
  onClose,
  renderActions,
  paymentResponse,
}) => {
  const [paymentStatus, setPaymentStatus] = React.useState<PaymentStatus>()
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<NodeJS.Timeout>()

  const onClick = React.useCallback(() => {
    setCopied(
      copy(paymentResponse.point_of_interaction.transaction_data.qr_code)
    )
  }, [paymentResponse])

  React.useEffect(() => {
    timer.current = setTimeout(setCopied, 1000, false)
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [copied])

  socket.on('update.payment', ({ data }: PaymentWebhookResponse) => {
    setPaymentStatus(data.status)
  })

  return (
    <BaseModal
      open={open}
      panelClassName={panelClassName}
      onClose={onClose}
      renderActions={renderActions}
    >
      <div className="flex flex-col justify-center items-center">
        {paymentStatus === 'approved' ? (
          <TbCircleCheck className="text-success-300" size={110} />
        ) : (
          <Image
            src={`data:image/jpeg;base64,${paymentResponse.point_of_interaction.transaction_data.qr_code_base64}`}
            alt="QR Code"
            width={160}
            height={160}
            className="rounded-md"
          />
        )}

        <label htmlFor="copiar" className="text-light-gray-100 py-2">
          Código de pagamento
        </label>

        <div className="backdrop-blur-lg py-2 px-3 rounded-md flex flex-row items-center space-x-1 w-full my-4">
          <input
            type="text"
            id="copiar"
            value={
              paymentResponse.point_of_interaction.transaction_data.qr_code
            }
            className="bg-[transparent] w-full"
          />
          <button onClick={onClick}>
            {copied ? <TbCheck color="#44d063" /> : <TbCopy color="#44d063" />}
          </button>
        </div>

        <div className="flex flex-col items-start space-y-4">
          <p className="text-light-gray-100 mt-4 font-semibold">Como pagar?</p>

          <div className="flex flex-col justify-start items-start space-y-4">
            <p>
              Entre no app ou site do seu banco e escolha a opção de pagamento
              via Pix.
            </p>
            <p>Escaneie o código QR ou copie e cole o código de pagamento.</p>
            <p>
              Pronto! O pagamento será creditado na hora e você receberá um
              e-mail de confirmação.
            </p>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}

export default PixModal
