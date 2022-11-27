import React from 'react'

import { useForm, FieldValues } from 'react-hook-form'
import { useMercadopago } from 'react-sdk-mercadopago/lib'
import { PaymentStatus } from '@utils/types'
import { useFetchers } from '@hooks/useFetchers'
import { RadioValue } from '@utils/etc'
import { useCart } from '@contexts/CartContext'

import {
  CreditPaymentFormSection,
  mountCreditCardForm,
} from './CreditPaymentFormSection'

import PaymentCheckoutStepLayout from '@layouts/PaymentCheckoutStepLayout'
import PaymentFormSection from './PaymentFormSection'

export interface DataProps {
  status: string | number
  message?: string
}

interface PixResponseProps {
  status?: string | number
  message?: string

  qr_code_base64: string
  qr_code: string
}

interface PaymentStepProps {
  buttonClick: (paymentStatus?: PaymentStatus) => void
}

export const PaymentCheckoutStep: React.FC<PaymentStepProps> = ({
  buttonClick,
}) => {
  const [loading, setLoading] = React.useState(false)

  const [radioValue, setRadioValue] = React.useState<RadioValue | ''>('')

  const [openPixModal, setOpenPixModal] = React.useState(false)
  const [qrCode, setQrCode] = React.useState('')
  const [qrCodeBase, setQrCodeBase] = React.useState('')

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

  const handleResponse = React.useCallback(({ message, status }: DataProps) => {
    const paymentStatus: PaymentStatus =
      status === 400 ? 'rejected' : 'approved'
    console.log(message)
    console.log(status)
    setLoading(false)
    buttonClick(paymentStatus)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePixResponse = React.useCallback(
    ({ qr_code, qr_code_base64, message, status }: PixResponseProps) => {
      console.log(message)
      console.log(status)
      setQrCode(qr_code)
      setQrCodeBase(qr_code_base64)

      setLoading(false)
      setOpenPixModal(true)
    },
    []
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
      BOLETO: handleResponse,
      PIX: handlePixResponse,
      CREDITO: handleResponse,
      '': () => '',
    }[radioValue]
  }, [handlePixResponse, handleResponse, radioValue])

  const onPaymentSubmit = React.useCallback(
    (values: FieldValues) => {
      createPayment({
        cardFormData: {
          payment_method_id: paymentMethod,
          transaction_amount: Number(totalAmount.toFixed(2)),
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
            'https://hytzen-shop-api.herokuapp.com/api/checkout/payment/webhooks',
        },
        callback: paymentMethodResponse,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paymentMethod, totalAmount, totalQuantity]
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
  }, [radioValue, totalAmount, totalQuantity])

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
          handleResponse={handleResponse}
          control={control}
          openPixModal={openPixModal}
          qrCode={qrCode}
          qrCodeBase={qrCodeBase}
          register={register}
          setOpenPixModal={setOpenPixModal}
          watch={watch}
          errors={errors}
        />
      )}
    </PaymentCheckoutStepLayout>
  )
}

export default PaymentCheckoutStep
