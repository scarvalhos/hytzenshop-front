import * as React from 'react'

import { DashboardPagesHeader } from './DashboardPagesHeader'
import { LoadingAnimation } from '@luma/ui'
import { Pagination } from '@core/Pagination'
import { c } from '@hytzenshop/helpers'

interface DashboardPagesLayoutProps {
  title: string
  isLoading?: boolean
  renderList: React.FC
  pagination: {
    page?: number
    limit?: number
    totalRegisters?: number
    onPageChange: (page: number) => void
  }
  header: {
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
}

const DashboardPagesLayout: React.FC<DashboardPagesLayoutProps> = ({
  pagination,
  isLoading,
  header,
  renderList: RenderList,
  title,
}) => {
  return (
    <>
      <DashboardPagesHeader
        title={title}
        buttons={header.buttons}
        inputs={header.inputs}
        loading={isLoading}
        inputsMobile={header.inputsMobile}
      />

      <div className="mb-20">
        <div className={c(isLoading && 'flex justify-center items-center')}>
          {isLoading ? <LoadingAnimation size={160} /> : <RenderList />}
        </div>

        {!isLoading && (
          <Pagination
            currentPage={pagination.page}
            totalCountOfRegisters={pagination.totalRegisters || 0}
            registersPerPage={pagination.limit}
            onPageChange={pagination.onPageChange}
          />
        )}
      </div>
    </>
  )
}

export default DashboardPagesLayout
