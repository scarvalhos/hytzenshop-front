import * as Input from '@components/Input'

import { FieldValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Button } from '@luma/ui'

import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import React from 'react'

const ContatoPage: NextPage = () => {
  const { query } = useRouter()
  const { control, register, handleSubmit } = useForm()

  const subject = React.useMemo(
    () => query.subject as 'devolution' | 'feedback',
    [query]
  )

  const onSubmit = React.useCallback((values: FieldValues) => {
    console.log(values)
  }, [])

  const parseSubject = React.useMemo(() => {
    return {
      devolution: 'Devolução',
      feedback: 'Feedback',
    }
  }, [])

  return (
    <HeaderFooterLayout glassEffect={false}>
      <NextSeo title="Contato" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:max-w-screen-md my-20 mx-8 md:mx-auto bg-dark-gray-500 bg-opacity-50 p-6 rounded-md"
      >
        <div className="mb-4">
          <h2 className="text-light-gray-100 text-2xl font-semibold">
            Entre em contato:
          </h2>

          <p>
            Envie abaixo suas dúvidas e/ou feedbacks. Entraremos em contato em
            até 24h.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <Input.Field
            {...(subject && {
              defaultValue: parseSubject[subject],
              disabled: true,
            })}
            type="text"
            label="Assunto"
            control={control}
            {...register('subject')}
            isFullWidth
          />

          <Input.Field
            type="text"
            label="Nome completo"
            control={control}
            {...register('completeName')}
            isFullWidth
          />

          <Input.Field
            type="email"
            label="E-mail"
            control={control}
            {...register('email')}
            isFullWidth
          />

          <Input.Field
            type="cel"
            label="Celular"
            control={control}
            {...register('phone')}
            isFullWidth
          />

          <Input.Textarea
            type="text"
            label="Descrição"
            placeholder="Escreva aqui..."
            control={control}
            variant="filled"
            {...register('description')}
            isFullWidth
            rows={5}
          />

          <div className="w-full flex justify-end pt-6">
            <Button
              type="submit"
              className="w-full sm:w-fit bg-success-400"
              variant="filled"
              rounded
            >
              Enviar mensagem
            </Button>
          </div>
        </div>
      </form>
    </HeaderFooterLayout>
  )
}

export default ContatoPage
