import * as React from 'react'

import { Stack, Typography, useTheme } from '@mui/material'

interface BoxSectionProps {
  title: string
  description?: string
  children?: React.ReactNode
  spacing?: boolean
  renderAfterTitle?: () => React.ReactNode
}

const BoxSection: React.FC<BoxSectionProps> = React.forwardRef(
  ({ title, description = '', children, renderAfterTitle, spacing }, ref) => {
    const theme = useTheme()
    return (
      <Stack spacing={spacing ? 2 : 0} flex={1} ref={ref}>
        <Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              fontSize="1rem"
              color={theme.palette.text.primary}
              fontWeight="medium"
            >
              {title}
            </Typography>
            {renderAfterTitle && renderAfterTitle()}
          </Stack>

          <Typography fontSize="0.875rem">{description}</Typography>
        </Stack>

        {children}
      </Stack>
    )
  }
)

export default BoxSection
