import * as Dialog from '@radix-ui/react-dialog'

import { c } from '@utils/helpers'

import React from 'react'

export interface BaseModalProps {
  children?: React.ReactElement
  open: boolean
  panelClassName?: string
  customWidth?: string
  onClose?: () => void
  renderActions?: () => React.ReactElement
}

const BaseModal: React.FC<BaseModalProps> = ({
  open,
  panelClassName,
  children,
  onClose,
  renderActions,
  customWidth,
}) => {
  const openTime = React.useRef<number>()

  const close = React.useCallback(() => {
    const now = Date.now()
    if (now - (openTime.current || now) < 1000) return
    onClose && onClose()
  }, [onClose])

  React.useEffect(() => {
    if (open) openTime.current = Date.now()
  }, [open])

  return (
    <Dialog.Dialog open={open} onOpenChange={close}>
      <Dialog.Portal className="relative z-50">
        <Dialog.Overlay className="fixed inset-0 bg-black/30 flex items-center justify-center p-6 z-[999]">
          <Dialog.Content
            className={c(
              'container',
              customWidth ? customWidth : 'max-w-[500px]',
              'rounded-lg bg-dark-gray-400 p-10',
              panelClassName
            )}
          >
            {children}

            {renderActions && (
              <div className="mt-6 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-center sm:space-x-4">
                {renderActions()}
              </div>
            )}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Dialog>
  )
}

export default BaseModal
