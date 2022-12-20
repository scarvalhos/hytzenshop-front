import * as React from 'react'

import {
  FieldLabel,
  FieldContent,
  FieldWrapper,
  FieldController,
} from '@core/Input/Field/styles'

import { Chip, Stack, useTheme } from '@mui/material'
import { TbCirclePlus, TbTrash } from 'react-icons/tb'
import { FieldInputProps } from '@core/Input/Field'
import { Input } from './style'
import { Error } from '@core/Error'

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
      defaultValue = [],
      isChipRounded = false,
      chipSize = 'small',
      chipVariant = 'outlined',
      chipDeleteIcon = false,
      maxInputHeight,
      onAdd,
      onDelete,
      control,
    },
    ref
  ) => {
    const [item, setItem] = React.useState<string>('')

    const [added, setAdded] = React.useState(defaultValue as any[])

    const theme = useTheme()

    const handleAddItem = React.useCallback(() => {
      if (item === '') {
        return
      }

      if (added.find((i) => i === item)) {
        setItem('')
        return
      }

      setAdded((old) => [...old, item])

      onAdd && onAdd(item)

      setItem('')
    }, [added, item, onAdd])

    const deleteFromAdded = React.useCallback(
      (data: string) => {
        onDelete && onDelete(data)

        const newArr = [...added]
        const filter = newArr.filter((v) => v !== data)

        setAdded(filter)
      },
      [added, onDelete]
    )

    React.useEffect(() => {
      if (added.length > 0 && clearErrors) clearErrors(name)
    }, [name, clearErrors, added.length])

    React.useEffect(() => {
      if (setValue) setValue(name, added)
    }, [name, added])

    return (
      <FieldWrapper ref={ref}>
        {label && <FieldLabel erro={error}>{label}</FieldLabel>}

        <FieldController
          name={name}
          control={control}
          render={() => (
            <FieldContent
              erro={error}
              rounded={rounded ? 'true' : 'false'}
              maxHeight={maxInputHeight}
            >
              <Input
                value={item}
                placeholder={placeholder}
                onChange={(e) => setItem(e.target.value)}
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

        {error && <Error>{error}</Error>}

        <Stack direction="row" sx={{ flexFlow: 'wrap', gap: 1 }}>
          {added.map((add) => (
            <Chip
              key={add}
              label={add}
              variant={chipVariant}
              size={chipSize}
              {...(chipDeleteIcon
                ? {
                    onDelete: () => deleteFromAdded(add),
                    deleteIcon: (
                      <TbTrash color={theme.palette.primary.main} size={16} />
                    ),
                  }
                : {
                    onClick: () => deleteFromAdded(add),
                  })}
              sx={{
                ...(!isChipRounded && {
                  borderRadius: '4px',
                }),
                ...(chipVariant === 'filled' && {
                  background: theme.palette.secondary.dark,
                  px: 1,
                  ':hover': {
                    background: theme.palette.primary.dark,
                  },
                }),
                ...(chipVariant === 'outlined' && {
                  borderColor: theme.palette.secondary.dark,
                  px: 1,
                  ':hover': {
                    borderColor: theme.palette.primary.dark,
                  },
                }),
              }}
            />
          ))}
        </Stack>
      </FieldWrapper>
    )
  }
)
export default React.memo(Add)
