import { Box, IconButton, Stack, useTheme } from '@mui/material'
import { CircularProgressbar } from 'react-circular-progressbar'
import { TbTrash } from 'react-icons/tb'
import { Preview } from './styles'

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
  const theme = useTheme()

  return (
    <Stack direction="row" sx={{ flexFlow: 'wrap', gap: 2 }}>
      {files &&
        files.map((file) => (
          <Box
            key={`${file.id}${file.name}`}
            position="relative"
            width="fit-content"
          >
            {file.uploaded && (
              <IconButton
                onClick={() => onDelete(file.id)}
                sx={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  background: theme.palette.primary.dark,
                  zIndex: 999,
                  ':hover': {
                    background: theme.palette.primary.dark,
                    filter: 'brightness(1.2)',
                  },
                }}
              >
                <TbTrash size={16} color={theme.palette.primary.main} />
              </IconButton>
            )}

            <Preview size="100px" loading={!file.uploaded}>
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
                    path: { stroke: theme.palette.success.main },
                  }}
                  strokeWidth={10}
                  value={file.progress}
                />
              )}
            </Preview>
          </Box>
        ))}
    </Stack>
  )
}
