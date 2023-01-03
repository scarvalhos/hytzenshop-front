import BaseModal, { BaseModalProps } from '../BaseModal/BaseModal'
import React from 'react'

export interface BoletoModalProps extends BaseModalProps {
  response: any
}

const BoletoModal: React.FC<BoletoModalProps> = ({
  open,
  panelClassName,
  onClose,
  renderActions,
  response,
}) => {
  return (
    <BaseModal
      open={open}
      panelClassName={panelClassName}
      onClose={onClose}
      renderActions={renderActions}
    >
      <div className="flex flex-col justify-center items-center">
        <a
          href={response?.transaction_details?.external_resource_url}
          download={response?.transaction_details?.external_resource_url}
          target="_blank"
          rel="noreferrer"
        >
          Baixar boleto
        </a>
      </div>
    </BaseModal>
  )
}

export default BoletoModal
