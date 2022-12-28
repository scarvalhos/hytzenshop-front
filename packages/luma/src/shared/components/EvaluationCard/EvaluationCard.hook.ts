import { useMutation, useQueryClient } from '@tanstack/react-query'
import { defaultToastError } from '@hytzenshop/helpers'
import { EvaluationGetDto } from '@hytzenshop/types'
import { toast } from '@luma/ui'
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

export const useEvaluationCard = ({
  queryKey,
}: {
  queryKey?: (string | number | undefined)[]
}) => {
  const queryClient = useQueryClient()

  const updateEvaluationApprovementMutation = useMutation(
    updateEvaluationApprovement,
    {
      onSuccess: ({ data }) => {
        toast.success(data.message)
        queryClient.invalidateQueries(queryKey)
      },
      onError: defaultToastError,
    }
  )

  return {
    updateEvaluationApprovement:
      updateEvaluationApprovementMutation.mutateAsync,
  }
}
