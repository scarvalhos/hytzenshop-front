import { CircularProgressbar } from 'react-circular-progressbar'
import { TbTrash } from 'react-icons/tb'
import { Button, theme } from '@luma/ui'
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

interface FileGridProps {
  files?: IFile[]
  onDelete: (id: string) => void
  onError?: (id: string) => Promise<void>
}

export const FileGrid: React.FC<FileGridProps> = ({ files, onDelete }) => {
  return (
    <div className="flex flex-row gap-4 flex-wrap">
      {files &&
        files.map((file) => (
          <div key={`${file.id}${file.name}`} className="relative w-fit">
            {file.uploaded && (
              <Button
                onClick={() => onDelete(file.id)}
                className="absolute -top-2 -right-2 p-2 flex bg-dark-gray-300 z-50 hover:brightness-125"
                rounded
              >
                <TbTrash size={16} className="text-danger-300" />
              </Button>
            )}

            <div
              className={c(
                'w-[100px] h-[100px] rounded-sm flex items-center justify-center',
                !file.uploaded &&
                  "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-sm before:opacity-60 before:bg-black before:z-10 transition-all"
              )}
            >
              {file.uploaded && (
                <Image
                  src={file.url}
                  alt={file.name}
                  width={100}
                  height={100}
                  style={{
                    borderRadius: '4px',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              )}
              {!file.uploaded && (
                <CircularProgressbar
                  styles={{
                    root: { width: 18, marginRight: 6, zIndex: 100 },
                    path: { stroke: theme.colors.success[300] },
                  }}
                  strokeWidth={10}
                  value={file.progress}
                />
              )}
            </div>
          </div>
        ))}
    </div>
  )
}
