import * as React from 'react'

import { FieldLabel, FieldContent, FieldWrapper } from '../../Field/styles'
import { useSelectCommons } from '../SelectCommons.hook'
import { FieldInputProps } from '../../Field'
import { Error, Chip } from '@luma/ui'
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

    const { styles } = useSelectCommons({ rounded })

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

          <FieldContent
            variant={variant}
            error={error ? 'true' : 'false'}
            rounded={rounded}
            className="flex flex-row border-none focus-within:border-[1.5px] focus-within:border-success-300"
          >
            <Select
              options={options as any}
              styles={styles}
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
