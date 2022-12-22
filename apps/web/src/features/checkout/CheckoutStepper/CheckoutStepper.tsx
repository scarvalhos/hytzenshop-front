import { PaymentStatus, PaymentWebhookResponse } from '@hytzenshop/types'
import { useDebounceCallback } from '@react-hook/debounce'
import { IoIosArrowForward } from 'react-icons/io'
import { Button, Icons } from '@luma/ui'
import { StepperBar } from '@core'
import { useOrders } from '@hooks/useOrders'
import { useAuth } from '@contexts/AuthContext'
import { useCart } from '@contexts/CartContext'
import { socket } from '@services/socket'
import { toast } from 'react-toastify'
import { c } from '@hytzenshop/helpers'

import {
  TbAlertTriangle,
  TbCreditCard,
  TbUserCheck,
  TbLogout,
  TbCheck,
  TbTruck,
  TbX,
} from 'react-icons/tb'

import PaymentConfirmationStep from '../PaymentConfirmationStep'
import AddressCheckoutStep from '../AddressCheckoutStep'
import PaymentCheckoutStep from '../PaymentCheckoutStep'
import InfosCheckoutStep from '../InfosCheckoutStep'
import LoginFormSection from '@features/auth/LoginFormSection'
import React from 'react'

const CheckoutStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  const [paymentStatus, setPaymentStatus] = React.useState<PaymentStatus>()

  const { updateOrderStatus } = useOrders({})
  const { shipping, cart } = useCart()
  const { user } = useAuth()

  const steps = React.useMemo(() => {
    return {
      true: ['Informações', 'Frete', 'Pagamento', 'Confirmação'],
      false: ['Login/Cadastro', 'Frete', 'Pagamento', 'Confirmação'],
    }[`${!!user}`]
  }, [user])

  const handleSetActiveStep = React.useCallback(
    (payment?: PaymentStatus) => {
      if (activeStep === 0 && !user) return

      if (activeStep === 0 && !user?.profile)
        return toast.warn('Complete seus dados para continuar.')

      if (activeStep === 1 && !shipping?.transp_nome)
        return toast.warn('Você precisa selecionar uma opção de frete.')

      if (activeStep < steps.length) {
        setActiveStep(activeStep + 1)
      }

      if (payment) {
        setPaymentStatus(payment)
      }
    },
    [activeStep, shipping?.transp_nome, steps.length, user]
  )

  const stepIcon = React.useMemo(() => {
    const icons: { [index: string]: React.ReactElement } = {
      1: user ? (
        <TbUserCheck className="text-light-gray-100" />
      ) : (
        <TbLogout className="text-light-gray-100" />
      ),
      2: <TbTruck className="text-light-gray-100" />,
      3: <TbCreditCard className="text-light-gray-100" />,
      4:
        paymentStatus === 'rejected' ? (
          <TbX className="text-light-gray-100" />
        ) : paymentStatus === 'pending' ? (
          <TbAlertTriangle className="text-light-gray-100" />
        ) : (
          <TbCheck className="text-light-gray-100" />
        ),
    }

    return icons
  }, [paymentStatus, user])

  const content: { [index: number]: React.ReactElement } = {
    1: user ? (
      <InfosCheckoutStep
        checkoutNextStep={handleSetActiveStep}
        summaryButtonTitle="Próximo passo"
      />
    ) : (
      <LoginFormSection
        checkoutNextStep={handleSetActiveStep}
        title={
          <span>
            Faça login
            <br />
            para continuar
          </span>
        }
      />
    ),
    2: (
      <AddressCheckoutStep
        checkoutNextStep={handleSetActiveStep}
        summaryButtonTitle="Próximo passo"
      />
    ),
    3: (
      <PaymentCheckoutStep
        checkoutNextStep={handleSetActiveStep}
        paymentStatus={paymentStatus}
      />
    ),
    4: <PaymentConfirmationStep paymentStatus={paymentStatus} />,
  }

  const call = useDebounceCallback(({ data }: PaymentWebhookResponse) => {
    console.log('Checkout Stepper', data.status)
    setPaymentStatus(data.status)
    updateOrderStatus({ status: data.status, mpPaymentId: data.id })
  })

  React.useEffect(() => {
    if (paymentStatus !== 'approved') {
      socket.on('update.payment', ({ data }: PaymentWebhookResponse) => {
        call({ data })
      })
    }
  }, [paymentStatus, call])

  React.useEffect(() => {
    if (paymentStatus === 'approved' && activeStep === 2) {
      setTimeout(() => handleSetActiveStep(), 2000)
    }
  }, [handleSetActiveStep, paymentStatus, activeStep])

  if (!cart?.products) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 h-[50vh] mx-6">
        <Icons.EmptyCart className="scale-75 text-dark-gray-400" />

        <p className="text-2xl text-light-gray-100 font-medium">
          Seu carrinho está vazio
        </p>
        <p className="mb-8 text-center">
          Ops, parece que seu carrinho está vazio. Vamos as compras?
        </p>

        <div className="flex flex-col-reverse sm:flex-row sm:space-x-2 max-sm:w-full">
          {!user && (
            <Button
              href="/auth"
              variant="outlined"
              className="flex-nowrap max-sm:w-full max-sm:mt-2"
              rounded
            >
              Login/Cadastro
            </Button>
          )}

          <Button
            href="/"
            variant="filled"
            className="flex-nowrap max-sm:w-full"
            rounded
          >
            Voltar para a loja
          </Button>
        </div>
      </div>
    )
  }

  return (
    <main className="w-full mt-12 flex flex-col">
      <StepperBar
        steps={steps}
        activeStep={activeStep}
        stepIcon={stepIcon}
        activeColor={
          paymentStatus === 'rejected'
            ? 'failure'
            : paymentStatus === 'pending'
            ? 'pending'
            : 'success'
        }
      />

      {activeStep === steps.length - 1 ? null : (
        <span className="flex flex-row items-center mx-8 sm:mx-16 mt-4 space-x-2">
          {activeStep >= 0 ? (
            <button
              className={c(
                activeStep === 0 && 'text-light-gray-100',
                'flex flex-row items-center hover:text-light-gray-100'
              )}
              onClick={() => setActiveStep(0)}
            >
              <TbUserCheck className="mr-2" />
              Informações
            </button>
          ) : null}

          {activeStep >= 1 ? (
            <>
              <IoIosArrowForward />
              <button
                className={c(
                  activeStep === 1 && 'text-light-gray-100',
                  'flex flex-row items-center hover:text-light-gray-100'
                )}
                onClick={() => setActiveStep(1)}
              >
                <TbTruck className="mr-2" />
                Frete
              </button>
            </>
          ) : null}

          {activeStep >= 2 ? (
            <>
              <IoIosArrowForward />
              <button
                className={c(
                  activeStep === 2 && 'text-light-gray-100',
                  'flex flex-row items-center hover:text-light-gray-100'
                )}
              >
                <TbCreditCard className="mr-2" />
                Pagamento
              </button>
            </>
          ) : null}
        </span>
      )}

      {content[activeStep + 1]}
    </main>
  )
}

export default CheckoutStepper
