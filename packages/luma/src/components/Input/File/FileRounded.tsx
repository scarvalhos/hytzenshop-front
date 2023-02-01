import { CircularProgressbar } from 'react-circular-progressbar'
import { Button, theme } from '@luma/ui'
import { TbPencil } from 'react-icons/tb'
import { MdError } from 'react-icons/md'
import { c } from '@hytzenshop/helpers'

import Image from 'next/image'

export interface IFile {
  id: string
  preview: string
  name: string
  readableSize: string
  progress: number
  uploaded: boolean
  error: boolean
  url: string
}

interface FileRoundedProps {
  files?: IFile[]
  onDelete: (id: string) => void
  onError?: (id: string) => Promise<void>
  containerClassName?: string
}

export const FileRounded: React.FC<FileRoundedProps> = ({
  containerClassName,
  onDelete,
  onError,
  files,
}) => {
  return (
    <div
      className={c(
        'flex flex-row gap-4 flex-wrap bg-dark-gray-400 rounded-full',
        containerClassName
      )}
    >
      {files &&
        files.map((file) => (
          <div key={`${file.id}${file.name}`} className="relative w-fit">
            {(file.uploaded || file.error) && (
              <Button
                onClick={() =>
                  file.error && onError ? onError(file.id) : onDelete(file.id)
                }
                className="absolute bottom-0 right-0 p-2 flex bg-secondary shadow-lg z-40 hover:brightness-125"
                rounded
              >
                <TbPencil size={16} className="text-success-300" />
              </Button>
            )}

            <div
              className={c(
                'w-32 h-32 rounded-full flex items-center justify-center relative',
                !file.uploaded &&
                  "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:opacity-80 before:bg-black before:z-10 transition-all"
              )}
            >
              {file.error && (
                <MdError
                  size={24}
                  color={theme.colors.danger[300]}
                  className="z-[100] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
                />
              )}

              {!file.uploaded && !file.error && (
                <CircularProgressbar
                  styles={{
                    root: { width: 18, marginRight: 6 },
                    path: { stroke: theme.colors.success[300] },
                  }}
                  className="z-[100] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
                  strokeWidth={10}
                  value={file.progress}
                />
              )}

              <div className="w-32 h-32 rounded-full relative">
                <Image
                  src={file.url ? file.url : file.preview}
                  alt={file.name}
                  fill
                  sizes="100%"
                  className="z-0 object-cover object-center rounded-full"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
