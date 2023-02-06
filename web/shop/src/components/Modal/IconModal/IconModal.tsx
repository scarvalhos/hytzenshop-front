import * as Dialog from '@radix-ui/react-dialog'
import * as React from 'react'

import {
  TbAlertCircle,
  TbCircleCheck,
  TbMailForward,
  TbX,
} from 'react-icons/tb'

import { c } from '@hytzenshop/helpers'

import BaseModal, { BaseModalProps } from '../BaseModal/BaseModal'

const icons = {
  ozWarn: <TbAlertCircle className="h-20 w-20 text-warning-300" />,
  ozSuccess: <TbCircleCheck className="h-20 w-20 text-success-300" />,
  ozFailure: <TbX className="h-20 w-20 text-danger-300" />,
  ozSent: <TbMailForward className="h-20 w-20 text-primary-300" />,
}

export interface IconModalProps extends BaseModalProps {
  title: string
  description: string
  icon: keyof typeof icons
  iconClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

const IconModal: React.FC<IconModalProps> = ({
  open,
  title,
  icon,
  description,
  children,
  panelClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
  onClose,
  renderActions,
  glassEffect,
}) => {
  return (
    <BaseModal
      open={open}
      panelClassName={panelClassName}
      onClose={onClose}
      renderActions={renderActions}
      glassEffect={glassEffect}
    >
      <IconModalIn
        title={title}
        description={description}
        icon={icon}
        iconClassName={iconClassName}
        titleClassName={titleClassName}
        descriptionClassName={descriptionClassName}
      >
        {children}
      </IconModalIn>
    </BaseModal>
  )
}

const IconModalIn: React.FC<
  Pick<
    IconModalProps,
    | 'icon'
    | 'title'
    | 'description'
    | 'iconClassName'
    | 'titleClassName'
    | 'descriptionClassName'
    | 'children'
  >
> = ({
  title,
  description,
  icon,
  children,
  iconClassName,
  descriptionClassName,
  titleClassName,
}) => {
  const Icon = React.useMemo(() => icons[icon], [icon])

  return (
    <>
      <div className={c('mx-auto mb-4 max-w-max', iconClassName)}>{Icon}</div>

      <Dialog.Title
        className={c(
          'mb-2 text-center text-title-xs font-bold text-light-gray-100',
          titleClassName
        )}
      >
        {title}
      </Dialog.Title>

      <Dialog.Description
        className={c(
          'text-center font-medium text-light-gray-500',
          descriptionClassName
        )}
      >
        {description}
      </Dialog.Description>

      {children}
    </>
  )
}

export default IconModal

export { IconModalIn }
