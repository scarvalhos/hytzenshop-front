import React from 'react'

import { validateCreateAccountSchema } from '@utils/validators'
import { FieldValues, useForm } from 'react-hook-form'
import { useBreakpoint } from '@hytzenshop/hooks'
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

  const { query, push } = useRouter()
  const { createUser } = useAuth()
  const { md } = useBreakpoint()

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
      })
        .then(() => {
          setLoading(false)
          if (query.backTo && typeof query.backTo === 'string')
            push(query.backTo)
        })
        .catch(() => setLoading(false))
    },
    [createUser, push, query.backTo]
  )

  return (
    <div
      className={c(
        'flex',
        md
          ? 'flex-row items-center justify-center'
          : 'flex-col items-start justify-center',
        containerClassName
      )}
    >
      <div className={c(md ? 'mr-20' : 'mr-0 mb-6')}>
        <p className={c(md ? 'text-5xl' : 'text-3xl', 'text-light-gray-100')}>
          {title}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className={c(
          'flex flex-col px-8 py-8 space-y-4 rounded-md bg-dark-gray-500 bg-opacity-30',
          md ? 'w-[420px]' : 'w-[100%]'
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
          <Button href="/auth" type="button" className="w-full hover:underline">
            Já tem uma conta?{' '}
            <strong className="text-light-gray-100">Entrar</strong>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterFormSection
