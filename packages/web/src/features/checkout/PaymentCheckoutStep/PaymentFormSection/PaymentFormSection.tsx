import * as Input from '@components/Input'

import { RadioValue } from '@utils/etc'

import {
  UseFormRegister,
  FieldValues,
  Control,
  UseFormWatch,
  FieldErrorsImpl,
  DeepRequired,
} from 'react-hook-form'

import PixModal from '@components/Modal/PixModal'
import React from 'react'

interface DataProps {
  status: string | number
  message?: string
}

interface PaymentFormProps {
  radioValue: RadioValue
  openPixModal: boolean
  qrCodeBase: string
  qrCode: string
  register: UseFormRegister<FieldValues>
  control: Control<FieldValues, unknown>
  watch: UseFormWatch<FieldValues>
  handleResponse: ({ message, status }: DataProps) => void
  setOpenPixModal: React.Dispatch<React.SetStateAction<boolean>>
  errors: FieldErrorsImpl<DeepRequired<FieldValues>>
}

const PaymentFormSection: React.FC<PaymentFormProps> = React.forwardRef(
  (
    {
      register,
      control,
      qrCodeBase,
      qrCode,
      openPixModal,
      setOpenPixModal,
      errors,
      watch,
    },
    _ref
  ) => {
    const options = [
      { value: 'CPF', label: 'CPF' },
      { value: 'CNPJ', label: 'CNPJ' },
    ]

    return (
      <>
        {openPixModal && (
          <PixModal
            open={openPixModal}
            qr_code_base64={qrCodeBase}
            qr_code={qrCode}
            onClose={() => setOpenPixModal(false)}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-8 bg-dark-gray-400 rounded-md">
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
              className="w-full inline-block bg-dark-gray-300 rounded-[4px] px-3 py-3 border-none outline-none"
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
