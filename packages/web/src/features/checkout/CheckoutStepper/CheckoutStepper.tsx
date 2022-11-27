import { PaymentStatus, PaymentWebhookResponse } from '@utils/types'
import { useFetchers } from '@hooks/useFetchers'
import { StepperBar } from '@core'
import { CartList } from '@features/cart/CartList'
import { useAuth } from '@contexts/AuthContext'
import { socket } from '@services/socket'
import { toast } from 'react-toastify'

import {
  TbCheck,
  TbCreditCard,
  TbLogout,
  TbShoppingCart,
  TbUserCheck,
  TbX,
} from 'react-icons/tb'

import PaymentCheckoutStep from '../PaymentCheckoutStep'
import InfosCheckoutStep from '../InfosCheckoutStep'
import LoginFormSection from '@features/auth/LoginFormSection'
import React from 'react'

const CheckoutStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  const [paymentStatus, setPaymentStatus] = React.useState<PaymentStatus>()

  const { updateOrder } = useFetchers()
  const { user } = useAuth()

  const steps = React.useMemo(() => {
    return {
      true: ['Detalhes pedido', 'Informações', 'Pagamento', 'Confirmação'],
      false: ['Login/Cadastro', 'Informações', 'Pagamento', 'Confirmação'],
    }[`${!!user}`]
  }, [user])

  const handleSetActiveStep = React.useCallback(
    (payment?: PaymentStatus) => {
      if (activeStep === 1 && !user?.profile) {
        toast.warn('Complete seus dados para continuar!')
      } else {
        if (activeStep <= steps.length) {
          setActiveStep(activeStep + 1)
        }
      }

      if (payment) {
        setPaymentStatus(payment)
      }
    },
    [activeStep, steps.length, user?.profile]
  )

  const stepIcon = React.useMemo(() => {
    const icons: { [index: string]: React.ReactElement } = {
      1: user ? (
        <TbShoppingCart className="text-light-gray-100" />
      ) : (
        <TbLogout />
      ),
      2: <TbUserCheck className="text-light-gray-100" />,
      3: <TbCreditCard className="text-light-gray-100" />,
      4:
        paymentStatus === 'rejected' ? (
          <TbX className="text-light-gray-100" />
        ) : (
          <TbCheck className="text-light-gray-100" />
        ),
    }

    return icons
  }, [paymentStatus, user])

  const content: { [index: number]: React.ReactElement } = {
    1: user ? (
      <CartList
        isReadonly
        buttonClick={handleSetActiveStep}
        summaryButtonTitle="Próximo passo"
        containerClassName="my-8"
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
      <InfosCheckoutStep
        buttonClick={handleSetActiveStep}
        summaryButtonTitle="Próximo passo"
      />
    ),
    3: <PaymentCheckoutStep buttonClick={handleSetActiveStep} />,
    4: <TbCheck />,
  }

  if (paymentStatus !== 'approved') {
    socket.on('update.payment', ({ data }: PaymentWebhookResponse) => {
      setPaymentStatus(data.status)
      updateOrder(data.status, data.id)
    })
  }

  React.useEffect(() => {
    if (paymentStatus === 'approved') {
      setTimeout(() => handleSetActiveStep(paymentStatus), 2000)
    }
  }, [handleSetActiveStep, paymentStatus])

  return (
    <main className="w-full mt-12 flex flex-col">
      <StepperBar steps={steps} activeStep={activeStep} stepIcon={stepIcon} />

      {content[activeStep + 1]}
    </main>
  )
}

export default CheckoutStepper
