import * as React from 'react'

import { CustomButton, CustomLinkButton } from './styles'
import { ButtonProps } from '@mui/material'

interface IButtonProps extends ButtonProps {
  title: string
  render?: React.ReactNode
  rounded?: boolean
  icon?: React.ReactNode
}

export const Button: React.FC<IButtonProps> = ({
  onClick,
  variant,
  type,
  title,
  render,
  href,
  disabled,
  fullWidth = true,
  rounded,
  icon,
  sx,
  ...props
}) => {
  return (
    <>
      {href ? (
        <CustomLinkButton
          href={href}
          customVariant={variant}
          disabled={disabled}
          rounded={rounded}
          sx={sx}
        >
          {icon}
          {render || title}
        </CustomLinkButton>
      ) : (
        <CustomButton
          fullWidth={fullWidth}
          type={type}
          variant={variant}
          onClick={onClick}
          disabled={disabled}
          rounded={rounded}
          sx={sx}
          {...props}
        >
          {icon}
          {render || title}
        </CustomButton>
      )}
    </>
  )
}
