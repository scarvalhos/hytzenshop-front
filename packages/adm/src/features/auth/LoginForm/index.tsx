import { Stack, FormControlLabel, Checkbox, useTheme } from '@mui/material'
import { Container, Form, Register } from '@styles/page/Login'
import { FieldValues, useForm } from 'react-hook-form'
import { validateLoginSchema } from '@utils/validators'
import { Password, Field } from '@core/Input'
import { AuthContext } from '@contexts/AuthContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@core/Button'
import { Link } from '@core/Link'

export const LoginForm: React.FC = () => {
  const { signIn } = useContext(AuthContext)
  const { push } = useRouter()

  const theme = useTheme()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateLoginSchema),
  })

  async function handleOnSubmit(values: FieldValues) {
    const data = {
      username: values.username,
      password: values.password,
      stayConnected: values.stayConnected,
    }

    await signIn(data)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleOnSubmit)}>
        <Stack spacing={1}>
          <Field
            type="text"
            label="Username:"
            control={control}
            error={String(errors?.username?.message || '')}
            {...register('username')}
          />
          <Password
            label="Senha:"
            register={register}
            control={control}
            passthrough={{ placeholder: 'Digite sua senha' }}
            error={String(errors?.password?.message || '')}
            {...register('password')}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between" marginBottom={2}>
          <FormControlLabel
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
          />

          <Link href="/auth/reset-password" passHref>
            <Register onClick={() => push('/auth/register')}>
              Esqueci minha senha
            </Register>
          </Link>
        </Stack>
        <Stack spacing={1}>
          <Button title="Entrar" type="submit" variant="contained" />
        </Stack>
      </Form>
    </Container>
  )
}
