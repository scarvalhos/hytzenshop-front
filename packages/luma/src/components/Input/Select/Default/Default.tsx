import Select, { SingleValue } from 'react-select'
import React from 'react'

import { FieldContent, FieldLabel, FieldWrapper } from '../../Field/styles'
import { useSelectCommons } from '../SelectCommons.hook'
import { FieldInputProps } from '../../Field'
import { Option } from '@hytzenshop/types'
import { Error } from '../../../Error'
import { c } from '@hytzenshop/helpers'

interface SelectDefaultProps<T> extends FieldInputProps {
  options?: Option<T>[]
  defaultValue?: string
  onChangeValue?: (e: SingleValue<unknown>) => void
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
    const { styles } = useSelectCommons({ rounded })

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

          <FieldContent
            variant={variant}
            error={error ? 'true' : 'false'}
            rounded={rounded}
            className="flex flex-row focus-within:border-[1.5px] focus-within:border-success-300"
          >
            <Select
              name={name}
              styles={styles}
              options={options as any}
              className={c(className)}
              placeholder={placeholder}
              defaultValue={defaultValue}
              onChange={(e) => {
                if (error && clearErrors) clearErrors(name)
                onChangeValue && onChangeValue(e)
                return (
                  setValue &&
                  setValue(
                    name,
                    (e as unknown as SingleValue<Option<any>>)?.value
                  )
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
