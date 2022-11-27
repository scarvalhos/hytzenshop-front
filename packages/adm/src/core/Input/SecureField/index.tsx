import * as React from 'react'

import {
  Field,
  FieldWrapper,
  FieldLabel,
  FieldController,
  FieldContent,
} from './styles'

import { ChangeHandler, FieldValues, Control } from 'react-hook-form'
import { InputTypes, useFieldInput } from './Field.hook'
import { Stack } from '@mui/material'
import { Error } from '@core/Error'

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

export type FieldInputProps = MustHaveProps & {
  error?: string
  onFocus?: ChangeHandler
  control?: Control<FieldValues, object>
  after?: React.ReactNode
  renderInsideInput?: React.ReactNode
  variant?: string
}

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
      after,
      renderInsideInput,
      variant,
      error,
    },
    ref
  ) => {
    const { masks, realtypes, defaultPlaceholders } = useFieldInput({
      name: _name,
    })

    return (
      <FieldWrapper ref={ref}>
        {label && (
          <FieldLabel htmlFor={id} className="form-label" erro={error}>
            {label}
          </FieldLabel>
        )}
        {/* <div
        id="form-checkout__cardNumber-container"
        className="container"
        inputMode="numeric"
        style={{
          filter: 'invert(1)',
          background: '#DBDBD6',
        }}
      ></div> */}
        <Stack direction="row" spacing={1}>
          <FieldController
            name={_name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, name, value, onBlur, ref } }) => (
              <FieldContent variant={variant} erro={error}>
                <Field
                  id={id}
                  color="white"
                  mask={(masks[type] as never) || /^.*$/}
                  variant={variant}
                  type={realtypes[type]}
                  placeholder={placeholder || defaultPlaceholders[type]}
                  name={name}
                  disabled={disabled}
                  ref={ref}
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  {...(value !== undefined ? { value } : {})}
                  {...(passthrough as any)}
                />
                {renderInsideInput}
              </FieldContent>
            )}
          />
          {after}
        </Stack>
        {error && <Error>{error}</Error>}
      </FieldWrapper>
    )
  }
)

export default SecureFieldInput
