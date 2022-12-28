import * as React from 'react'

import FieldInput, { FieldInputProps } from '../Field'

type CepInputProps = FieldInputProps & {
  accessors?: {
    rua: string
    bairro: string
    cidade: string
    estado: string
  }
}

const CepInput: React.FC<CepInputProps> = React.forwardRef(
  (
    { name, disabled, renderAfter, label = 'CEP', variant, rounded, ...props },
    _ref
  ) => {
    return (
      <FieldInput
        name={name}
        label={label}
        type="cep"
        disabled={disabled}
        renderAfter={renderAfter}
        variant={variant}
        rounded={rounded}
        {...props}
      />
    )
  }
)

export default CepInput
