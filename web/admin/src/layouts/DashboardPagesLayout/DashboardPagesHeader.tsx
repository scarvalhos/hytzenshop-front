import * as React from 'react'

import { Loader } from '@luma/ui'

interface DashboardPagesHeaderProps {
  title: string
  loading?: boolean
  buttons?: React.FC
  inputs?: React.FC
  inputsMobile?: ({
    wrapper,
  }: {
    wrapper: ({
      children,
    }: {
      children: React.ReactElement
    }) => React.ReactElement
  }) => React.ReactNode
}

export const DashboardPagesHeader: React.FC<DashboardPagesHeaderProps> = ({
  inputsMobile,
  loading,
  buttons,
  inputs,
  title,
}) => {
  return (
    <div className="sticky top-20 mb-8 z-40 bg">
      <h1 className="bg text-primary py-2 font-semibold text-2xl">{title}</h1>

      <div className="bg-primary space-y-2 px-6 py-4 rounded-md relative shadow-md">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-2">
            {buttons && buttons({})}

            {loading && <Loader className="text-success-300" />}
          </div>

          <div className="flex flex-row justify-end space-x-2 lg:w-[50%]">
            {inputs && inputs({})}
          </div>
        </div>
      </div>

      {inputsMobile &&
        inputsMobile({
          wrapper: ({ children }) => (
            <div className="bg-primary shadow-md space-y-2 px-6 py-4 rounded-md mt-2 transition-all">
              {children}
            </div>
          ),
        })}
    </div>
  )
}
