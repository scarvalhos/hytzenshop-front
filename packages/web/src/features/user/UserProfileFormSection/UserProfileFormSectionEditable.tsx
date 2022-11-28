import * as Input from '@components/Input'

import { FieldValues, useForm } from 'react-hook-form'
import { TbCheck, TbX } from 'react-icons/tb'
import { CepResponse } from '@utils/types'
import { useAuth } from '@contexts/AuthContext'
import { User } from '@utils/types/auth'
import { api } from '@services/apiClient'
import { c } from '@utils/helpers'

import Button from '@components/Button'
import React from 'react'

interface UserProfileFormSectionEditableProps {
  checkout?: boolean
  state: [
    {
      readonly: boolean
    },
    React.Dispatch<
      React.SetStateAction<{
        readonly: boolean
      }>
    >
  ]
}

const UserProfileFormSectionEditable: React.FC<UserProfileFormSectionEditableProps> =
  ({ state, checkout }) => {
    const { user, updateUser } = useAuth()

    const [_, dispatch] = state

    const {
      register,
      handleSubmit,
      reset,
      control,
      setValue,
      getValues,
      formState: { errors },
    } = useForm({
      defaultValues: {
        completeName: user?.profile?.completeName,
        username: user?.username,
        email: user?.email,
        cpf: user?.profile?.cpf,
        phone: user?.profile?.phone,
        birthDate: user?.profile?.birthDate,
        cep: user?.profile?.address?.cep,
        street: user?.profile?.address?.street,
        number: user?.profile?.address?.number,
        complement: user?.profile?.address?.complement,
        district: user?.profile?.address?.district,
        city: user?.profile?.address?.city,
        uf: user?.profile?.address?.uf,
        country: user?.profile?.address?.country,
      },
    })

    const handleSearchCep = React.useCallback(async () => {
      const { data } = await api.get<CepResponse>(
        `https://brasilapi.com.br/api/cep/v2/${getValues('cep')}`
      )

      setValue('city', data.city)
      setValue('district', data.neighborhood)
      setValue('street', data.street)
      setValue('uf', data.state)
    }, [getValues, setValue])

    const onSubmit = React.useCallback(
      (values: FieldValues) => {
        const newUser = {
          id: user?.id,
          profile: {
            cpf: values.cpf,
            phone: values.phone,
            birthDate: values.birthDate,
            completeName: values.completeName,
            address: {
              cep: values.cep,
              city: values.city,
              country: values.country,
              district: values.district,
              number: values.number,
              street: values.street,
              complement: values.complement,
              uf: values.uf,
            },
          },
        } as User

        updateUser(newUser)
        dispatch({ readonly: true })
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [updateUser, user]
    )

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={c(
          'grid grid-cols-1 gap-4 rounded-md px-8 py-8',
          checkout && 'bg-dark-gray-400'
        )}
      >
        <div className="flex flex-row space-x-2 items-center">
          <p className="text-xl text-light-gray-100">Dados pessoais</p>
        </div>

        <div className={c('flex flex-col')}>
          <div className={c('grid grid-cols-1 md:grid-cols-2 gap-8')}>
            <Input.Field
              type="text"
              control={control as any}
              label="Nome completo:"
              containerClassName="col-start-1 col-end-3 md:col-end-2"
              isFullWidth
              variant="outlined"
              {...register('completeName')}
            />

            <Input.Field
              type="text"
              control={control as any}
              label="Username:"
              disabled
              variant="outlined"
              containerClassName="col-start-1 col-end-3 md:col-start-2"
              isFullWidth
              {...register('username')}
            />

            <Input.Field
              type="email"
              control={control as any}
              label="E-mail:"
              disabled
              variant="outlined"
              containerClassName="col-start-1 col-end-3 md:col-end-2"
              isFullWidth
              {...register('email')}
            />

            <Input.Field
              type="cpf"
              control={control as any}
              label="CPF:"
              containerClassName="col-start-1 col-end-3 md:col-start-2"
              isFullWidth
              variant="outlined"
              {...register('cpf')}
            />

            <Input.Field
              type="cel"
              control={control as any}
              label="Celular:"
              containerClassName="col-start-1 col-end-3 md:col-end-2"
              isFullWidth
              variant="outlined"
              {...register('phone')}
            />

            <Input.Field
              type="date"
              control={control as any}
              label="Data de nascimento:"
              containerClassName="col-start-1 col-end-3 md:col-start-2"
              isFullWidth
              variant="outlined"
              {...register('birthDate')}
            />

            <Input.Cep
              label="CEP:"
              control={control as any}
              error={String(errors?.cep?.message || '')}
              containerClassName="col-start-1 col-end-3 md:col-end-2"
              isFullWidth
              variant="outlined"
              {...register('cep', { onBlur: handleSearchCep })}
            />
            <Input.Field
              type="text"
              label="Rua:"
              control={control as any}
              passthrough={{ placeholder: 'Nome da rua' }}
              error={String(errors?.street?.message || '')}
              containerClassName="col-start-1 col-end-3 md:col-start-2"
              isFullWidth
              variant="outlined"
              {...register('street')}
            />
            <Input.Field
              type="number"
              label="Número:"
              control={control as any}
              error={String(errors?.number?.message || '')}
              containerClassName="col-start-1 col-end-3 md:col-end-2"
              isFullWidth
              variant="outlined"
              {...register('number')}
            />
            <Input.Field
              type="text"
              label="Complemento: (Opcional)"
              control={control as any}
              passthrough={{ placeholder: 'Se existir...' }}
              containerClassName="col-start-1 col-end-3 md:col-start-2"
              isFullWidth
              variant="outlined"
              {...register('complement')}
            />
            <Input.Field
              type="text"
              label="Bairro:"
              control={control as any}
              passthrough={{ placeholder: 'Nome do bairro' }}
              containerClassName="col-start-1 col-end-3 md:col-end-2"
              isFullWidth
              variant="outlined"
              error={String(errors?.district?.message || '')}
              {...register('district')}
            />
            <Input.Field
              type="text"
              label="Cidade:"
              control={control as any}
              passthrough={{ placeholder: 'Nome da cidade' }}
              error={String(errors?.city?.message || '')}
              containerClassName="col-start-1 col-end-3 md:col-start-2"
              isFullWidth
              variant="outlined"
              {...register('city')}
            />
            <Input.Field
              type="text"
              label="Estado:"
              control={control as any}
              passthrough={{ placeholder: 'Nome do estado' }}
              containerClassName="col-start-1 col-end-3 md:col-end-2"
              isFullWidth
              variant="outlined"
              error={String(errors?.uf?.message || '')}
              {...register('uf')}
            />
            <Input.Field
              type="text"
              label="País:"
              control={control as any}
              passthrough={{ placeholder: 'Nome do país' }}
              error={String(errors?.country?.message || '')}
              containerClassName="col-start-1 col-end-3 md:col-start-2"
              isFullWidth
              variant="outlined"
              {...register('country')}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse max-sm:gap-4 sm:flex-row sm:space-x-2 items-center justify-end mt-6">
          <Button
            variant="outlined-danger"
            className="relative pl-12 w-full sm:w-fit font-medium text-sm"
            rounded
            onClick={() => {
              dispatch({ readonly: true })
              reset()
            }}
          >
            <span className="flex flex-row items-center">
              <TbX className="absolute left-6 w-4 h-4" /> Cancelar
            </span>
          </Button>
          <Button
            type="submit"
            variant="filled"
            className="relative pl-12 w-full sm:w-fit font-medium text-sm"
            rounded
          >
            <span className="flex flex-row items-center">
              <TbCheck className="absolute left-6 w-4 h-4" /> Salvar alterações
            </span>
          </Button>
        </div>
      </form>
    )
  }

export default UserProfileFormSectionEditable