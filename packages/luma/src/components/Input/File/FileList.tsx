import { CircularProgressbar } from 'react-circular-progressbar'
import { MdError, MdLink } from 'react-icons/md'
import { TbTrash } from 'react-icons/tb'
import { theme } from '@luma/ui'
import { Link } from '../../Link'
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

interface FileListProps {
  files?: IFile[]
  listItemRounded?: boolean
  onDelete: (id: string) => void
  onError?: (id: string) => Promise<void>
}

export const FileList: React.FC<FileListProps> = ({
  files,
  onDelete,
  onError,
  listItemRounded,
}) => {
  return (
    <div className="w-full space-y-4">
      {files &&
        files.map((file) => (
          <li
            key={file.id}
            className={c(
              'w-full flex justify-between items-center text-light-gray-100 bg-dark-gray-500 p-2',
              listItemRounded ? 'rounded-full' : 'rounded-md'
            )}
          >
            <div className="flex items-center w-full">
              <div
                className={c(
                  'relative w-[36px] h-[36px] flex items-center justify-center mr-4',
                  listItemRounded ? 'rounded-full' : 'rounded-md'
                )}
              >
                <Image
                  src={file.preview}
                  alt={file.name}
                  sizes="100%"
                  priority
                  fill
                  className={c(
                    'object-cover object-center',
                    listItemRounded ? 'rounded-full' : 'rounded-md'
                  )}
                />
              </div>

              <span className="flex items-center space-x-2">
                <strong>{file.name}</strong>
                <p className="text-sm pt-1.5">{file.readableSize}</p>
              </span>
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
                  <MdError size={20} className="text-danger-300" />

                  <button
                    type="button"
                    onClick={() => onError && onError(file.id)}
                  >
                    <TbTrash size={18} className="text-danger-300" />
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
