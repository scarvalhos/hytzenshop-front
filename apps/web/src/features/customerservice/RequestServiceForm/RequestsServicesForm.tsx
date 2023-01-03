import * as yup from 'yup'

import { Button, Input, toast } from '@luma/ui'
import { c, defaultToastError } from '@hytzenshop/helpers'
import { FieldValues, useForm } from 'react-hook-form'
import { Chat, ChatGetDto } from '@hytzenshop/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '@hytzenshop/services'

import React from 'react'

const validate = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  phone: yup.string().required('Celular é obrigatório'),
  subjectOption: yup.string().required('Assunto é obrigatório'),
  subject: yup.string(),
  description: yup.string().required('Descrição é obrigatório'),
})

const createMessage = async (payload: Partial<Chat>) => {
  return api
    .post<ChatGetDto>('/customerservice/chat', payload)
    .then(({ data }) => data)
}

const RequestServiceForm: React.FC = () => {
  const [fetching, setFetching] = React.useState(false)

  const queryClient = useQueryClient()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
    reset,
  } = useForm({
    resolver: yupResolver(validate),
  })

  const createMessageMutation = useMutation(createMessage, {
    onSuccess: (data) => {
      setFetching(false)
      toast.success(data.message)
      queryClient.invalidateQueries(['requests-services'])
      reset({
        email: '',
        phone: '',
        description: '',
        subject: '',
        subjectOptions: null,
      })
    },
    onError: defaultToastError,
  }).mutateAsync

  const onSubmit = React.useCallback((values: FieldValues) => {
    setFetching(true)

    const payload = {
      email: values.email,
      phone: values.phone,
      description: values.description,
      subject:
        values.subjectOption === 'outro'
          ? values.subject
          : values.subjectOption,
    }

    return createMessageMutation(payload)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-6 rounded-md w-full">
      <div className="mb-8 space-y-4">
        <h2 className="text-light-gray-100 text-2xl font-semibold">
          Entre em contato:
        </h2>

        <p>
          Envie abaixo suas dúvidas e/ou feedbacks. Entraremos em contato em até
          24h.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input.Field
          type="email"
          label="E-mail"
          control={control}
          containerClassName="col-start-1 col-end-3 sm:col-end-2"
          error={String(errors.email?.message || '')}
          isFullWidth
          variant="outlined"
          {...register('email')}
        />

        <Input.Field
          type="cel"
          label="Celular"
          control={control}
          {...register('phone')}
          containerClassName="col-start-1 col-end-3 sm:col-start-2"
          error={String(errors.phone?.message || '')}
          isFullWidth
          variant="outlined"
        />

        <Input.Select.Default
          label="Assunto"
          isFullWidth
          variant="outlined"
          placeholder="Escolha um assunto"
          containerClassName="col-start-1 col-end-3"
          control={control}
          setValue={setValue}
          clearErrors={clearErrors}
          options={[
            { label: 'Feedback', value: 'feedback' },
            { label: 'Devolução', value: 'devolucao' },
            { label: 'Outro', value: 'outro' },
          ]}
          error={String(errors.subjectOption?.message || '')}
          {...register('subjectOption')}
        />

        <Input.Field
          type="text"
          placeholder="Digite o assunto da mensagem"
          control={control}
          containerClassName={c(
            'col-start-1 col-end-3',
            watch('subjectOption') !== 'outro' && 'hidden'
          )}
          error={String(errors.subject?.message || '')}
          {...register('subject')}
          isFullWidth
          variant="outlined"
        />

        <Input.Textarea
          rows={5}
          label="Descrição"
          placeholder="Escreva aqui..."
          control={control}
          variant="outlined"
          containerClassName="col-start-1 col-end-3"
          isFullWidth
          error={String(errors.description?.message || '')}
          {...register('description')}
        />
      </div>

      <div className="w-full flex max-sm:flex-col justify-end pt-6 gap-2">
        <Button
          type="submit"
          className={c('w-full sm:w-fit bg-success-400', fetching && 'p-3')}
          variant="filled"
          rounded
          loading={fetching}
        >
          Enviar mensagem
        </Button>
        <Button
          href="/contact"
          className={c('w-full sm:w-fit')}
          variant="outlined"
          rounded
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}

export default RequestServiceForm
