import { PaymentStatus, PaymentWebhookResponse } from '@utils/types'

// import { PaymentStep } from '@features/checkout/PaymentStep'
// import { InfosStep } from '@features/checkout/InfosStep'

import { useFetchers } from '@hooks/useFetchers'
import { StepperBar } from '@core'
import { CartList } from '@features/cart/CartList'
import { useAuth } from '@contexts/AuthContext'
import { socket } from '@services/socket'
import { toast } from 'react-toastify'

import {
  // TbShoppingCart,
  // TbUserCheck,
  // TbCreditCard,
  // TbLogout,
  // TbX,
  TbCheck,
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

  const steps = {
    true: ['Detalhes do pedido', 'Informações', 'Pagamento', 'Confirmação'],
    false: [
      'Faça login/Cadastre-se',
      'Informações',
      'Pagamento',
      'Confirmação',
    ],
  }[`${!!user}`]

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

  // const stepIcon = React.useCallback(
  //   (props: StepIconProps) => {
  //     const { active, completed, className } = props

  //     const icons: { [index: string]: React.ReactElement } = {
  //       1: user ? <TbShoppingCart /> : <TbLogout />,
  //       2: <TbUserCheck />,
  //       3: <TbCreditCard />,
  //       4: paymentStatus === 'rejected' ? <TbX /> : <TbCheck />,
  //     }

  //     return (
  //       <ColorlibStepIconRoot
  //         ownerState={{ completed, active }}
  //         className={className}
  //         paymentStatus={paymentStatus}
  //       >
  //         {icons[String(props.icon)]}
  //       </ColorlibStepIconRoot>
  //     )
  //   },
  //   [paymentStatus, user]
  // )

  // const mobileStepIcon = React.useCallback(
  //   (props: StepIconProps) => {
  //     const { active, completed, className } = props

  //     const icons: { [index: string]: React.ReactElement } = {
  //       1: user ? <TbShoppingCart /> : <TbLogout />,
  //       2: <TbUserCheck />,
  //       3: <TbCreditCard />,
  //       4: paymentStatus === 'rejected' ? <TbX /> : <TbCheck />,
  //     }

  //     return (
  //       <ColorlibStepIconRoot
  //         ownerState={{ completed, active }}
  //         className={className}
  //         paymentStatus={paymentStatus}
  //         sx={{ width: 60, height: 60 }}
  //       >
  //         {icons[String(props.icon)]}
  //       </ColorlibStepIconRoot>
  //     )
  //   },
  //   [paymentStatus, user]
  // )

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
      <StepperBar steps={steps} activeStep={activeStep} />

      {content[activeStep + 1]}
    </main>
  )
}

export default CheckoutStepper
