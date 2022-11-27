import * as React from 'react'

import { Status, StatusButton, StatusOptions } from './Status.styles'
import { FieldInputProps } from '../Field'
import { FieldController } from '../Field/styles'
import { HiChevronDown } from 'react-icons/hi'
import { Listbox } from '@headlessui/react'
import { Option } from '@utils/types'

export interface StatusInputProps<T> extends FieldInputProps {
  label?: string
  limit?: number
  options?: Option<T>[]
  defaultValue?: Option<T>
  value?: Option<T>
  getColor: (s: T) => string
  onChangeValue?: (v: Option<T>) => void
}

const StatusInput = <T,>({
  name,
  control,
  options,
  getColor,
  setValue,
  defaultValue,
  onChangeValue,
}: React.PropsWithChildren<StatusInputProps<T>>) => {
  const [status, setStatus] = React.useState(defaultValue)

  React.useEffect(() => setValue && setValue(name, status), [status, name])

  const onChange = React.useCallback((e: Option<T>) => {
    setStatus(e)

    onChangeValue && onChangeValue(e)
  }, [])

  return (
    <FieldController
      name={name}
      control={control}
      render={() => (
        <Listbox
          as="div"
          value={status}
          onChange={onChange}
          style={{
            position: 'relative',
          }}
        >
          <StatusButton>
            <Status bgcolor={getColor(status?.value as any)} spacing={1}>
              {status?.label}
              <HiChevronDown size={16} />
            </Status>
          </StatusButton>

          <StatusOptions>
            {options?.map((v) => (
              <Listbox.Option
                key={v?.label}
                value={v}
                style={{
                  cursor: 'pointer',
                  listStyle: 'none',
                  margin: 0,
                  padding: ' 0.25rem 0.75rem',
                }}
              >
                {v?.label}
              </Listbox.Option>
            ))}
          </StatusOptions>
        </Listbox>
      )}
    />
  )
}

export default StatusInput
