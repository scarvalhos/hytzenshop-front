import Button from '@components/Button'
import React from 'react'

import { FieldValues, useForm } from 'react-hook-form'
import { Password, Field } from '@components/Input'
import { useBreakpoint } from '@hytzenshop/hooks'
import { useAuth } from '@contexts/AuthContext'
import { DivideY } from '@luma/ui'
import { Image } from '@core'
import { c } from '@hytzenshop/helpers'

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
  const [loading, setLoading] = React.useState(false)

  const { signIn } = useAuth()
  const { md } = useBreakpoint()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleOnSubmit = React.useCallback(
    async (values: FieldValues) => {
      setLoading(true)

      const data = {
        username: values.username,
        password: values.password,
        stayConnected: values.stayConnected,
        checkoutNextStep,
      }

      await signIn(data)
        .then(() => setLoading(false))
        .catch(() => setLoading(false))
    },
    [checkoutNextStep, signIn]
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
          <Field
            type="text"
            label="Username:"
            control={control}
            isFullWidth
            error={errors?.username?.message?.toString()}
            {...register('username')}
          />
          <Password
            name="password"
            label="Senha:"
            isFullWidth
            passthrough={{ placeholder: 'Digite sua senha' }}
            register={register}
            control={control}
            error={errors?.password?.message?.toString()}
          />
        </div>

        <div className="flex flex-row justify-end">
          {/* <FormControlLabel
            label="Manter conectado"
            {...register('stayConnected')}
            control={
              <Checkbox
                sx={{
                  color: theme.palette.text.primary,
                  padding: 0,
                  marginRight: 1,

                  '&.Mui-checked': { color: '#4eff75' },
                  '& .MuiSvgIcon-root': { fontSize: 18 },
                }}
              />
            }
            sx={{
              color: theme.palette.text.primary,
              background: theme.palette.secondary.dark,
              margin: 0,
              '& .MuiFormControlLabel-label': { fontSize: '0.8rem' },
            }}
          /> */}

          <Button href="/auth/reset-password" className="p-0 text-sm">
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
                  ? '/auth/register?backToCheckout=true'
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
              type="submit"
              loading={loading}
              variant="filled"
              className="w-full bg-white text-dark-gray-500"
            >
              <span className="flex flex-row items-center">
                <Image
                  src="/icons/google.png"
                  alt="Google"
                  className="w-6 h-6 mr-2"
                />
                Entrar com Google
              </span>
            </Button>
            <Button
              type="submit"
              loading={loading}
              variant="filled"
              className="w-full bg-primary-400"
            >
              <span className="flex flex-row items-center">
                <Image
                  src="/icons/facebook.png"
                  alt="Google"
                  className="w-6 h-6 mr-2"
                />
                Entrar com Facebook
              </span>
            </Button>
          </div>
        </DivideY>
      </form>
    </div>
  )
}

export default LoginFormSection
