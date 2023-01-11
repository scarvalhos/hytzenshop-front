import { EvaluationGetAllDto, EvaluationGetDto } from '@hytzenshop/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@hytzenshop/services'

const updateEvaluationApprovement = async ({
  id,
  approved,
}: {
  id: string
  approved: boolean
}) => {
  return api.put<EvaluationGetDto>(`/evaluation/${id}?approved=${approved}`)
}

export const useEvaluationCard = ({ queryKey }: { queryKey?: unknown[] }) => {
  const queryClient = useQueryClient()

  const updateEvaluationApprovementMutation = useMutation(
    updateEvaluationApprovement,
    {
      onMutate: async ({ id, approved }) => {
        if (!queryKey) return

        await queryClient.cancelQueries({ queryKey })

        const previousEvaluations =
          queryClient.getQueryData<EvaluationGetAllDto>(queryKey)

        queryClient.setQueryData(queryKey, {
          ...previousEvaluations,
          data: {
            ...previousEvaluations?.data,
            evaluations: previousEvaluations?.data.evaluations.map((e) => {
              if (e.id === id) {
                return {
                  ...e,
                  approved,
                }
              }

              return e
            }),
          },
        })

        return {
          previousEvaluations,
          data: {
            ...previousEvaluations?.data,
            evaluations: previousEvaluations?.data.evaluations.map((e) => {
              if (e.id === id) {
                return {
                  ...e,
                  approved,
                }
              }

              return e
            }),
          },
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey })
      },

      onError: (_err, _newEvaluations, context) => {
        if (!queryKey) return
        queryClient.setQueryData(queryKey, context?.previousEvaluations)
      },
    }
  )

  return {
    updateEvaluationApprovement:
      updateEvaluationApprovementMutation.mutateAsync,
  }
}
