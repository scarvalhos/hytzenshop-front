import * as React from 'react'

import { defaultToastError } from '@hytzenshop/helpers'
import { v4 as UUID } from 'uuid'
import { api } from '@hytzenshop/services'

import fileSize from 'filesize'

export const useFileInput = (onChangeFiles?: (ids: any[]) => void) => {
  const [uploadedFiles, setUploadedFiles] = React.useState<any[]>([])

  const updateFile = React.useCallback(
    (id: string, data: any, successUpload: boolean) => {
      return setUploadedFiles((old) => {
        const newArr = old.map((item) => {
          return id === item.id ? { ...item, ...data } : item
        })

        if (onChangeFiles && successUpload) {
          onChangeFiles(newArr)
        }

        return newArr
      })
    },
    [onChangeFiles]
  )

  const processUpload = React.useCallback(
    async (uploadedFile: any) => {
      const data = new FormData()

      data.append('file', uploadedFile.file, uploadedFile.name)

      return api
        .post('/files', data, {
          onUploadProgress: (e) => {
            const progress = parseInt(
              String(Math.round((e.loaded * 100) / (e.total || 0)))
            )
            return updateFile(
              uploadedFile.id,
              {
                progress,
              },
              false
            )
          },
        })
        .then(({ data }) => {
          return updateFile(
            uploadedFile.id,
            {
              uploaded: true,
              id: data._id,
              url: data.url,
            },
            true
          )
        })
        .catch(() =>
          updateFile(
            uploadedFile.id,
            {
              error: true,
            },
            false
          )
        )
    },
    [updateFile]
  )

  const onUploadFiles = React.useCallback(
    (files: File[]) => {
      const uploaded = files.map((file) => ({
        file,
        id: UUID(),
        name: file.name,
        readableSize: fileSize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: null,
      }))

      setUploadedFiles((old) => old.concat(uploaded))

      return uploaded.forEach(processUpload)
    },
    [processUpload]
  )

  const removeFromState = React.useCallback(async (id: string) => {
    return setUploadedFiles((old) => {
      return [...old.filter((file) => file.id !== id)]
    })
  }, [])

  const deleteFile = React.useCallback(async (id: string) => {
    return api
      .delete(`/files/${id}`)
      .then(() =>
        setUploadedFiles((old) => {
          return [...old.filter((file) => file.id !== id)]
        })
      )
      .catch(defaultToastError)
  }, [])

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      onUploadFiles(acceptedFiles)
    },
    [onUploadFiles]
  )

  const renderDragMessage = React.useCallback(
    (isDragActive: boolean, isDragReject: boolean, isDragAccept: boolean) => {
      if (!isDragActive) {
        return (
          <>
            <p>Arraste e solte ou clique para procurar</p>
            <span>
              Apenas arquivos .jpg, .jpeg, .pjpeg, .png, e .gif. Tamanho máximo
              de 5MB
            </span>
          </>
        )
      }

      if (isDragActive && isDragAccept) {
        return (
          <>
            <p>Solte o arquivo</p>
            <span>
              Apenas arquivos .jpg, .jpeg, .pjpeg, .png, e .gif. Tamanho máximo
              de 5MB
            </span>
          </>
        )
      }

      if (isDragActive && isDragReject) {
        return (
          <>
            <p>Arquivo não suportado</p>
            <span>
              Apenas arquivos .jpg, .jpeg, .pjpeg, .png, e .gif. Tamanho máximo
              de 5MB
            </span>
          </>
        )
      }
    },
    []
  )

  return {
    renderDragMessage,
    setUploadedFiles,
    removeFromState,
    uploadedFiles,
    deleteFile,
    onDrop,
  }
}
