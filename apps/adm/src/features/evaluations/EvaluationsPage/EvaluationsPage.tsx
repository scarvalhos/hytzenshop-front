import { useEvaluationsPage } from './EvaluationsPage.hooks'
import { LoadAnimated } from '@core/LoadAnimated'
import { Pagination } from '@core/Pagination'
import { NextPage } from 'next'

import EvaluationsList from '@features/evaluations/EvaluationsList'
import React from 'react'

const EvaluationsPage: NextPage = () => {
  const { state, setPage, evaluationsQuery } = useEvaluationsPage()

  return (
    <div className="mx-8 my-24 space-y-4 max-w-5xl lg:mx-auto">
      <EvaluationsList evaluations={evaluationsQuery.data?.data.evaluations} />

      {evaluationsQuery.isLoading ? (
        <div className="flex items-center justify-center">
          <LoadAnimated />
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
