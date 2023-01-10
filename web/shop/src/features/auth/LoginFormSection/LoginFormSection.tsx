import * as Checkbox from '@radix-ui/react-checkbox'

import { DivideY, Button, Input, Icons, toast } from '@luma/ui'
import { FieldValues, useForm } from 'react-hook-form'
import { validateLoginSchema } from '@utils/validators'
import { useBreakpoint } from '@hytzenshop/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { CheckIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'
import { useAuth } from '@contexts/AuthContext'
import { c } from '@hytzenshop/helpers'

import React from 'react'

interface LoginFormSectionProps {
  title?: string | React.ReactNode
  checkoutNextStep?: () => void
  containerClassName?: string
}

const LoginFormSection: React.FC<LoginFormSectionProps> = ({
  title,
  checkoutNextStep,
  containerClassName,
}) => {
  const [stayConnectedChecked, setStayConnectedChecked] = React.useState(true)
  const [loading, setLoading] = React.useState(false)

  const { signIn } = useAuth()
  const { query } = useRouter()
  const { md } = useBreakpoint()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateLoginSchema),
  })

  const handleOnSubmit = React.useCallback(
    async (values: FieldValues) => {
      setLoading(true)

      const data = {
        username: values.username,
        password: values.password,
        stayConnected: stayConnectedChecked,
        checkoutNextStep,
        backTo: (query?.backTo as string) || undefined,
      }

      return signIn(data)
        .then(() => setLoading(false))
        .catch(() => setLoading(false))
    },
    [checkoutNextStep, query?.backTo, signIn, stayConnectedChecked]
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
          'flex flex-col px-8 py-8 space-y-4 rounded-md bg-dark-gray-500 bg-opacity-50',
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
          <Input.Password
            name="password"
            label="Senha:"
            isFullWidth
            passthrough={{ placeholder: 'Digite sua senha' }}
            register={register}
            control={control}
            error={errors?.password?.message?.toString()}
          />
        </div>

        <div className="flex flex-row justify-between pb-2">
          <span className="flex items-center space-x-2">
            <Checkbox.Root
              id="stayConnected"
              {...register('stayConnected')}
              className="bg-white w-4 h-4 rounded-sm flex items-center justify-center drop-shadow-sm"
              checked={stayConnectedChecked}
              onClick={() => setStayConnectedChecked(!stayConnectedChecked)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setStayConnectedChecked(!stayConnectedChecked)
                }
              }}
            >
              <Checkbox.Indicator className="CheckboxIndicator">
                <CheckIcon className="w-4 h-4 text-dark-gray-300" />
              </Checkbox.Indicator>
            </Checkbox.Root>

            <label
              className="cursor-pointer"
              onClick={() => setStayConnectedChecked(!stayConnectedChecked)}
            >
              Manter conectado
            </label>
          </span>

          <Button href="/auth/reset-password" className="p-0 text-right">
            Esqueci minha senha
          </Button>
        </div>

        <DivideY dividerClassName="my-8">
          <div className="space-y-4">
            <Button
              type="submit"
              loading={loading}
              variant="filled"
              className="w-full bg-success-400"
            >
              Entrar
            </Button>
            <Button
              href={
                checkoutNextStep
                  ? `/auth/register?backTo=${encodeURI('/checkout/payment')}`
                  : '/auth/register'
              }
              type="button"
              className="w-full hover:underline pb-0"
            >
              Não tem uma conta?{' '}
              <strong className="text-light-gray-100">Cadastre-se</strong>
            </Button>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => toast.warn('Em desenvolvimento')}
              variant="filled"
              className="w-full bg-white text-dark-gray-500"
            >
              <span className="flex flex-row items-center space-x-2">
                <Icons.GoogleIcon className="w-6 h-6" />
                <p>Entrar com Google</p>
              </span>
            </Button>
            <Button
              onClick={() => toast.warn('Em desenvolvimento')}
              variant="filled"
              className="w-full bg-primary-400"
            >
              <span className="flex flex-row items-center space-x-2">
                <Icons.FacebookIcon className="w-6 h-6 text-light-gray-100" />
                <p>Entrar com Facebook</p>
              </span>
            </Button>
          </div>
        </DivideY>
      </form>
    </div>
  )
}

export default LoginFormSection
