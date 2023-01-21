import React from 'react'

import { FieldContent, FieldLabel, FieldWrapper } from '../Field/styles'
import { FieldInputProps } from '../Field'
import { useFieldInput } from '../Field/Field.hook'
import { Controller } from 'react-hook-form'
import { Error } from '@luma/ui'
import { Field } from './styles'
import { c } from '@hytzenshop/helpers'

const SecureFieldInput: React.FC<FieldInputProps> = React.forwardRef(
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
      renderInsideInput,
      variant,
      error,
      isFullWidth,
      containerClassName,
      renderAfterLabel,
      inputWrapperClassName,
      renderBefore,
      rounded,
      fieldVariant,
      className,
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
            render={({ field: { name, value, onBlur, onChange } }) => (
              <FieldContent
                variant={variant}
                error={error ? 'true' : 'false'}
                rounded={rounded}
                className="flex flex-row min-h-[46px]"
              >
                <Field
                  variant={fieldVariant}
                  id={id}
                  mask={(masks[type] as never) || /^.*$/}
                  type={realtypes[type]}
                  placeholder={placeholder || defaultPlaceholders[type]}
                  name={name}
                  disabled={disabled}
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  className={c(
                    className,
                    disabled
                      ? 'cursor-not-allowed text-light-gray-500'
                      : 'text-light-gray-100',
                    'px-3 py-3'
                  )}
                  {...(value !== undefined ? { value } : {})}
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

export default SecureFieldInput
