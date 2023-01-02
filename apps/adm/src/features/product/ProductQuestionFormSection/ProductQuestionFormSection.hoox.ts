import { ProductQuestionFormSectionProps } from './ProductQuestionFormSection'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Answers, QuestionGetDto } from '@hytzenshop/types'
import { FieldValues, useForm } from 'react-hook-form'
import { defaultToastError } from '@hytzenshop/helpers'
import { toast } from '@luma/ui'
import { api } from '@hytzenshop/services'

import React from 'react'

const createQuestionAnswer = async ({
  answer,
  questionId,
}: Partial<Answers>) => {
  return api
    .post<QuestionGetDto>(`/products/question/${questionId}`, {
      answer,
    })
    .then(({ data }) => data)
}

export const useProductQuestionFormSection = ({
  product,
}: ProductQuestionFormSectionProps) => {
  const [seeAnswers, setSeeAnswers] = React.useState<string | undefined>()
  const [formAnswerByQuestion, setFormAnswerByQuestion] = React.useState<
    string | undefined
  >()

  const [loading, setLoading] = React.useState(false)
  const [questionsPage, setQuestionsPage] = React.useState(1)

  const { control, register, handleSubmit, reset } = useForm()

  const queryClient = useQueryClient()

  const createQuestionAnswerMutation = useMutation(createQuestionAnswer, {
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries(['product', product?.id])
      setLoading(false)
      setFormAnswerByQuestion(undefined)
      reset()
    },
    onError: defaultToastError,
  }).mutateAsync

  const onSubmit = React.useCallback(
    (values: FieldValues) => {
      setLoading(true)

      createQuestionAnswerMutation({
        answer: values.answer,
        questionId: formAnswerByQuestion,
      })
    },
    [createQuestionAnswerMutation, formAnswerByQuestion]
  )

  return {
    formAnswerByQuestion,
    loading,
    seeAnswers,
    setSeeAnswers,
    questionsPage,
    setQuestionsPage,
    control,
    register,
    handleSubmit,
    onSubmit,
    setFormAnswerByQuestion,
    reset,
  }
}
