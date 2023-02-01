import React from 'react'

import { FieldContent, FieldLabel, FieldWrapper } from '../Field/styles'
import { FieldInputProps } from '../Field'
import { Controller } from 'react-hook-form'
import { Error } from '@luma/ui'
import { Field } from './styles'
import { c } from '@hytzenshop/helpers'

interface TextareaInputProps extends FieldInputProps {
  rows?: number
}

const TextareaInput: React.FC<TextareaInputProps> = React.forwardRef(
  (
    {
      id,
      name: _name,
      label,
      passthrough,
      placeholder,
      onFocus,
      disabled,
      control,
      defaultValue,
      renderAfter,
      renderInsideInput,
      variant,
      error,
      isFullWidth,
      containerClassName,
      renderAfterLabel,
      inputWrapperClassName,
      renderBefore,
      rounded,
      className,
      rows,
    },
    _ref
  ) => {
    return (
      <FieldWrapper
        className={c(
          'space-y-2',
          isFullWidth ? 'w-full' : 'w-fit',
          containerClassName
        )}
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
            render={({ field: { onChange, name, value, onBlur, ref } }) => (
              <FieldContent
                variant={variant}
                error={error ? 'true' : 'false'}
                rounded={rounded}
                className="flex flex-row"
              >
                <Field
                  id={id}
                  ref={ref}
                  name={name}
                  rows={rows}
                  placeholder={placeholder}
                  disabled={disabled}
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  className={c(
                    className,
                    disabled && 'cursor-not-allowed opacity-40',
                    'px-3 py-3 text-primary'
                  )}
                  {...(value !== undefined
                    ? { value }
                    : { value: defaultValue })}
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

export default TextareaInput
