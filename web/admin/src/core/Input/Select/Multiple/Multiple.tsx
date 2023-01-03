import * as React from 'react'

import {
  FieldLabel,
  FieldContent,
  FieldWrapper,
} from '@core/Input/Field/styles'

import { Error, Chip, theme } from '@luma/ui'
import { FieldInputProps } from '@core/Input/Field'
import { Option } from '@hytzenshop/types'
import { c } from '@hytzenshop/helpers'

import Select, { SingleValue } from 'react-select'

interface SelectMultipleProps<T> extends FieldInputProps {
  options?: Option<T>[]
  defaultValues?: Option<T>[]
}

const SelectMultiple = React.forwardRef(
  <T,>(
    {
      defaultValues = [],
      defaultValue,
      clearErrors,
      setValue,
      options,
      error,
      label,
      name,
      isFullWidth,
      containerClassName,
      renderAfterLabel,
      inputWrapperClassName,
      renderBefore,
      renderAfter,
      variant,
      rounded,
    }: React.PropsWithChildren<SelectMultipleProps<T>>,
    _ref: any
  ) => {
    const [selecteds, setSelecteds] =
      React.useState<SingleValue<Option<any>>[]>(defaultValues)

    const deleteFromSelecteds = React.useCallback(
      (value: string) => {
        const newSelecteds = [...selecteds]

        const filter = newSelecteds.filter((s) => s?.value !== value)

        setSelecteds(filter)
      },
      [selecteds]
    )

    React.useEffect(() => {
      if (selecteds.length > 0 && clearErrors) clearErrors(name)
      if (setValue)
        setValue(
          name,
          selecteds?.map((s) => s?.value)
        )
    }, [clearErrors, error, name, selecteds, setValue])

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
              options={options as any}
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
                }),
                control: (style) => ({
                  ...style,
                  backgroundColor: 'transparent',
                  color: theme.colors['light-gray'][100],
                  border: 'none',
                  boxShadow: 'none',
                  outline: 'none',
                }),
                menuList: (style) => ({
                  ...style,
                  padding: 0,
                  borderRadius: '3px',
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
              defaultValue={defaultValue}
              onChange={(e) => {
                setSelecteds((old) => {
                  if (
                    old.find(
                      (i) => i?.value === (e as SingleValue<Option<any>>)?.value
                    )
                  ) {
                    return old
                  }

                  return [...old, e as SingleValue<Option<any>>]
                })
              }}
            />
          </FieldContent>

          {renderAfter}
        </div>

        {error && <Error>{error}</Error>}

        <div className="flex flex-row flex-wrap gap-2">
          {selecteds.map((selected) => (
            <Chip
              key={selected?.value}
              label={selected?.label}
              variant="filled"
              size="small"
              onClick={() => deleteFromSelecteds(selected?.value)}
            />
          ))}
        </div>
      </FieldWrapper>
    )
  }
)

export default SelectMultiple
