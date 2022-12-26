import { Button, EvaluationStars, trucate } from '@luma/ui'
import { useEvaluationCard } from './EvaluationCard.hook'
import { Evaluation } from '@hytzenshop/types'
import { date } from '@hytzenshop/helpers'

import {
  TbBuildingStore,
  TbCheck,
  TbThumbDown,
  TbThumbUp,
  TbTruck,
} from 'react-icons/tb'

interface EvaluationCardProps {
  evaluation: Evaluation
  application: 'web' | 'adm'
  queryKey?: (string | number | undefined)[]
}

export const EvaluationCard: React.FC<EvaluationCardProps> = ({
  evaluation,
  application,
  queryKey,
}) => {
  const { updateEvaluationApprovement } = useEvaluationCard({ queryKey })

  return (
    <div className="bg-dark-gray-400 bg-opacity-50 p-4 rounded-md flex flex-row items-center justify-between">
      <div className="space-y-2">
        <span className="flex flex-row space-x-2 items-center">
          <p className="text-lg text-light-gray-100 font-medium">
            {evaluation.user.profile?.completeName?.split(' ')[0]}
          </p>{' '}
          <p>| Avaliado em {date(evaluation.createdAt || '')}</p>
        </span>

        <p>
          {trucate({
            text: evaluation.comment || '',
            line: 3,
          })}
        </p>
        <EvaluationStars
          note={evaluation.note}
          show="note"
          totalEvaluations={0}
        />
      </div>

      {application === 'adm' ? (
        <div className="flex flex-row items-center space-x-2">
          <Button
            href={`/dashboard/products/${evaluation.productId}`}
            variant="filled"
            className="bg-dark-gray-400 relative pl-10 text-light-gray-100 whitespace-nowrap"
            rounded
          >
            <TbBuildingStore className="absolute left-4" /> Ver produto
          </Button>

          <Button
            href={`/dashboard/orders/${evaluation.orderId}`}
            variant="filled"
            className="bg-dark-gray-300 relative pl-10 text-light-gray-100 whitespace-nowrap"
            rounded
          >
            <TbTruck className="absolute left-4" /> Ver pedido
          </Button>

          {evaluation.approved ? (
            <Button
              variant="filled"
              className="bg-success-400 relative pl-10 cursor-default whitespace-nowrap"
              rounded
            >
              <TbCheck className="absolute left-4" /> Aprovado
            </Button>
          ) : (
            <>
              <Button
                variant="filled"
                rounded
                className="bg-success-400 p-3"
                onClick={() =>
                  updateEvaluationApprovement({
                    id: evaluation.id,
                    approved: true,
                  })
                }
              >
                <TbThumbUp />
              </Button>

              <Button
                variant="filled"
                rounded
                className="bg-danger-400 p-3"
                onClick={() =>
                  updateEvaluationApprovement({
                    id: evaluation.id,
                    approved: false,
                  })
                }
              >
                <TbThumbDown />
              </Button>
            </>
          )}
        </div>
      ) : null}
    </div>
  )
}
