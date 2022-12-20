import * as React from 'react'

import { FormControlLabel, useTheme, Radio, useMediaQuery } from '@mui/material'

export interface DataProps {
  status: string | number
  message?: string
}

interface RadioInputProps {
  label: string
  value: string
  setRadioValue: (value: React.SetStateAction<string>) => void
}

const RadioInput: React.FC<RadioInputProps> = ({
  label,
  value,
  setRadioValue,
}) => {
  const theme = useTheme()

  const sm = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <FormControlLabel
      value={value}
      label={label}
      onChange={() => setRadioValue(value)}
      control={
        <Radio
          sx={{
            color: theme.palette.text.primary,
            padding: 0.5,
            marginRight: 1,

            '&:hover': {
              background: 'transparent',
            },
            '&.Mui-checked': { color: theme.palette.success.main },
            '& .MuiSvgIcon-root': {
              fontSize: 18,
            },
          }}
        />
      }
      sx={{
        fontWeight: 'bold',
        color: theme.palette.text.primary,
        background: theme.palette.primary.dark,
        padding: sm ? '1rem' : '0rem 1rem',
        flex: 1,
        borderRadius: 1,
        margin: 0,

        '& .MuiFormControlLabel-label': {
          fontSize: 14,
        },
      }}
    />
  )
}

export default RadioInput
