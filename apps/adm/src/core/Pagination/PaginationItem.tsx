import { IconButton, useTheme } from '@mui/material'

interface PaginationItemProps {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export const PaginationItem: React.FC<PaginationItemProps> = ({
  isCurrent = false,
  number,
  onPageChange,
}) => {
  const theme = useTheme()

  if (isCurrent) {
    return (
      <IconButton
        sx={{
          borderRadius: 1,
          bgcolor: theme.palette.primary.dark,
          width: '32px',
          height: '32px',
          p: 1,
          fontSize: '1rem',
          color: theme.palette.text.primary,
          ':hover': {
            bgcolor: theme.palette.secondary.dark,
          },
        }}
      >
        {number}
      </IconButton>
    )
  }

  return (
    <IconButton
      sx={{
        borderRadius: 1,
        bgcolor: theme.palette.primary.dark,
        width: '32px',
        height: '32px',
        p: 1,
        fontSize: '1rem',
        color: theme.palette.text.disabled,
        ':hover': {
          bgcolor: theme.palette.secondary.dark,
        },
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </IconButton>
  )
}
