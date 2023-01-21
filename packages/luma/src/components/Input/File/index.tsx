import * as React from 'react'

import { FieldLabel, FieldWrapper } from '../Field/styles'
import { Accept, useDropzone } from 'react-dropzone'
import { FieldInputProps } from '../Field'
import { useFileInput } from './File.hook'
import { Controller } from 'react-hook-form'
import { FileGrid } from './FileGrid'
import { FileList } from './FileList'
import { TbPhoto } from 'react-icons/tb'
import { Error } from '@luma/ui'
import { c } from '@hytzenshop/helpers'

interface FileInputProps extends FieldInputProps {
  filesListDisplay?: 'list' | 'grid'
  listItemRounded?: boolean
  multiple?: boolean
  accept?: Accept
  label?: string
  maxFiles?: number
  onDelete?: (id: string) => void
  onChangeFiles?: (ids: any[]) => void
}

const FileInput: React.FC<FileInputProps> = React.forwardRef(
  (
    {
      name,
      label,
      error,
      control,
      disabled,
      clearErrors,
      defaultValue,
      setValue,
      multiple = true,
      maxFiles,
      filesListDisplay = 'list',
      listItemRounded,
      onDelete,
      onChangeFiles,
      renderAfterLabel,
      isFullWidth,
      containerClassName,
      variant,
      accept = {
        'image/*': ['.pjpeg', '.jpeg', '.jpg', '.png', '.gif', '.webp'],
      },
    },
    _ref
  ) => {
    const {
      renderDragMessage,
      deleteFile,
      onDrop,
      uploadedFiles,
      removeFromState,
      setUploadedFiles,
    } = useFileInput({ onChangeFiles })

    const {
      isDragAccept,
      isDragReject,
      getRootProps,
      getInputProps,
      isDragActive,
    } = useDropzone({
      onDrop,
      disabled,
      multiple,
      maxFiles,
      accept,
      maxSize: 10 * 1024 * 1024,
    })

    React.useEffect(() => {
      if (uploadedFiles.length > 0 && clearErrors) clearErrors(name)
    }, [clearErrors, name, uploadedFiles])

    React.useEffect(() => {
      if (setValue) {
        setValue(name, uploadedFiles)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, uploadedFiles])

    React.useEffect(() => {
      if (defaultValue) {
        setUploadedFiles(defaultValue as any)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue])

    return (
      <>
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

          {((maxFiles === 1 && !uploadedFiles.length) || maxFiles !== 1) && (
            <Controller
              name={name}
              control={control}
              render={() => (
                <div
                  {...getRootProps({ className: 'dropzone' })}
                  className={c(
                    'border border-dashed rounded-lg cursor-pointer px-6 py-8 text-center flex flex-col items-center justify-center',
                    (isDragReject || error) && 'border-danger-300',
                    isDragAccept && 'border-success-300',
                    variant === 'outlined' && !error && 'border-dark-gray-200',
                    variant === 'filled' && !error && 'border-light-gray-500',
                    variant === 'filled' && 'bg-secondary',
                    disabled && 'opacity-40 cursor-not-allowed'
                  )}
                >
                  <input {...getInputProps()} />
                  <TbPhoto
                    size={24}
                    className={c(
                      'mb-4',
                      isDragAccept
                        ? 'text-success-300'
                        : isDragReject || !!error
                        ? 'text-danger-300'
                        : 'text-light-gray-500'
                    )}
                  />
                  {renderDragMessage(
                    isDragActive,
                    isDragReject,
                    isDragAccept,
                    error
                  )}
                </div>
              )}
            />
          )}
        </FieldWrapper>

        {error && <Error>{error}</Error>}

        {!!uploadedFiles && filesListDisplay === 'list' && (
          <FileList
            listItemRounded={listItemRounded}
            files={uploadedFiles}
            onDelete={(id) => {
              onDelete && onDelete(id)
              deleteFile(id)
            }}
            onError={removeFromState}
          />
        )}

        {!!uploadedFiles && filesListDisplay === 'grid' && (
          <FileGrid
            files={uploadedFiles}
            onError={removeFromState}
            onDelete={(id) => {
              onDelete && onDelete(id)
              deleteFile(id)
            }}
          />
        )}
      </>
    )
  }
)

export default FileInput
