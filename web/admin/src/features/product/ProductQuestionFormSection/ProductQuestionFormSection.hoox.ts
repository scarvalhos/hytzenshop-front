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

interface ProductQuestionFormStateProps {
  formAnswerByQuestion?: string
  loading?: boolean
  seeAnswers?: string
  questionsPage?: number
}

export const useProductQuestionFormSection = ({
  product,
}: ProductQuestionFormSectionProps) => {
  const [state, dispatch] = React.useReducer(
    (
      prev: ProductQuestionFormStateProps,
      next: ProductQuestionFormStateProps
    ) => {
      return { ...prev, ...next }
    },
    {
      formAnswerByQuestion: undefined,
      loading: false,
      seeAnswers: undefined,
      questionsPage: 1,
    }
  )

  const { control, register, handleSubmit, reset } = useForm()

  const queryClient = useQueryClient()

  const createQuestionAnswerMutation = useMutation(createQuestionAnswer, {
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries(['product', product?.id])

      dispatch({
        formAnswerByQuestion: undefined,
        loading: false,
      })

      reset()
    },
    onError: defaultToastError,
  }).mutateAsync

  const onSubmit = React.useCallback(
    (values: FieldValues) => {
      dispatch({ loading: true })

      createQuestionAnswerMutation({
        answer: values.answer,
        questionId: state.formAnswerByQuestion,
      })
    },
    [createQuestionAnswerMutation, state.formAnswerByQuestion]
  )

  return {
    ...state,
    setFormAnswerByQuestion: (formAnswerByQuestion?: string) =>
      dispatch({ formAnswerByQuestion }),
    setQuestionsPage: (questionsPage?: number) => dispatch({ questionsPage }),
    setSeeAnswers: (seeAnswers?: string) => dispatch({ seeAnswers }),
    handleSubmit,
    register,
    onSubmit,
    control,
    reset,
  }
}
