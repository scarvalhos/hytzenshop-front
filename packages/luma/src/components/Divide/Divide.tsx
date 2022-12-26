import React from 'react'

import { c } from '../../utils/helpers'

export interface DivideProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id?: string
  as?: React.FC<any>
  className?: string
  dividerClassName?: string
  skipIndexes?: number[]
  children?: React.ReactNode
}

export const DivideY: React.FC<DivideProps> = ({
  as,
  children,
  className,
  dividerClassName,
  skipIndexes = [],
}) => {
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
          ({ children }: any) => <div className={className}>{children}</div>,
    [as, className]
  )

  return (
    <Wrapper>
      {kids.map((node, index) => (
        <React.Fragment key={index}>
          {index > 0 && !skipIndexes.includes(index) && (
            <hr className={c('my-10 border-dark-gray-300', dividerClassName)} />
          )}
          {skipIndexes.includes(index) && <div className="mb-4" />}
          {node}
        </React.Fragment>
      ))}
    </Wrapper>
  )
}

export const DivideLine: React.FC<DivideProps> = ({ dividerClassName, id }) => {
  return (
    <hr id={id} className={c('my-10 border-dark-gray-300', dividerClassName)} />
  )
}
