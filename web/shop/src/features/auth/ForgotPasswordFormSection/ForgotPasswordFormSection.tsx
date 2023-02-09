import * as yup from 'yup'

import { FieldValues, useForm } from 'react-hook-form'
import { Button, Input } from '@luma/ui'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '@contexts/AuthContext'
import { c } from '@hytzenshop/helpers'

import React from 'react'

interface ForgotPasswordSectionProps {
  title?: string | React.ReactNode
  containerClassName?: string
}

export const validate = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email(),
})

const ForgotPasswordSection: React.FC<ForgotPasswordSectionProps> = ({
  title,
  containerClassName,
}) => {
  const [loading, setLoading] = React.useState(false)

  const { forgotPassword } = useAuth()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validate),
  })

  const handleOnSubmit = React.useCallback(
    async (values: FieldValues) => {
      setLoading(true)

      return forgotPassword(values.email).finally(() => setLoading(false))
    },
    [forgotPassword]
  )

  return (
    <div
      className={c(
        'flex md:flex-row md:items-center md:justify-center flex-col items-start gap-8',
        containerClassName
      )}
    >
      <div
        className={c(
          'max-md:pb-10 max-md:pt-28 px-8 md:h-full w-full flex items-center justify-end'
        )}
      >
        <span className="z-10">{title}</span>
      </div>

      <div className="h-full w-full flex items-center justify-start px-8">
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className={c(
            'flex flex-col px-8 py-8 space-y-4 rounded-md bg-primary w-full max-w-md'
          )}
        >
          <Input.Field
            type="email"
            label="E-mail:"
            variant="filled"
            control={control}
            isFullWidth
            error={errors?.email?.message?.toString()}
            {...register('email')}
          />

          <Button
            type="submit"
            loading={loading}
            variant="filled"
            className="w-full bg-success-400"
          >
            Confirmar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordSection
