import * as Checkbox from '@radix-ui/react-checkbox'

import { DivideY, Button, Input, Icons, toast } from '@luma/ui'
import { FieldValues, useForm } from 'react-hook-form'
import { validateLoginSchema } from '@utils/validators'
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
  bgClassName?: string
}

const LoginFormSection: React.FC<LoginFormSectionProps> = ({
  title,
  checkoutNextStep,
  containerClassName,
  bgClassName,
}) => {
  const [stayConnectedChecked, setStayConnectedChecked] = React.useState(true)
  const [loading, setLoading] = React.useState(false)

  const { signIn } = useAuth()
  const { query } = useRouter()

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
        'flex md:flex-row md:items-center md:justify-center flex-col items-start gap-8',
        containerClassName
      )}
    >
      <div
        className={c(
          'relative bg-[url(/slider/marvel-02.jpg)] bg-cover bg-center max-md:pb-10 max-md:pt-28 px-8 md:h-full w-full flex items-center justify-center',
          bgClassName
        )}
      >
        <span className="z-10">{title}</span>

        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75" />
      </div>

      <div className="h-full w-full flex items-center justify-center px-8 pb-10">
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
              variant="filled"
              control={control}
              isFullWidth
              placeholder="johndoe"
              error={errors?.username?.message?.toString()}
              {...register('username')}
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

            <Button href="/auth/forgot-password" className="p-0 text-right">
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
                <strong className="text-primary">Cadastre-se</strong>
              </Button>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => toast.warn('Em desenvolvimento')}
                variant="filled"
                className="w-full bg-light-gray-200 shadow-md dark:shadow-none dark:bg-light-gray-100 text-dark-gray-500"
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
    </div>
  )
}

export default LoginFormSection
