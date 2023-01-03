import { LoadingAnimation, Pagination } from '@luma/ui'
import { useEvaluationsPage } from './EvaluationsPage.hooks'
import { NextPage } from 'next'

import EvaluationsList from '@features/evaluations/EvaluationsList'
import React from 'react'

const EvaluationsPage: NextPage = () => {
  const { state, setPage, evaluationsQuery } = useEvaluationsPage()

  return (
    <div className="mb-20 space-y-4">
      <EvaluationsList evaluations={evaluationsQuery.data?.data.evaluations} />

      {evaluationsQuery.isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingAnimation size={160} />
        </div>
      ) : null}

      {!evaluationsQuery.isLoading && evaluationsQuery?.data?.data.count ? (
        <Pagination
          currentPage={state.page}
          totalCountOfRegisters={evaluationsQuery?.data?.data.count || 0}
          onPageChange={setPage}
          registersPerPage={state.limit}
        />
      ) : null}
    </div>
  )
}

export default EvaluationsPage
