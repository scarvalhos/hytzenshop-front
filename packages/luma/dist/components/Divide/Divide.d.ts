import React from 'react'
export interface DivideProps {
  as?: React.FC<any>
  className?: string
  dividerClassName?: string
  skipIndexes?: number[]
  children?: React.ReactNode
}
export declare const DivideY: React.FC<DivideProps>
export declare const DivideLine: React.FC<DivideProps>
