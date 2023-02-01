import * as React from 'react'

import { LoadingAnimation, Pagination } from '@luma/ui'
import { DashboardPagesHeader } from './DashboardPagesHeader'
import { c } from '@hytzenshop/helpers'

interface PaginationProps {
  page?: number
  limit?: number
  totalRegisters?: number
  onPageChange: (page: number) => void
}

interface HeaderProps {
  buttons?: React.FC
  inputs?: React.FC
  inputsMobile?: (props: {
    wrapper: (props: { children: React.ReactElement }) => React.ReactElement
  }) => React.ReactNode
}

interface DashboardPagesLayoutProps {
  title: string
  isLoading?: boolean
  renderList: React.FC
  pagination: PaginationProps
  header: HeaderProps
}

const DashboardPagesLayout: React.FC<DashboardPagesLayoutProps> = ({
  pagination,
  renderList,
  isLoading,
  header,
  title,
}) => {
  console.log(pagination.totalRegisters)
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
          {isLoading ? <LoadingAnimation size={160} /> : renderList({})}
        </div>

        {!isLoading && pagination.totalRegisters !== 0 && (
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
