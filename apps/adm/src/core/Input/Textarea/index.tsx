import * as React from 'react'

import { FieldInputProps } from '../Field'
import { TextArea } from './styles'
import { Stack } from '@mui/material'
import { Error } from '@core/Error'

import {
  FieldContent,
  FieldController,
  FieldLabel,
  FieldWrapper,
} from '../Field/styles'

interface TextareaInputProps extends FieldInputProps {
  rows?: number
}

const TextareaInput: React.FC<TextareaInputProps> = React.forwardRef(
  (
    {
      id,
      name,
      label,
      passthrough,
      onFocus,
      disabled,
      control,
      defaultValue,
      after,
      variant,
      error,
      placeholder,
      rows = 4,
    },
    ref
  ) => {
    return (
      <FieldWrapper ref={ref}>
        {label && (
          <FieldLabel htmlFor={id} className="form-label" erro={error}>
            {label}
          </FieldLabel>
        )}

        <Stack direction="row" spacing={1}>
          <FieldController
            name={name}
            control={control}
            render={({ field: { onChange, name, value, onBlur, ref } }) => (
              <FieldContent variant={variant} erro={error} disabled={disabled}>
                <TextArea
                  id={id}
                  name={name}
                  disabled={disabled}
                  ref={ref}
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  placeholder={placeholder}
                  defaultValue={defaultValue}
                  rows={rows}
                  {...(value !== undefined ? { value } : {})}
                  {...(passthrough as any)}
                />
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

export default TextareaInput
