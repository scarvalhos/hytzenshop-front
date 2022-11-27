import * as React from 'react'

import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

interface StepperBarProps {
  steps: string[]
  statusBySteps?: number
}

const StepperBar: React.FC<StepperBarProps> = ({ steps, statusBySteps }) => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Stack width="100%" justifyContent="center" alignItems="center">
      <Stack position="relative" my={8} width="90%">
        {steps.map((item, index) => (
          <Box
            key={item}
            sx={{
              position: 'absolute',
              top: '-8px',
              left: `${(100 / (steps.length - 1)) * index}%`,
              bgcolor:
                (statusBySteps || 0) >= index
                  ? theme.palette.success.main
                  : theme.palette.primary.dark,
              height: '20px',
              width: '20px',
              borderRadius: '10px',
              border: `3px solid ${theme.palette.secondary.dark}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                lineHeight: 1,
                textAlign: 'center',
                fontSize: sm ? '0.5rem' : '0.875rem',
                mt: 8,
                zIndex: 9999,
              }}
            >
              {item}
            </Typography>
          </Box>
        ))}

        <Box
          sx={{
            bgcolor: theme.palette.primary.dark,
            height: '4px',
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: theme.palette.success.main,
              height: '4px',
              width: `${(100 / (steps.length - 1)) * (statusBySteps || 0)}%`,
              borderRadius: 2,
            }}
          ></Box>
        </Box>
      </Stack>
    </Stack>
  )
}

export default StepperBar
