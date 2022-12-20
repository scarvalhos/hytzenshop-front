import {
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from '@mui/icons-material'

import { UseFormRegister, FieldValues, Control } from 'react-hook-form'
import { IconButton } from '@mui/material'
import { useState } from 'react'

import FieldInput, { SharedFieldInputProps } from '../Field'

type Password = SharedFieldInputProps & {
  name: string
  register: UseFormRegister<FieldValues>
  control?: Control<FieldValues, object>
  label?: string
  error?: string
}

const Password: React.FC<Password> = ({
  register,
  name,
  control,
  label,
  error,
  ...props
}) => {
  const [seePassword, setSeePassword] = useState<'password' | 'text'>(
    'password'
  )

  const handleSeePassword = () => {
    if (seePassword === 'password') {
      setSeePassword('text')
    }
    if (seePassword === 'text') {
      setSeePassword('password')
    }
  }

  return (
    <FieldInput
      {...props}
      {...register(name)}
      type={seePassword}
      label={label}
      control={control}
      variant="password"
      error={error}
      renderInsideInput={
        <IconButton
          sx={{ color: 'white', padding: 0 }}
          onClick={handleSeePassword}
        >
          {seePassword === 'password' ? (
            <RemoveRedEyeOutlined
              color="inherit"
              sx={{ fontSize: '1.25rem' }}
            />
          ) : (
            <VisibilityOffOutlined sx={{ fontSize: '1.25rem' }} />
          )}
        </IconButton>
      }
    />
  )
}

export default Password
