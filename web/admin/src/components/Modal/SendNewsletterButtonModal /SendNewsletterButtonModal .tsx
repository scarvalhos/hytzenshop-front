import { FieldValues, useForm } from 'react-hook-form'
import { TbMailForward } from 'react-icons/tb'
import { Button, Input } from '@luma/ui'
import { api } from '@hytzenshop/services'

import BaseModal from '../BaseModal/BaseModal'
import React from 'react'
import IconModal from '../IconModal'

const SendNewsletterButtonModal: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const { register, control, handleSubmit } = useForm()

  const onSubmit = React.useCallback((values: FieldValues) => {
    return api.post('/newsletter/send', values).then(() => setSuccess(true))
  }, [])

  return (
    <>
      <Button
        variant="filled"
        onClick={() => setOpenModal(true)}
        className="max-sm:p-3"
        rounded
      >
        <span className="flex items-center justify-center space-x-2">
          <TbMailForward />
          <p className="max-sm:hidden">Nova Newsletter</p>
        </span>
      </Button>

      <IconModal
        title="alou"
        description="alou"
        open={success}
        onClose={() => setSuccess(false)}
        icon="ozSuccess"
        renderActions={() => (
          <Button
            type="button"
            variant="outlined"
            rounded
            onClick={() => {
              setOpenModal(false)
              setSuccess(false)
            }}
          >
            Voltar
          </Button>
        )}
      />

      <BaseModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        panelClassName="bg-[#050507]"
        customWidth="max-w-screen-md"
        glassEffect={false}
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl text-primary font-semibold">Newsletter #1</h2>

          <Input.Field
            label="Assunto"
            placeholder="Digite aqui..."
            control={control}
            {...register('subject')}
            isFullWidth
          />

          <Input.Textarea
            rows={16}
            placeholder="Digite aqui..."
            label="Conteúdo"
            control={control}
            variant="filled"
            isFullWidth
            {...register('content')}
          />

          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              variant="filled"
              className="max-md:w-full"
              rounded
            >
              <span className="flex items-center justify-center space-x-2">
                <TbMailForward />
                <p>Enviar</p>
              </span>
            </Button>
          </div>
        </form>
      </BaseModal>
    </>
  )
}

export default SendNewsletterButtonModal
