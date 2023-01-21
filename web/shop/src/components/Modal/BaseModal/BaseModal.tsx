import * as Dialog from '@radix-ui/react-dialog'

import { withGlassEffect } from '@luma/ui'
import { c } from '@hytzenshop/helpers'

import React from 'react'
import { TbX } from 'react-icons/tb'

export interface BaseModalProps {
  children?: React.ReactElement
  open: boolean
  panelClassName?: string
  customWidth?: string
  onClose?: () => void
  renderActions?: () => React.ReactElement
  glassEffect?: boolean
}

const BaseModal: React.FC<BaseModalProps> = ({
  open,
  panelClassName,
  children,
  onClose,
  renderActions,
  customWidth,
  glassEffect = true,
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
        <Dialog.Overlay className="fixed inset-0 bg-black/30 flex items-center justify-center p-6 z-[999999999]">
          <Dialog.Content
            className={c(
              'container relative',
              customWidth ? customWidth : 'max-w-[500px]',
              'rounded-lg',
              panelClassName,
              !glassEffect && 'bg-primary p-10'
            )}
          >
            {withGlassEffect(
              <>
                <Dialog.Close
                  onClick={close}
                  className="absolute top-4 right-4"
                >
                  <TbX size={18} />
                </Dialog.Close>
                {children}
                {renderActions && (
                  <div className="mt-6 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-center sm:space-x-4">
                    {renderActions()}
                  </div>
                )}
              </>,
              {
                glassClassName: c(
                  'rounded-lg p-10 backdrop-blur-3xl border border-opacity-20 border-light-gray-400',
                  panelClassName
                ),
                glassEffect,
              }
            )}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Dialog>
  )
}

export default BaseModal
