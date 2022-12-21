import React from 'react'

import { UseFormRegister, FieldValues } from 'react-hook-form'
import { TbEye, TbEyeOff } from 'react-icons/tb'

import FieldInput, { FieldInputProps } from '../Field'

type Password = FieldInputProps & {
  register: UseFormRegister<FieldValues>
}

const Password: React.FC<Password> = ({
  register,
  name,
  control,
  label,
  error,
  ...props
}) => {
  const [seePassword, setSeePassword] = React.useState(false)

  const handleSeePassword = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setSeePassword(!seePassword)
    },
    [seePassword]
  )

  return (
    <FieldInput
      {...props}
      {...register(name)}
      type={seePassword ? 'text' : 'password'}
      label={label}
      control={control}
      fieldVariant="password"
      error={error}
      renderInsideInput={
        <button className="mr-3" onClick={handleSeePassword}>
          {seePassword ? (
            <TbEye color="inherit" />
          ) : (
            <TbEyeOff color="inherit" />
          )}
        </button>
      }
    />
  )
}

export default Password