import Select, { SingleValue } from 'react-select'
import React from 'react'

import { FieldInputProps } from '@components/Input/Field'
import { Option } from '@hytzenshop/types'
import { theme } from '@hooks/useTheme'
import { Error } from '@core'
import { c } from '@hytzenshop/helpers'

import {
  FieldContent,
  FieldLabel,
  FieldWrapper,
} from '@components/Input/Field/styles'

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
  error,
  variant,
  rounded,
  label,
  name,
  isFullWidth,
  containerClassName,
  renderAfterLabel,
  className,
  inputWrapperClassName,
  renderBefore,
  renderAfter,
}: React.PropsWithChildren<SelectDefaultProps<T>>) => {
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

        <FieldContent
          variant={variant}
          error={error ? 'true' : 'false'}
          rounded={rounded ? 'true' : 'false'}
          className="flex flex-row"
          style={{
            padding: '0rem',
          }}
        >
          <Select
            name={name}
            options={options as any}
            className={className}
            styles={{
              input: (style) => ({
                ...style,
                color: theme.colors['light-gray'][100],
              }),
              singleValue: (style) => ({
                ...style,
                fontWeight: 500,
                color: theme.colors['light-gray'][100],
              }),
              container: (style) => ({
                ...style,
                width: '100%',
                background:
                  variant === 'outlined'
                    ? 'transparent'
                    : theme.colors['dark-gray'][400],
              }),
              control: (style) => ({
                ...style,
                background:
                  variant === 'outlined'
                    ? 'transparent'
                    : theme.colors['dark-gray'][400],
                color: theme.colors['light-gray'][100],
                border: 'none',
                boxShadow: 'none',
                outline: 'none',
              }),
              menuList: (style) => ({
                ...style,
                padding: 0,
                borderRadius: '3px',
                background: theme.colors['dark-gray'][400],
              }),
              option: (style) => ({
                ...style,
                color: theme.colors['light-gray'][100],
                background: theme.colors['dark-gray'][400],
                paddingLeft: 16,
                paddingRight: 16,
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: 14,
                ':hover': {
                  background: theme.colors['dark-gray'][400],
                  filter: 'brightness(1.2)',
                },
              }),
              indicatorSeparator: () => ({}),
              placeholder: (style) => ({
                ...style,
                color: theme.colors['light-gray'][400],
              }),
            }}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={(e) => {
              if (error && clearErrors) clearErrors(name)
              return (
                setValue &&
                setValue(name, (e as SingleValue<Option<any>>)?.value)
              )
            }}
          />
        </FieldContent>

        {renderAfter}
      </div>

      {error && <Error>{error}</Error>}
    </FieldWrapper>
  )
}

export default SelectDefault
