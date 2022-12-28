import { CircularProgressbar } from 'react-circular-progressbar'
import { MdError, MdLink } from 'react-icons/md'
import { TbTrash } from 'react-icons/tb'
import { theme } from '@luma/ui'

import Image from 'next/image'
import Link from '@core/Link'

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

interface FileListProps {
  files?: IFile[]
  onDelete: (id: string) => void
  onError?: (id: string) => Promise<void>
}

export const FileList: React.FC<FileListProps> = ({
  files,
  onDelete,
  onError,
}) => {
  return (
    <div className="w-full space-y-4">
      {files &&
        files.map((file) => (
          <li
            key={file.id}
            className="w-full flex justify-between items-center text-light-gray-100 bg-dark-gray-500 p-2 rounded-sm"
          >
            <div className="flex items-center w-full">
              <div
                className="relative w-[42px] h-[42px] rounded-sm flex items-center justify-center"
                style={{ marginRight: 8 }}
              >
                <Image
                  src={file.preview}
                  alt={file.name}
                  fill
                  sizes="100%"
                  priority
                  className="rounded-sm object-cover object-center"
                />
              </div>

              <div>
                <strong>{file.name}</strong>
                <span>{file.readableSize}</span>
              </div>
            </div>

            <div className="flex flex-row space-x-2 pr-2">
              {!file.uploaded && !file.error && (
                <CircularProgressbar
                  styles={{
                    root: { width: 18, marginRight: 6 },
                    path: { stroke: theme.colors.success[300] },
                  }}
                  strokeWidth={10}
                  value={file.progress}
                />
              )}

              {file.error && (
                <>
                  <MdError size={24} color={theme.colors.danger[300]} />
                  <button
                    type="button"
                    onClick={() => onError && onError(file.id)}
                  >
                    <TbTrash size={16} />
                  </button>
                </>
              )}

              {file.url && (
                <Link href={file.url} target="_blank" download={true}>
                  <MdLink size={20} color={theme.colors['light-gray'][500]} />
                </Link>
              )}

              {file.uploaded && (
                <button type="button" onClick={() => onDelete(file.id)}>
                  <TbTrash size={16} className="text-danger-300" />
                </button>
              )}
            </div>
          </li>
        ))}
    </div>
  )
}
