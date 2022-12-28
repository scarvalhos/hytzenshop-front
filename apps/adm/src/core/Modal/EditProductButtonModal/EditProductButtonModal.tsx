import { Button } from '@luma/ui'

import BaseModal from '../BaseModal/BaseModal'
import React from 'react'

interface EditProductButtonModalProps {
  buttonClassName?: string
}

const EditProductButtonModal: React.FC<EditProductButtonModalProps> = ({
  buttonClassName,
}) => {
  const [openModal, setOpenModal] = React.useState(false)

  return (
    <>
      <Button
        variant="filled"
        className={buttonClassName}
        rounded
        onClick={() => setOpenModal(true)}
      >
        Editar produto
      </Button>

      <BaseModal
        open={openModal}
        glassEffect={false}
        onClose={() => setOpenModal(false)}
      >
        <></>
      </BaseModal>
    </>
  )
}

export default EditProductButtonModal
