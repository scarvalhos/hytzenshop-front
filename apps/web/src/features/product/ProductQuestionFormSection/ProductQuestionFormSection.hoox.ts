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

export const useProductQuestionFormSection = ({
  product,
}: ProductQuestionFormSectionProps) => {
  const [formQuestion, setFormQuestion] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [seeAnswers, setSeeAnswers] = React.useState<string | undefined>()
  const [questionsPage, setQuestionsPage] = React.useState(1)

  const { control, register, handleSubmit } = useForm()

  const queryClient = useQueryClient()

  const createQuestionMutation = useMutation(createQuestion, {
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries(['product', product?.id])
      setLoading(false)
      setFormQuestion(false)
    },
    onError: defaultToastError,
  }).mutateAsync

  const onSubmit = React.useCallback(
    (values: FieldValues) => {
      setLoading(true)

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
    formQuestion,
    loading,
    seeAnswers,
    setSeeAnswers,
    questionsPage,
    setQuestionsPage,
    control,
    register,
    handleSubmit,
    onSubmit,
    setFormQuestion,
  }
}
