import * as React from 'react'

import {
  ChangeHandler,
  FieldValues,
  Control,
  UseFormSetValue,
  UseFormClearErrors,
  Controller,
} from 'react-hook-form'

import { FieldWrapper, FieldLabel, FieldContent, Field } from './styles'
import { InputTypes, useFieldInput } from './Field.hook'
import { Error } from '../../Error'
import { c } from '@hytzenshop/helpers'

export interface SharedFieldInputProps {
  className?: string
  containerClassName?: string
  inputWrapperClassName?: string
  passthrough?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
}

export interface MustHaveProps extends SharedFieldInputProps {
  id?: string
  name: string
  type?: InputTypes
  label?: string
  placeholder?: string
  defaultValue?: unknown
  disabled?: boolean
}

export interface FieldInputProps extends MustHaveProps {
  onBlur?: ChangeHandler
  onFocus?: ChangeHandler
  onChange?: ChangeHandler
  control?: Control<FieldValues, unknown>

  renderAfter?: React.ReactNode
  renderBefore?: React.ReactNode
  renderInsideInput?: React.ReactNode
  renderAfterLabel?: React.ReactNode

  isFullWidth?: boolean
  fieldVariant?: 'field' | 'password'
  variant?: 'bordeless' | 'filled' | 'outlined' | 'disabled'
  rounded?: boolean
  error?: string

  setValue?: UseFormSetValue<FieldValues>
  clearErrors?: UseFormClearErrors<FieldValues>
}

const FieldInput: React.FC<FieldInputProps> = React.forwardRef(
  (
    {
      id,
      name: _name,
      type = 'text',
      label,
      passthrough,
      placeholder,
      onFocus,
      disabled,
      control,
      defaultValue,

      renderAfter,
      renderBefore,
      renderInsideInput,
      renderAfterLabel,

      isFullWidth,
      fieldVariant = 'field',
      variant = 'filled',
      rounded,
      error,

      className,
      containerClassName,
      inputWrapperClassName,
    },
    _ref
  ) => {
    const { masks, realtypes, defaultPlaceholders } = useFieldInput({
      name: _name,
    })

    return (
      <FieldWrapper
        width={isFullWidth ? 'full' : 'fit'}
        className={c('space-y-2', containerClassName)}
      >
        {label && (
          <FieldLabel color={error ? 'error' : 'initial'}>
            {label}
            {renderAfterLabel}
          </FieldLabel>
        )}

        <div className={c('flex flex-row gap-2', inputWrapperClassName)}>
          {renderBefore}

          <Controller
            name={_name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, name, value, onBlur } }) => (
              <FieldContent
                variant={variant}
                error={error ? 'true' : 'false'}
                rounded={rounded ? 'true' : 'false'}
                className="flex flex-row"
              >
                <Field
                  id={id}
                  name={name}
                  mask={(masks[type] as never) || /^.*$/}
                  type={realtypes[type]}
                  placeholder={placeholder || defaultPlaceholders[type]}
                  disabled={disabled}
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  fieldVariant={fieldVariant}
                  className={c(
                    className,
                    disabled
                      ? 'cursor-not-allowed text-light-gray-500'
                      : 'text-light-gray-100',
                    'px-3 py-3'
                  )}
                  {...(value !== undefined
                    ? { value }
                    : defaultValue
                    ? { value: defaultValue }
                    : {})}
                  {...(passthrough as any)}
                />
                {renderInsideInput}
              </FieldContent>
            )}
          />

          {renderAfter}
        </div>

        {error && <Error>{error}</Error>}
      </FieldWrapper>
    )
  }
)

export default FieldInput
