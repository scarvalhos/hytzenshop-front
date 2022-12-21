import * as Input from '@components/Input'

import React from 'react'

import { CreatePaymentProps } from '@hooks/useFetchers'
import { MercadoPago } from 'react-sdk-mercadopago/lib/protocols'
import { PaymentResponseProps } from '@features/checkout/PaymentCheckoutStep/PaymentCheckoutStep'

import {
  UseFormRegister,
  Control,
  FieldValues,
  FieldErrorsImpl,
  DeepRequired,
} from 'react-hook-form'

interface MountCreditCardFormProps {
  creditCardForm: any
  totalAmount: number
  setLoading: (value: React.SetStateAction<boolean>) => void
  createPayment: (props: CreatePaymentProps) => Promise<void>
  totalQuantity: number
  handleResponse: ({ message, response }: PaymentResponseProps) => void
  mercadopago: MercadoPago | undefined
}

export const mountCreditCardForm = ({
  creditCardForm,
  //   totalAmount,
  setLoading,
  createPayment,
  totalQuantity,
  handleResponse,
  mercadopago,
}: MountCreditCardFormProps) => {
  let isMountingCreditCardForm: any

  isMountingCreditCardForm = true

  creditCardForm = mercadopago?.cardForm({
    // amount: `${totalAmount.toFixed(2)}`,
    amount: '1',
    iframe: true,
    autoMount: true,
    form: {
      id: 'form-checkout',
      cardholderName: {
        id: 'form-checkout__cardholderName',
        placeholder: 'Titular do cartão',
        style: {
          color: 'white',
        },
      },
      cardholderEmail: {
        id: 'form-checkout__cardholderEmail',
        placeholder: 'E-mail',
        style: {
          color: 'white',
        },
      },
      cardNumber: {
        id: 'form-checkout__cardNumber-container',
        placeholder: 'Número do cartão',
        style: {
          color: 'white',
        },
      },
      securityCode: {
        id: 'form-checkout__securityCode-container',
        placeholder: 'Código de segurança',
        style: {
          color: 'white',
        },
      },
      installments: {
        id: 'form-checkout__installments',
        placeholder: 'Parcelas',
        style: {
          color: 'white',
        },
      },
      expirationDate: {
        id: 'form-checkout__expirationDate-container',
        placeholder: 'Data de vencimento (MM/YYYY)',
        style: {
          color: 'white',
        },
      },
      identificationType: {
        id: 'form-checkout__identificationType',
        placeholder: 'Tipo de documento',
        style: {
          color: 'white',
        },
      },
      identificationNumber: {
        id: 'form-checkout__identificationNumber',
        placeholder: 'Número do documento',
        style: {
          color: 'white',
        },
      },
      issuer: {
        id: 'form-checkout__issuer',
        placeholder: 'Banco emissor',
        style: {
          color: 'white',
        },
      },
    },
    callbacks: {
      onFormMounted: (error: any) => {
        if (error) return console.warn('Form Mounted handling error: ', error)

        isMountingCreditCardForm = false
      },

      onSubmit: (e: any) => {
        e.preventDefault()

        setLoading(true)

        if (creditCardForm) {
          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            cardholderName,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = creditCardForm.getCardFormData()

          createPayment({
            cardFormData: {
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments || '1'),
              description: `${totalQuantity} produtos`,
              payer: {
                email,
                first_name: cardholderName,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },

              notification_url:
                'https://api.hytzen.com/api/checkout/payment/webhooks',
            },
            callback: handleResponse,
          })
        }
      },

      onFetching: (resource: any) => {
        console.warn('fetching... ', resource)

        const progressBar = document.querySelector('.progress-bar')
        progressBar?.removeAttribute('value')

        return () => {
          progressBar?.setAttribute('value', '0')
        }
      },
    },
  })

  return {
    cardForm: creditCardForm,
    isMounted: isMountingCreditCardForm,
  }
}

interface CreditPaymentFormProps {
  register: UseFormRegister<FieldValues>
  control: Control<FieldValues, unknown>
  errors: FieldErrorsImpl<DeepRequired<FieldValues>>
}

export const CreditPaymentFormSection: React.FC<CreditPaymentFormProps> =
  React.forwardRef(({ register, control, errors }, _ref) => {
    return (
      <div className="flex-1 p-8 rounded-md bg-dark-gray-500 bg-opacity-30 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input.SecureField
            id="form-checkout__cardNumber-container"
            type="number"
            label="Número do cartão:"
            control={control}
            variant="filled"
            error={String(errors?.cardholderNumber?.message || '')}
            {...register('cardholderNumber', {
              onChange: (e) => console.log(e),
            })}
            isFullWidth
          />

          <Input.SecureField
            id="form-checkout__expirationDate-container"
            type="number"
            label="Data de vencimento:"
            control={control}
            variant="filled"
            error={String(errors?.expirationDate?.message || '')}
            {...register('expirationDate')}
            isFullWidth
          />

          <Input.Field
            id="form-checkout__cardholderName"
            type="text"
            label="Nome no cartão:"
            control={control}
            variant="filled"
            isFullWidth
            error={String(errors?.cardholderName?.message || '')}
            {...register('cardholderName')}
          />

          <Input.Field
            id="form-checkout__cardholderEmail"
            type="email"
            label="E-mail:"
            control={control}
            variant="filled"
            isFullWidth
            error={String(errors?.cardholderEmail?.message || '')}
            {...register('cardholderEmail')}
          />

          <Input.SecureField
            id="form-checkout__securityCode-container"
            type="number"
            label="Código de segurança:"
            control={control}
            variant="filled"
            error={String(errors?.securityCode?.message || '')}
            {...register('securityCode')}
            isFullWidth
          />

          <div className="space-y-1">
            <label
              htmlFor="form-checkout__issuer"
              className="text-base text-white"
            >
              Banco emissor
            </label>

            <select
              id="form-checkout__issuer"
              className="w-full inline-block bg-dark-gray-500 rounded-[4px] px-3 py-3 border-none outline-none"
              {...register('issuer')}
            ></select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="form-checkout__identificationType"
              className="text-base text-white"
            >
              Tipo de documento
            </label>
            <select
              id="form-checkout__identificationType"
              className="w-full inline-block bg-dark-gray-500 rounded-[4px] px-3 py-3 border-none outline-none"
              {...register('identificationType')}
            ></select>
          </div>

          <Input.Field
            id="form-checkout__identificationNumber"
            type="number"
            // type={watch('identificationType') === 'CNPJ' ? 'cnpj' : 'cpf'}
            label="Número do documento:"
            control={control}
            isFullWidth
            error={String(errors?.identificationNumber?.message || '')}
            {...register('identificationNumber')}
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="form-checkout__installments"
            className="text-base text-white"
          >
            Parcelamento
          </label>
          <select
            id="form-checkout__installments"
            className="w-full inline-block bg-dark-gray-500 rounded-[4px] px-3 py-3 border-none outline-none"
            {...register('installments')}
          ></select>
        </div>
      </div>
    )
  })
