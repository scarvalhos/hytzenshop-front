import React from 'react'

import { TbCirclePlus, TbTrash } from 'react-icons/tb'
import { FieldInputProps } from '@components/Input/Field'
import { Controller } from 'react-hook-form'
import { Error } from '@core'
import { Chip } from '@luma/ui'
import { c } from '@hytzenshop/helpers'

import {
  FieldContent,
  FieldInput,
  FieldLabel,
  FieldWrapper,
} from '@components/Input/Field/styles'

interface SelectAddProps extends FieldInputProps {
  isChipRounded?: boolean
  chipSize?: 'small' | 'medium'
  chipVariant?: 'filled' | 'outlined'
  chipDeleteIcon?: boolean
  maxInputHeight?: string
  onAdd?: (v: string) => void
  onDelete?: (v: string) => void
}

const Add: React.FC<SelectAddProps> = React.forwardRef(
  (
    {
      label,
      error,
      setValue,
      name,
      placeholder,
      clearErrors,
      rounded,
      // defaultValue = [],
      isChipRounded = false,
      chipSize = 'small',
      chipVariant = 'outlined',
      chipDeleteIcon = false,
      onAdd,
      onDelete,
      control,
      isFullWidth,
      containerClassName,
      renderAfterLabel,
      inputWrapperClassName,
      className,
      renderAfter,
      renderBefore,
      variant,
      fieldVariant,
    },
    _ref
  ) => {
    const [item, setItem] = React.useState<string>('')
    const [added, setAdded] = React.useState<string[]>([])

    const handleAddItem = React.useCallback(() => {
      if (item === '') {
        return
      }
      if (added.find((i) => i === item)) {
        setItem('')
        return
      }
      setAdded([...added, item])
      onAdd && onAdd(item)
      setItem('')
    }, [added, item, onAdd])

    const deleteFromAdded = React.useCallback(
      (data: string) => {
        const newAdded = [...added]

        const filter = newAdded.filter((i) => i !== data)

        setAdded(filter)

        onDelete && onDelete(data)
      },
      [added, onDelete]
    )

    React.useEffect(() => {
      if (added.length > 0 && clearErrors) clearErrors(name)
    }, [name, clearErrors, added.length])

    React.useEffect(() => {
      if (setValue) setValue(name, added)
    }, [name, added])

    // React.useEffect(() => {
    //   if (defaultValue) {
    //     setAdded(defaultValue as any)
    //   }
    // }, [defaultValue])

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
            name={name}
            control={control}
            render={() => (
              <FieldContent
                variant={variant}
                error={error ? 'true' : 'false'}
                rounded={rounded ? 'true' : 'false'}
                className="flex flex-row"
              >
                <FieldInput
                  value={item}
                  variant={fieldVariant}
                  placeholder={placeholder}
                  onChange={(e) => setItem(e.target.value)}
                  className={className}
                />

                <TbCirclePlus
                  size={20}
                  color="white"
                  onClick={handleAddItem}
                  cursor="pointer"
                />
              </FieldContent>
            )}
          />
          {renderAfter}
        </div>

        {error && <Error>{error}</Error>}

        <div className="flex flex-row flex-wrap gap-2">
          {added.map((add) => (
            <Chip
              key={add}
              label={add}
              variant={chipVariant}
              size={chipSize}
              rounded={isChipRounded}
              {...(chipDeleteIcon
                ? {
                    onDelete: () => deleteFromAdded(add),
                    deleteIcon: <TbTrash size={16} />,
                  }
                : {
                    onClick: () => deleteFromAdded(add),
                  })}
            />
          ))}
        </div>
      </FieldWrapper>
    )
  }
)
export default Add
