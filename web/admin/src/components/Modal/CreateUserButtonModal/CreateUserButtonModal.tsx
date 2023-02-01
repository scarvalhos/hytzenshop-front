import { TbCirclePlus } from 'react-icons/tb'
import { Button, Input } from '@luma/ui'

import BaseModal from '../BaseModal/BaseModal'
import React from 'react'
import { useForm } from 'react-hook-form'

interface CreateUserButtonModalProps {
  buttonClassName?: string
}

const CreateUserButtonModal: React.FC<CreateUserButtonModalProps> = ({
  buttonClassName,
}) => {
  const [openModal, setOpenModal] = React.useState(false)

  const { register, control } = useForm()

  return (
    <>
      <Button
        variant="filled"
        className={buttonClassName}
        onClick={() => setOpenModal(true)}
        rounded
      >
        <span className="flex items-center space-x-2">
          <TbCirclePlus size={20} />
          <span className="max-sm:hidden">Novo usuário</span>
        </span>
      </Button>

      <BaseModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        panelClassName="p-0"
        glassEffect={false}
      >
        <div className="space-y-4">
          <Input.Field
            label="Nome completo"
            control={control}
            isFullWidth
            {...register('name')}
          />
          <Input.Field
            label="E-mail"
            control={control}
            isFullWidth
            {...register('email')}
          />

          <div className="flex justify-end">
            <Button variant="filled" onClick={() => setOpenModal(true)} rounded>
              Criar usuário
            </Button>
          </div>
        </div>
      </BaseModal>
    </>
  )
}

export default CreateUserButtonModal
