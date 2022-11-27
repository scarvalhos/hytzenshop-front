import * as React from 'react'

import { FieldWrapper, FieldController } from '../Field/styles'
import { AddPhotoAlternateOutlined } from '@mui/icons-material'
import { DropContainer, FieldLabel } from './styles'
import { Accept, useDropzone } from 'react-dropzone'
import { FieldInputProps } from '../Field'
import { useFileInput } from './File.hook'
import { FileGrid } from './FileGrid'
import { FileList } from './FileList'
import { Error } from '@core/Error'

interface FileInputProps extends FieldInputProps {
  filesListDisplay?: 'list' | 'grid'
  multiple?: boolean
  accept?: Accept
  label?: string
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
      filesListDisplay = 'list',
      onDelete,
      onChangeFiles,
      accept = {
        'image/*': ['.pjpeg', '.jpeg', '.jpg', '.png', '.gif', '.webp'],
      },
    },
    ref
  ) => {
    const {
      renderDragMessage,
      deleteFile,
      onDrop,
      uploadedFiles,
      removeFromState,
      setUploadedFiles,
    } = useFileInput(onChangeFiles)

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
    }, [name, uploadedFiles])

    React.useEffect(() => {
      if (defaultValue) {
        setUploadedFiles(defaultValue as any)
      }
    }, [defaultValue])

    return (
      <>
        <FieldWrapper ref={ref}>
          {label && <FieldLabel erro={error}>{label}</FieldLabel>}

          <FieldController
            name={name}
            control={control}
            render={() => (
              <DropContainer
                {...getRootProps({ className: 'dropzone' })}
                isDragActive={isDragActive}
                isDragReject={isDragReject}
                erro={error}
              >
                <input {...getInputProps()} />
                <AddPhotoAlternateOutlined />
                {renderDragMessage(isDragActive, isDragReject, isDragAccept)}
              </DropContainer>
            )}
          />
        </FieldWrapper>

        {error && <Error>{error}</Error>}

        {!!uploadedFiles && filesListDisplay === 'list' && (
          <FileList
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
