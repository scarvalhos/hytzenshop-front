import * as React from 'react'

import { RadioValue } from '@utils/etc'
import { FieldInputProps } from '../Field'
import { c } from '@utils/helpers'

export interface DataProps {
  status: string | number
  message?: string
}

interface RadioInputProps extends Omit<FieldInputProps, 'onChange'> {
  label: string
  readOnly?: boolean
  checked?: boolean
  highlightWhenSelected?: boolean
  labelClassName?: string
  icon?: () => React.ReactNode
  value: RadioValue | ''

  onChange: (value: React.SetStateAction<'' | RadioValue>) => void
}

const RadioInput: React.FC<RadioInputProps> = ({
  label,
  icon,
  value,
  containerClassName,
  disabled,
  inputWrapperClassName,
  className,
  labelClassName,
  passthrough,
  name,
  readOnly,
  highlightWhenSelected,
  checked,
  onChange,
  onBlur,
  onFocus,
}) => {
  const Icon = () => {
    return (
      <>
        {icon ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              onChange(name as any)
            }}
          >
            {icon()}
          </button>
        ) : (
          <input
            type="radio"
            readOnly={readOnly}
            name={name}
            value={value as never}
            checked={checked}
            onChange={() => onChange(name as any)}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            {...passthrough}
            className={c(
              disabled ? 'cursor-not-allowed' : 'cursor-pointer',
              className
            )}
          />
        )}
      </>
    )
  }

  return (
    <div className={c(containerClassName, 'whitespace-nowrap flex-1')}>
      <label
        className={c(
          inputWrapperClassName,
          'flex select-none items-center space-x-3 border border-solid border-[transparent] rounded-md px-4 py-3 bg-dark-gray-400',
          disabled
            ? 'cursor-not-allowed border-light-gray-200'
            : 'cursor-pointer border-dark-gray-400',
          checked && highlightWhenSelected
            ? 'border-success-300 bg-dark-gray-300'
            : ''
        )}
      >
        <Icon />

        <p
          className={c(
            'font-medium',
            disabled ? 'text-light-gray-500' : 'text-light-gray-100',
            labelClassName
          )}
        >
          {label}
        </p>
      </label>
    </div>
  )
}

export default RadioInput
