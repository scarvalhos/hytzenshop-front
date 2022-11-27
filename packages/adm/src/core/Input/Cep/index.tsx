import * as React from 'react'

import FieldInput, { MustHaveProps } from '../Field'

import { Control, FieldValues } from 'react-hook-form'

export interface CepInputProps extends MustHaveProps {
  name: string
  error?: string
  disabled?: boolean
  label?: string
  after?: React.ReactNode
  control?: Control<FieldValues, object>
  variant?: string
  accessors?: {
    rua: string
    bairro: string
    cidade: string
    estado: string
  }
}

const CepInput: React.FC<CepInputProps> = ({
  name,
  disabled,
  after,
  label = 'CEP',
  variant,
  ...props
}) => {
  return (
    <FieldInput
      name={name}
      label={label}
      type="cep"
      disabled={disabled}
      after={after}
      variant={variant}
      {...props}
    />
  )
}

export default CepInput
