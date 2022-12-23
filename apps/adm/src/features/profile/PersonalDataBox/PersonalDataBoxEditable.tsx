import * as Input from '@core/Input'
import * as React from 'react'

import { ContentEditable, ContentEditableWrapper } from './styles'
import { validatePersonalDataSchema } from '@utils/validators'
import { FieldValues, useForm } from 'react-hook-form'
import { CepResponse, User } from '@hytzenshop/types'
import { Modal, Stack } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '@hooks/useAuth'
import { Button } from '@core/Button'
import { api } from '@services/api'

interface AdressBoxEditableProps {
  openModal: boolean
  handleCloseModal: () => void
}

export const PersonalDataBoxEditable: React.FC<AdressBoxEditableProps> = ({
  openModal,
  handleCloseModal,
}) => {
  const { updateUser, user } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validatePersonalDataSchema),
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

  const handleOnSubmit = React.useCallback(
    (values: FieldValues) => {
      const newUser = {
        id: user?.id,
        profile: {
          avatar: values.avatar,
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
      handleCloseModal()
    },
    [handleCloseModal, updateUser, user?.id]
  )

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ContentEditable onSubmit={handleSubmit(handleOnSubmit)}>
        <ContentEditableWrapper>
          <Input.Field
            type="text"
            label="Nome completo:"
            control={control}
            defaultValue={user?.profile?.completeName}
            error={String(errors?.completeName?.message || '')}
            {...register('completeName')}
          />
          <Input.Field
            type="cpf"
            label="CPF:"
            control={control}
            defaultValue={user?.profile?.cpf}
            error={String(errors?.cpf?.message || '')}
            {...register('cpf')}
          />
          <Input.Field
            type="cel"
            label="Celular:"
            control={control}
            defaultValue={user?.profile?.phone}
            error={String(errors?.phone?.message || '')}
            {...register('phone')}
          />
          <Input.Field
            type="date"
            label="Data de nascimento:"
            control={control}
            defaultValue={user?.profile?.birthDate}
            error={String(errors?.birthDate?.message || '')}
            {...register('birthDate')}
          />

          <Input.Cep
            label="CEP:"
            control={control}
            defaultValue={user?.profile?.address?.cep}
            error={String(errors?.cep?.message || '')}
            {...register('cep', { onBlur: handleSearchCep })}
          />
          <Input.Field
            type="text"
            label="Rua:"
            control={control}
            defaultValue={user?.profile?.address?.street}
            passthrough={{ placeholder: 'Nome da rua' }}
            error={String(errors?.street?.message || '')}
            {...register('street')}
          />
          <Input.Field
            type="number"
            label="Número:"
            control={control}
            defaultValue={user?.profile?.address?.number}
            error={String(errors?.number?.message || '')}
            {...register('number')}
          />
          <Input.Field
            type="text"
            label="Complemento: (Opcional)"
            control={control}
            defaultValue={user?.profile?.address?.complement}
            passthrough={{ placeholder: 'Se existir...' }}
            {...register('complement')}
          />
          <Input.Field
            type="text"
            label="Bairro:"
            control={control}
            defaultValue={user?.profile?.address?.district}
            passthrough={{ placeholder: 'Nome do bairro' }}
            error={String(errors?.district?.message || '')}
            {...register('district')}
          />
          <Input.Field
            type="text"
            label="Cidade:"
            control={control}
            defaultValue={user?.profile?.address?.city}
            passthrough={{ placeholder: 'Nome da cidade' }}
            error={String(errors?.city?.message || '')}
            {...register('city')}
          />
          <Input.Field
            type="text"
            label="Estado:"
            control={control}
            defaultValue={user?.profile?.address?.uf}
            passthrough={{ placeholder: 'Nome do estado' }}
            error={String(errors?.uf?.message || '')}
            {...register('uf')}
          />
          <Input.Field
            type="text"
            label="País:"
            control={control}
            defaultValue={user?.profile?.address?.country}
            passthrough={{ placeholder: 'Nome do país' }}
            error={String(errors?.country?.message || '')}
            {...register('country')}
          />
        </ContentEditableWrapper>
        <Stack direction="row" marginTop={4} spacing={2} paddingX={4}>
          <Button
            title="Cancelar"
            type="button"
            variant="outlined"
            onClick={() => {
              handleCloseModal()
              reset()
            }}
          />

          <Button title="Salvar" type="submit" variant="contained" />
        </Stack>
      </ContentEditable>
    </Modal>
  )
}
