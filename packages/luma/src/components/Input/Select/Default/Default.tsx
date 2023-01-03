import Select, { SingleValue } from 'react-select'
import React from 'react'

import { FieldContent, FieldLabel, FieldWrapper } from '../../Field/styles'
import { FieldInputProps } from '../../Field'
import { theme, Error } from '@luma/ui'
import { Option } from '@hytzenshop/types'
import { c } from '@hytzenshop/helpers'

interface SelectDefaultProps<T> extends FieldInputProps {
  options?: Option<T>[]
  defaultValue?: string
  onChangeValue?: (e: SingleValue<string>) => void
}

const SelectDefault = React.forwardRef(
  <T,>(
    {
      defaultValue,
      clearErrors,
      placeholder,
      setValue,
      options,
      error,
      variant = 'filled',
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
      onChangeValue,
    }: React.PropsWithChildren<SelectDefaultProps<T>>,
    _ref: any
  ) => {
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
            className="flex flex-row py-0.5"
          >
            <Select
              name={name}
              options={options as any}
              className={c(className, 'shadow-lg')}
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
                  borderRadius: '8px',
                }),
                control: (style) => ({
                  ...style,
                  backgroundColor: 'transparent',
                  color: theme.colors['light-gray'][100],
                  border: 'none',
                  boxShadow: 'none',
                  outline: 'none',
                }),
                menu: (style) => ({
                  ...style,
                  backgroundColor: 'transparent',
                  borderRadius: rounded ? '16px' : '3px',
                  marginTop: '12px',
                }),
                menuList: (style) => ({
                  ...style,
                  padding: 0,
                  borderRadius: rounded ? '16px' : '3px',
                  background: theme.colors['dark-gray'][500],
                }),
                option: (style) => ({
                  ...style,
                  color: theme.colors['light-gray'][100],
                  background: theme.colors['dark-gray'][500],
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
                onChangeValue && onChangeValue(e)
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
)

export default SelectDefault
