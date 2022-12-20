import * as Input from '@components/Input'

import { RadioValue } from '@hytzenshop/types'

import {
  UseFormRegister,
  FieldValues,
  Control,
  UseFormWatch,
  FieldErrorsImpl,
  DeepRequired,
} from 'react-hook-form'

import BoletoModal from '@components/Modal/BoletoModal'
import PixModal from '@components/Modal/PixModal'
import React from 'react'

interface PaymentFormProps {
  radioValue: RadioValue
  openModal: {
    pix: boolean
    boleto: boolean
  }
  register: UseFormRegister<FieldValues>
  control: Control<FieldValues, unknown>
  watch: UseFormWatch<FieldValues>
  paymentResponse: any
  setOpenModal: (
    value: React.SetStateAction<{
      pix: boolean
      boleto: boolean
    }>
  ) => void
  errors: FieldErrorsImpl<DeepRequired<FieldValues>>
}

const options = [
  { value: 'CPF', label: 'CPF' },
  { value: 'CNPJ', label: 'CNPJ' },
]

const PaymentFormSection: React.FC<PaymentFormProps> = React.forwardRef(
  (
    {
      register,
      control,
      paymentResponse,
      openModal,
      setOpenModal,
      errors,
      watch,
    },
    _ref
  ) => {
    return (
      <>
        {openModal.pix && (
          <PixModal
            open={openModal.pix}
            onClose={() => setOpenModal({ boleto: false, pix: false })}
            paymentResponse={paymentResponse}
          />
        )}

        {openModal.boleto && (
          <BoletoModal
            open={openModal.boleto}
            onClose={() => setOpenModal({ boleto: false, pix: false })}
            response={paymentResponse}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-8 bg-dark-gray-500 bg-opacity-30 rounded-md">
          <Input.Field
            type="text"
            label="Nome:"
            control={control}
            isFullWidth
            containerClassName="col-start-1 col-end-3 sm:col-end-2"
            error={String(errors?.payerFirstName?.message || '')}
            {...register('payerFirstName')}
          />

          <Input.Field
            type="text"
            label="Sobrenome:"
            control={control}
            isFullWidth
            containerClassName="col-start-1 col-end-3 sm:col-start-2"
            error={String(errors?.payerLastName?.message || '')}
            {...register('payerLastName')}
          />

          <Input.Field
            type="email"
            label="E-mail:"
            control={control}
            isFullWidth
            containerClassName="col-start-1 col-end-3 sm:col-end-2"
            error={String(errors?.email?.message || '')}
            {...register('email')}
          />

          <div className="col-start-1 col-end-3 sm:col-start-2 space-y-1">
            <label
              htmlFor="identificationType"
              className="text-base text-white"
            >
              Tipo de documento
            </label>

            <select
              className="w-full inline-block bg-dark-gray-500 rounded-[4px] px-3 py-3 border-none outline-none"
              {...register('identificationType')}
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <Input.Field
            type={watch('identificationType') === 'CNPJ' ? 'cnpj' : 'cpf'}
            label="Número do documento"
            control={control}
            isFullWidth
            error={String(errors?.identificationNumber?.message || '')}
            containerClassName="col-start-1 col-end-3"
            {...register('identificationNumber')}
          />
        </div>
      </>
    )
  }
)

export default PaymentFormSection
