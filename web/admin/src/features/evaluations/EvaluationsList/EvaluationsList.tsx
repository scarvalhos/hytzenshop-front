import { useEvaluationsPage } from '../EvaluationsPage/EvaluationsPage.hooks'
import { Evaluation } from '@hytzenshop/types'
import { Shared } from '@luma/ui'

interface EvaluationsListProps {
  evaluations?: Evaluation[]
}

const EvaluationsList: React.FC<EvaluationsListProps> = ({ evaluations }) => {
  const { queryKey } = useEvaluationsPage()

  return (
    <>
      {evaluations?.map((evaluation) => (
        <Shared.EvaluationCard
          key={evaluation.id}
          evaluation={evaluation}
          application="adm"
          queryKey={queryKey}
        />
      ))}
    </>
  )
}

export default EvaluationsList
