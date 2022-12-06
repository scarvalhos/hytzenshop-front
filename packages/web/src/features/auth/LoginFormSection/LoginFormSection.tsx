import Button from '@components/Button'
import React from 'react'

import { FieldValues, useForm } from 'react-hook-form'
import { Password, Field } from '@components/Input'
import { useBreakpoint } from '@hooks/useBreakpoint'
import { useAuth } from '@contexts/AuthContext'
import { c } from '@utils/helpers'

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
          'flex flex-col px-8 py-8 space-y-4 rounded-md bg-dark-gray-400',
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

        <div className="space-y-4">
          <Button
            type="submit"
            loading={loading}
            variant="filled"
            className="w-full"
          >
            Entrar
          </Button>
          <Button
            href="/auth/register"
            type="button"
            variant="outlined"
            className="w-full"
          >
            Registre-se!
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginFormSection
