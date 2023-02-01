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
  fieldClassName?: string
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
      fieldClassName,
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
        isFullWidth={isFullWidth}
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
                rounded={rounded}
                className={c(
                  'flex flex-row focus-within:border-[1.5px] focus-within:border-success-300',
                  fieldClassName
                )}
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
                    'px-3 py-3 text-primary',
                    disabled && 'cursor-not-allowed'
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
