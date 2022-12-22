import React from 'react'

import { PaymentStatus, RadioValue } from '@hytzenshop/types'
import { useForm, FieldValues } from 'react-hook-form'
import { useMercadopago } from 'react-sdk-mercadopago/lib'
import { useFetchers } from '@hooks/useFetchers'
import { useCart } from '@contexts/CartContext'
import { toast } from 'react-toastify'

import {
  CreditPaymentFormSection,
  mountCreditCardForm,
} from './CreditPaymentFormSection'

import PaymentCheckoutStepLayout from '@layouts/PaymentCheckoutStepLayout'
import PaymentFormSection from './PaymentFormSection'

export interface PaymentResponseProps {
  message?: string
  response?: any
}

interface PaymentStepProps {
  checkoutNextStep: (paymentStatus?: PaymentStatus) => void
  paymentStatus?: PaymentStatus
}

export const PaymentCheckoutStep: React.FC<PaymentStepProps> = ({
  checkoutNextStep,
  paymentStatus,
}) => {
  const [loading, setLoading] = React.useState(false)
  const [radioValue, setRadioValue] = React.useState<RadioValue | ''>('')
  const [modal, setModal] = React.useState({
    pix: false,
    boleto: false,
  })

  const [paymentResponse, setPaymentResponse] = React.useState<any | null>()

  const { totalAmount, totalQuantity } = useCart()
  const { createPayment } = useFetchers()

  const {
    register,
    handleSubmit,
    control,
    watch,

    formState: { errors },
    reset,
    clearErrors,
  } = useForm()

  const mercadopago = useMercadopago.v2(
    process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY as string,
    {
      locale: 'en-US',
    }
  )

  const handleResponse = React.useCallback(
    ({ response, message }: PaymentResponseProps, method?: RadioValue) => {
      console.log(response, message)

      setLoading(false)
      setPaymentResponse(response)

      if (message) toast(message)
      if (method === 'PIX') return setModal({ pix: true, boleto: false })
      if (method === 'BOLETO') return setModal({ pix: false, boleto: true })

      return checkoutNextStep(response?.status)
    },
    [checkoutNextStep]
  )

  const paymentMethod = React.useMemo(() => {
    return {
      BOLETO: 'bolbradesco',
      PIX: 'pix',
      CREDITO: '',
      '': '',
    }[radioValue]
  }, [radioValue])

  const paymentMethodResponse = React.useMemo(() => {
    return {
      BOLETO: (props: PaymentResponseProps) => handleResponse(props, 'BOLETO'),
      PIX: (props: PaymentResponseProps) => handleResponse(props, 'PIX'),
      CREDITO: handleResponse,
      '': () => '',
    }[radioValue]
  }, [handleResponse, radioValue])

  const onPaymentSubmit = React.useCallback(
    (values: FieldValues) => {
      createPayment({
        cardFormData: {
          payment_method_id: paymentMethod,
          //   transaction_amount: Number(totalAmount.toFixed(2)),
          transaction_amount: 0.1,
          description: `${totalQuantity} produtos`,
          payer: {
            email: values.email,
            first_name: values.payerFirstName,
            last_name: values.payerLastName,
            identification: {
              type: values.identificationType,
              number: values.identificationNumber,
            },
          },
          notification_url:
            'https://api.hytzen.com/api/checkout/payment/webhooks',
        },
        callback: paymentMethodResponse,
      })
    },

    [createPayment, paymentMethod, paymentMethodResponse, totalQuantity]
  )

  React.useLayoutEffect(() => {
    if (!radioValue) return

    let creditCardForm: any

    if (creditCardForm) {
      creditCardForm.unmount()
    }

    const paymentMethod = {
      CREDITO: () => {
        clearErrors()
        reset()

        new Promise((resolve) => {
          setTimeout(() => {
            const { cardForm, isMounted } = mountCreditCardForm({
              mercadopago,
              creditCardForm,
              createPayment,
              handleResponse,
              setLoading,
              totalAmount,
              totalQuantity,
            })

            creditCardForm = cardForm
            resolve(isMounted)
          }, 1500)
        })
      },
      BOLETO: () => {
        reset()
        clearErrors()
      },
      PIX: () => {
        reset()
        clearErrors()
      },
    }[radioValue]

    paymentMethod()

    return () => {
      if (creditCardForm) {
        creditCardForm.unmount()
      }
    }
  }, [
    clearErrors,
    createPayment,
    handleResponse,
    mercadopago,
    radioValue,
    reset,
    totalAmount,
    totalQuantity,
  ])

  return (
    <PaymentCheckoutStepLayout
      loading={loading}
      radioValue={radioValue}
      setRadioValue={setRadioValue}
      handleSubmit={handleSubmit(onPaymentSubmit)}
    >
      {radioValue === 'CREDITO' && (
        <CreditPaymentFormSection
          control={control}
          register={register}
          errors={errors}
        />
      )}

      {(radioValue === 'BOLETO' || radioValue === 'PIX') && (
        <PaymentFormSection
          radioValue={radioValue}
          control={control}
          openModal={modal}
          paymentResponse={paymentResponse}
          register={register}
          setOpenModal={(openModal) => {
            setModal(openModal)
            checkoutNextStep(paymentResponse?.status as PaymentStatus)
          }}
          watch={watch}
          errors={errors}
          paymentStatus={paymentStatus}
        />
      )}
    </PaymentCheckoutStepLayout>
  )
}

export default PaymentCheckoutStep
