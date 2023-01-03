import * as React from 'react'

import { Status, StatusButton, StatusOptions } from './Status.styles'
import { DivideY, Input } from '@luma/ui'
import { HiChevronDown } from 'react-icons/hi'
import { Controller } from 'react-hook-form'
import { Listbox } from '@headlessui/react'
import { Option } from '@hytzenshop/types'
import { c } from '@hytzenshop/helpers'

export interface StatusInputProps<T> extends Input.FieldInputProps {
  label?: string
  limit?: number
  options?: Option<T>[]
  defaultValue?: Option<T>
  value?: Option<T>
  getColor: (s: T) => string
  onChangeValue?: (v: Option<T>) => void
}

const StatusInput = React.forwardRef(
  <T,>(
    {
      name,
      control,
      options,
      getColor,
      setValue,
      defaultValue,
      onChangeValue,
    }: React.PropsWithChildren<StatusInputProps<T>>,
    _ref: any
  ) => {
    const [status, setStatus] = React.useState(defaultValue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => setValue && setValue(name, status), [status, name])

    const onChange = React.useCallback(
      (e: Option<T>) => {
        setStatus(e)

        onChangeValue && onChangeValue(e)
      },
      [onChangeValue]
    )
    return (
      <Controller
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
              <Status
                className={c(getColor(status?.value as any), 'space-x-2')}
              >
                <p className="font-semibold text-sm">{status?.label}</p>
                <HiChevronDown size={16} />
              </Status>
            </StatusButton>

            <StatusOptions>
              <DivideY dividerClassName="my-0">
                {options?.map((v) => (
                  <Listbox.Option
                    key={v?.label}
                    value={v}
                    className="cursor-pointer list-none m-0 px-6 py-2 hover:bg-dark-gray-300"
                  >
                    {v?.label}
                  </Listbox.Option>
                ))}
              </DivideY>
            </StatusOptions>
          </Listbox>
        )}
      />
    )
  }
)

export default StatusInput
