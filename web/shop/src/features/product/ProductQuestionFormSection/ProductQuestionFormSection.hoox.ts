import { ProductQuestionFormSectionProps } from './ProductQuestionFormSection'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Question, QuestionGetDto } from '@hytzenshop/types'
import { FieldValues, useForm } from 'react-hook-form'
import { defaultToastError } from '@hytzenshop/helpers'
import { toast } from '@luma/ui'
import { api } from '@hytzenshop/services'

import React from 'react'

const createQuestion = async ({
  name,
  email,
  question,
  productId,
}: Partial<Question>) => {
  return api
    .post<QuestionGetDto>('/products/question', {
      name,
      email,
      question,
      productId,
    })
    .then(({ data }) => data)
}

interface ProductQuestionFormStateProps {
  formQuestion?: boolean
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
      formQuestion: false,
      loading: false,
      seeAnswers: undefined,
      questionsPage: 1,
    }
  )

  const { control, register, handleSubmit } = useForm()

  const queryClient = useQueryClient()

  const createQuestionMutation = useMutation(createQuestion, {
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries(['product', product?.id])
      dispatch({ loading: false, formQuestion: false })
    },
    onError: defaultToastError,
  }).mutateAsync

  const onSubmit = React.useCallback(
    (values: FieldValues) => {
      dispatch({ loading: true })

      createQuestionMutation({
        name: values.name,
        email: values.email,
        question: values.question,
        productId: product?.id,
      })
    },
    [createQuestionMutation, product?.id]
  )

  return {
    questionsPage: state.questionsPage,
    formQuestion: state.formQuestion,
    seeAnswers: state.seeAnswers,
    loading: state.loading,
    setSeeAnswers: (answerId?: string) => dispatch({ seeAnswers: answerId }),
    setFormQuestion: (formQuestion?: boolean) => dispatch({ formQuestion }),
    setQuestionsPage: (questionsPage?: number) => dispatch({ questionsPage }),
    handleSubmit,
    register,
    onSubmit,
    control,
  }
}
