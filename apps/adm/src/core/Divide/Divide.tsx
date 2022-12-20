import * as React from 'react'

import { Box, Divider, useTheme } from '@mui/material'

export interface DivideProps {
  as?: React.FC<any>
  skipIndexes?: number[]
  children: React.ReactNode
}

export const DivideLine: React.FC<{
  orientation: 'vertical' | 'horizontal'
}> = ({ orientation = 'horizontal' }) => {
  return (
    <Divider
      orientation={orientation}
      sx={{
        borderColor: '#2c2c2c',
        ...(orientation === 'horizontal'
          ? {
              width: '90%',
            }
          : {
              width: 3,
              height: '3rem',
            }),
        mx: 'auto',
        my: 8,
      }}
    />
  )
}

const Divide: React.FC<DivideProps> = ({ as, children, skipIndexes = [] }) => {
  const { palette } = useTheme()

  const kids = React.useMemo(
    () =>
      (Array.isArray(children) ? children : [children]).filter(Boolean).flat(),
    [children]
  )

  const Wrapper = React.useMemo(
    () =>
      as
        ? as
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ({ children }: any) => <div>{children}</div>,
    [as]
  )

  return (
    <Wrapper>
      {kids.map((node, index) => (
        <React.Fragment key={index}>
          {index > 0 && !skipIndexes.includes(index) && (
            <Divider
              sx={{
                my: 6,
                borderColor: palette.primary.dark,
              }}
            />
          )}
          {skipIndexes.includes(index) && <Box mb={4} />}
          {node}
        </React.Fragment>
      ))}
    </Wrapper>
  )
}

export default Divide
