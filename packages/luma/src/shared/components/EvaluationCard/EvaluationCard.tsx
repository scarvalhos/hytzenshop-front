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
          <p>| {date(evaluation.createdAt || '')}</p>
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
          totalEvaluations={1}
        />
      </div>

      {application === 'adm' ? (
        <div className="flex flex-col sm:flex-row items-center max-sm:space-y-2 sm:space-x-2">
          <Button
            href={`/dashboard/products/${evaluation.productId}`}
            variant="filled"
            className="bg-dark-gray-400 lg:relative lg:pl-10 max-lg:p-3 text-light-gray-100 whitespace-nowrap"
            rounded
          >
            <TbBuildingStore className="lg:absolute lg:left-4" />
            <p className="max-lg:hidden">Ver produto</p>
          </Button>

          <Button
            href={`/dashboard/orders/${evaluation.orderId}`}
            variant="filled"
            className="bg-dark-gray-300 lg:relative lg:pl-10 max-lg:p-3 text-light-gray-100 whitespace-nowrap"
            rounded
          >
            <TbTruck className="lg:absolute lg:left-4" />
            <p className="max-lg:hidden">Ver pedido</p>
          </Button>

          {evaluation.approved ? (
            <Button
              variant="filled"
              className="bg-success-400 md:relative md:pl-10 max-md:p-3 cursor-default whitespace-nowrap"
              rounded
            >
              <TbCheck className="md:absolute md:left-4" />
              <p className="max-md:hidden">Aprovado</p>
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
