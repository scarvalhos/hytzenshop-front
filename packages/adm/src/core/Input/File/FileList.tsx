import { Container, FileInfo, Preview } from './styles'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdError, MdLink } from 'react-icons/md'
import { Stack, useTheme } from '@mui/material'
import { TbTrash } from 'react-icons/tb'
import { Link } from '@core/Link'

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
  onDelete: (id: string) => void
  onError?: (id: string) => Promise<void>
}

export const FileList: React.FC<FileListProps> = ({
  files,
  onDelete,
  onError,
}) => {
  const theme = useTheme()
  return (
    <Container>
      {files &&
        files.map((file) => (
          <li key={file.id}>
            <FileInfo>
              <Preview style={{ marginRight: 8 }}>
                <Image
                  src={file.preview}
                  alt={file.name}
                  width="40px"
                  height="40px"
                  objectFit="cover"
                  objectPosition="center"
                  style={{
                    borderRadius: '4px',
                  }}
                />
              </Preview>
              <Stack>
                <strong>{file.name}</strong>
                <span>{file.readableSize}</span>
              </Stack>
            </FileInfo>
            <Stack direction="row">
              {!file.uploaded && !file.error && (
                <CircularProgressbar
                  styles={{
                    root: { width: 18, marginRight: 6 },
                    path: { stroke: theme.palette.success.main },
                  }}
                  strokeWidth={10}
                  value={file.progress}
                />
              )}

              {file.error && (
                <>
                  <MdError size={24} color={theme.palette.primary.main} />
                  <button
                    type="button"
                    onClick={() => onError && onError(file.id)}
                  >
                    <TbTrash size={16} />
                  </button>
                </>
              )}

              {file.url && (
                <Link
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <MdLink size={20} color={theme.palette.text.secondary} />
                </Link>
              )}

              {file.uploaded && (
                <button type="button" onClick={() => onDelete(file.id)}>
                  <TbTrash size={16} />
                </button>
              )}
            </Stack>
          </li>
        ))}
    </Container>
  )
}
