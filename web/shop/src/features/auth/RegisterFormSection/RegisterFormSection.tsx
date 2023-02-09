import React from 'react'

import { validateCreateAccountSchema } from '@utils/validators'
import { FieldValues, useForm } from 'react-hook-form'
import { Button, Input } from '@luma/ui'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useAuth } from '@contexts/AuthContext'
import { c } from '@hytzenshop/helpers'

interface RegisterFormSectionProps {
  title?: string | React.ReactNode
  checkoutNextStep?: () => void
  containerClassName?: string
}

const RegisterFormSection: React.FC<RegisterFormSectionProps> = ({
  title,
  containerClassName,
}) => {
  const [loading, setLoading] = React.useState(false)

  const { createUser } = useAuth()
  const { query } = useRouter()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateCreateAccountSchema),
    mode: 'onSubmit',
  })

  const handleOnSubmit = React.useCallback(
    async (values: FieldValues) => {
      setLoading(true)

      return createUser({
        email: values.email,
        username: values.username,
        password: values.password,
        backTo: (query?.backTo as string) || undefined,
      })
        .then(() => setLoading(false))
        .catch(() => setLoading(false))
    },
    [createUser, query?.backTo]
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
          <div className="space-y-4">
            <Input.Field
              type="text"
              label="Username:"
              control={control}
              isFullWidth
              error={errors?.username?.message?.toString()}
              {...register('username')}
            />
            <Input.Field
              type="text"
              label="E-mail:"
              control={control}
              isFullWidth
              error={errors?.email?.message?.toString()}
              {...register('email')}
            />
            <Input.Password
              name="password"
              label="Senha:"
              isFullWidth
              passthrough={{ placeholder: 'Digite sua senha' }}
              register={register}
              control={control}
              error={errors?.password?.message?.toString()}
            />
            <Input.Password
              name="cpassword"
              label="Confirme sua senha:"
              isFullWidth
              passthrough={{ placeholder: 'Confirme sua senha' }}
              register={register}
              control={control}
              error={errors?.cpassword?.message?.toString()}
            />
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              loading={loading}
              variant="filled"
              className="w-full bg-success-400 mt-4"
            >
              Cadastre-se
            </Button>
            <Button
              href="/auth"
              type="button"
              className="w-full hover:underline"
            >
              Já tem uma conta?{' '}
              <strong className="text-light-gray-100">Entrar</strong>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterFormSection
