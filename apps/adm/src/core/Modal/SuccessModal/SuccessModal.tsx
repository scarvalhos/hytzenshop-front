import { BaseModalProps } from '../BaseModal/BaseModal'
import { Button } from '@luma/ui'

import IconModal from '../IconModal'
import React from 'react'

interface SuccessModalProps extends BaseModalProps {
  handleClose: () => void
  title?: string
  description?: string
  onDismiss?: () => void
  onClose?: () => void
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  handleClose,
  onDismiss,
  onClose,
  title,
  description,
}) => {
  return (
    <IconModal
      title={title || ''}
      description={description || ''}
      open={open}
      onClose={handleClose}
      icon="ozSuccess"
      renderActions={() => (
        <div className="mt-4 space-x-2 flex flex-col-reverse sm:flex-row">
          <Button type="button" variant="outlined" onClick={onDismiss}>
            Voltar
          </Button>
          <Button type="submit" variant="filled" onClick={onClose}>
            Novo produto
          </Button>
        </div>
      )}
    />
  )
}

export default SuccessModal
