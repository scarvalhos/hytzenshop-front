import { validateResetPasswordSchema } from '@utils/validators'
import { FieldValues, useForm } from 'react-hook-form'
import { Button, Input, toast } from '@luma/ui'
import { c, validateToken } from '@hytzenshop/helpers'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useAuth } from '@contexts/AuthContext'

import React from 'react'

interface ResetPasswordSectionProps {
  title?: string | React.ReactNode
  containerClassName?: string
}

const ResetPasswordSection: React.FC<ResetPasswordSectionProps> = ({
  title,
  containerClassName,
}) => {
  const [loading, setLoading] = React.useState(false)

  const { resetPassword } = useAuth()
  const { query, push } = useRouter()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateResetPasswordSchema),
  })

  const handleOnSubmit = React.useCallback(
    async (values: FieldValues) => {
      setLoading(true)

      const isValidToken = validateToken(query?.token as string)

      if (!isValidToken) return toast.error('Token inválido')

      const data = {
        email: query.email as string,
        password: values.password,
        token: query.token as string,
      }

      return resetPassword(data)
        .then(() => push('/auth'))
        .catch(() => setLoading(false))
    },
    [push, query.email, query.token, resetPassword]
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
          'relative bg-[url(/slider/marvel-02.jpg)] bg-cover bg-center max-md:pb-10 max-md:pt-28 px-8 md:h-full w-full flex items-center justify-center'
        )}
      >
        <span className="z-10">{title}</span>

        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75" />
      </div>

      <div className="h-full w-full flex items-center justify-center px-8 pb-10">
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className={c(
            'flex flex-col px-8 py-8 space-y-4 rounded-md bg-dark-gray-500 bg-opacity-50 w-full max-w-md'
          )}
        >
          <Input.Field
            type="email"
            label="E-mail:"
            variant="filled"
            control={control}
            isFullWidth
            error={errors?.email?.message?.toString()}
            disabled
            defaultValue={query?.email}
            {...register('email')}
          />

          <Input.Password
            name="password"
            label="Senha:"
            variant="filled"
            isFullWidth
            passthrough={{ placeholder: 'Digite sua senha' }}
            register={register}
            control={control}
            error={errors?.password?.message?.toString()}
          />

          <Input.Password
            name="cpassword"
            label="Confirme sua senha:"
            variant="filled"
            isFullWidth
            passthrough={{ placeholder: 'Confirme sua senha' }}
            register={register}
            control={control}
            error={errors?.password?.message?.toString()}
          />

          <Button
            type="submit"
            loading={loading}
            variant="filled"
            className="w-full bg-success-400"
          >
            Redefinir senha
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordSection
