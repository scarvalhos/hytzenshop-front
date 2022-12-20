import * as React from 'react'

import { FieldLabel, FieldContent } from '@core/Input/Field/styles'
import { FieldInputProps } from '@core/Input/Field'
import { Option } from '@hytzenshop/types'
import { Stack, useTheme } from '@mui/material'
import { Error } from '@core/Error'

import Select, { SingleValue } from 'react-select'

interface SelectDefaultProps<T> extends FieldInputProps {
  options?: Option<T>[]
  defaultValue?: string
}

const SelectDefault = <T,>({
  defaultValue,
  clearErrors,
  placeholder,
  setValue,
  options,
  rounded,
  variant,
  error,
  label,
  name,
  onChange,
}: React.PropsWithChildren<SelectDefaultProps<T>>) => {
  const theme = useTheme()

  return (
    <Stack flex={1} spacing={1}>
      {label && <FieldLabel erro={error}>{label}</FieldLabel>}
      <FieldContent
        rounded={rounded ? 'true' : 'false'}
        variant={variant}
        erro={error}
        sx={{
          padding: '0.25rem !important',
        }}
      >
        <Select
          options={options as any}
          styles={{
            input: (style) => ({
              ...style,
              color: theme.palette.text.primary,
              padding: 0,
            }),
            singleValue: (style) => ({
              ...style,
              fontWeight: 500,
              color: theme.palette.text.primary,
            }),
            container: (style) => ({
              ...style,
              width: '100%',
              background:
                variant === 'outlined'
                  ? 'transparent'
                  : theme.palette.primary.dark,
            }),
            control: (style) => ({
              ...style,
              background:
                variant === 'outlined'
                  ? 'transparent'
                  : theme.palette.primary.dark,
              color: theme.palette.text.primary,
              border: 'none',
              boxShadow: 'none',
              outline: 'none',
            }),
            menuList: (style) => ({
              ...style,
              padding: 0,
              borderRadius: '2px',
              backgroundColor: theme.palette.background.default,
            }),
            option: (style) => ({
              ...style,
              color: theme.palette.text.primary,
              background: theme.palette.background.default,
              paddingLeft: 16,
              paddingRight: 16,
              cursor: 'pointer',
              fontWeight: 400,
              fontSize: 14,
              ':hover': {
                background: theme.palette.primary.dark,
                filter: 'brightness(1.2)',
              },
            }),
            indicatorSeparator: () => ({}),
            placeholder: (style) => ({
              ...style,
              color: theme.palette.text.secondary,
            }),
          }}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={(e) => {
            if (error && clearErrors) {
              clearErrors(name)
            }

            setValue && setValue(name, [(e as SingleValue<Option<any>>)?.value])
            onChange && onChange(e as any)
          }}
        />
      </FieldContent>

      {error && <Error>{error}</Error>}
    </Stack>
  )
}

export default SelectDefault
