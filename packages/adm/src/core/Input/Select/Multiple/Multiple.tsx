import * as React from 'react'

import { FieldLabel, FieldContent } from '@core/Input/Field/styles'
import { FieldInputProps } from '@core/Input/Field'
import { Option } from '@utils/types'
import { Chip, Stack, useTheme } from '@mui/material'
import { Error } from '@core/Error'

import Select, { SingleValue } from 'react-select'

interface SelectMultipleProps<T> extends FieldInputProps {
  options?: Option<T>[]
  defaultValues?: Option<T>[]
}

const SelectMultiple = <T,>({
  defaultValues = [],
  defaultValue,
  clearErrors,
  setValue,
  options,
  error,
  label,
  name,
}: React.PropsWithChildren<SelectMultipleProps<T>>) => {
  const [selecteds, setSelecteds] =
    React.useState<SingleValue<Option<any>>[]>(defaultValues)

  const theme = useTheme()

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
    <Stack flex={1} spacing={1}>
      {label && <FieldLabel erro={error}>{label}</FieldLabel>}
      <FieldContent
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
            }),
            singleValue: (style) => ({
              ...style,
              fontWeight: 500,
              color: theme.palette.text.primary,
            }),
            container: (style) => ({
              ...style,
              width: '100%',
              background: theme.palette.primary.dark,
            }),
            control: (style) => ({
              ...style,
              background: theme.palette.primary.dark,
              color: theme.palette.text.primary,
              border: 'none',
              boxShadow: 'none',
              outline: 'none',
            }),
            menuList: (style) => ({
              ...style,
              padding: 0,
              borderRadius: '3px',
              backgroundColor: theme.palette.primary.dark,
            }),
            option: (style) => ({
              ...style,
              color: theme.palette.text.primary,
              background: theme.palette.primary.dark,
              paddingLeft: 16,
              paddingRight: 16,
              cursor: 'pointer',
              fontWeight: 500,
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

      {error && <Error>{error}</Error>}

      <Stack
        direction="row"
        marginTop="5px"
        sx={{
          flexFlow: 'wrap',
          gap: 1,
        }}
      >
        {selecteds.map((selected) => (
          <Chip
            key={selected?.value}
            label={selected?.label}
            variant="filled"
            size="small"
            sx={{
              borderRadius: '6px',
              color: theme.palette.text.secondary,
              background: theme.palette.secondary.dark,
              ':hover': {
                color: theme.palette.text.primary,
                background: theme.palette.primary.dark,
              },
            }}
            onClick={() => deleteFromSelecteds(selected?.value)}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default SelectMultiple
