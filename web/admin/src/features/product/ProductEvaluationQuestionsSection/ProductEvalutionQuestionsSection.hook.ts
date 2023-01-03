import * as React from 'react'

import { Product } from '@hytzenshop/types'

interface UseProductEvalutionQuestionsSectionProps {
  product?: Product
}

const getEvaluationsPercentages = (arr: any[]) => {
  return {
    5: Math.ceil(
      ((arr?.filter((e) => Math.floor(e.note) === 5)?.length ?? 0) /
        (arr?.length ?? 0)) *
        100
    ),
    4: Math.ceil(
      ((arr?.filter((e) => Math.floor(e.note) === 4)?.length ?? 0) /
        (arr?.length ?? 0)) *
        100
    ),
    3: Math.ceil(
      ((arr?.filter((e) => Math.floor(e.note) === 3)?.length ?? 0) /
        (arr?.length ?? 0)) *
        100
    ),
    2: Math.ceil(
      ((arr?.filter((e) => Math.floor(e.note) === 2)?.length ?? 0) /
        (arr?.length ?? 0)) *
        100
    ),
    1: Math.ceil(
      ((arr?.filter((e) => Math.floor(e.note) === 1)?.length ?? 0) /
        (arr?.length ?? 0)) *
        100
    ),
  }
}

export const useProductEvalutionQuestionsSection = ({
  product,
}: UseProductEvalutionQuestionsSectionProps) => {
  const [evaluationPage, setEvaluationPage] = React.useState(1)
  const [activeTab, setActiveTab] = React.useState<'evaluations' | 'questions'>(
    'evaluations'
  )

  const evaluationPercentages = getEvaluationsPercentages(
    product?.evaluation || []
  )

  const evaluations = React.useMemo(
    () => product?.evaluation?.filter((e) => e.approved),
    [product?.evaluation]
  )

  return {
    activeTab,
    evaluationPage,
    evaluationPercentages,
    evaluations,
    setActiveTab,
    setEvaluationPage,
  }
}
