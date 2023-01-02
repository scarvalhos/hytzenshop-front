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
  buttons: Buttons,
  inputs: Inputs,
  title,
}) => {
  return (
    <div className="sticky top-20 mb-8 z-40 bg-black">
      <h1 className="text-light-gray-100 py-2 bg-black font-semibold text-2xl">
        {title}
      </h1>

      <div className="bg-dark-gray-500 bg-opacity-40 space-y-2 px-6 py-4 rounded-md relative">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-2">
            {Buttons && <Buttons />}

            {loading && <Loader className="text-success-300" />}
          </div>

          <div className="flex flex-row justify-end space-x-2 lg:w-[50%]">
            {Inputs && <Inputs />}
          </div>
        </div>
      </div>

      {inputsMobile &&
        inputsMobile({
          wrapper: ({ children }) => (
            <div className="bg-dark-gray-500 bg-opacity-40 space-y-2 px-6 py-4 rounded-md mt-2 transition-all">
              {children}
            </div>
          ),
        })}
    </div>
  )
}
