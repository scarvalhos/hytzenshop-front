import { trucate, Button, Pagination, Input } from '@luma/ui'
import { useProductQuestionFormSection } from './ProductQuestionFormSection.hoox'
import { Product } from '@hytzenshop/types'
import { c, date } from '@hytzenshop/helpers'

import React from 'react'

export interface ProductQuestionFormSectionProps {
  product?: Product
}

const ProductQuestionFormSection: React.FC<ProductQuestionFormSectionProps> = ({
  product,
}) => {
  const {
    control,
    handleSubmit,
    loading,
    onSubmit,
    questionsPage,
    register,
    seeAnswers,
    setQuestionsPage,
    setSeeAnswers,
    formAnswerByQuestion,
    setFormAnswerByQuestion,
    reset,
  } = useProductQuestionFormSection({ product })

  return (
    <div className="md:max-w-screen-lg md:mx-auto space-y-2">
      {product?.questions.length === 0 ? (
        <div className="bg-warning-400 bg-opacity-10 text-warning-300 font-normal my-4 p-4 space-y-1 rounded-md text-center w-full">
          Esse produto ainda não possui nenhuma dúvida.
        </div>
      ) : product?.questions && product?.questions.length > 0 ? (
        <>
          {product?.questions
            .slice((questionsPage - 1) * 3, questionsPage * 3)
            .map((q) => (
              <div
                key={q.id}
                className="bg-dark-gray-400 bg-opacity-50 p-4 rounded-md flex flex-col"
              >
                <div className="space-y-2">
                  <span className="flex flex-row space-x-2 items-center">
                    <p className="text-lg text-light-gray-100 font-medium">
                      {q.name}
                    </p>
                    <p>{date(q.createdAt, { withHour: true })}</p>
                  </span>

                  <p>
                    {trucate({
                      text: q.question || '',
                      line: 3,
                    })}
                  </p>

                  {q.answers.length === 0 && (
                    <Button
                      className="text-success-300"
                      onClick={() => setFormAnswerByQuestion(q.id)}
                    >
                      Responder pergunta
                    </Button>
                  )}

                  {q.answers.length > 0 && seeAnswers !== q.id ? (
                    <Button
                      onClick={() => setSeeAnswers(q.id)}
                      className="text-success-300"
                    >
                      Ver resposta
                    </Button>
                  ) : seeAnswers === q.id ? (
                    <Button
                      onClick={() => setSeeAnswers(undefined)}
                      className="text-success-300"
                    >
                      Fechar resposta
                    </Button>
                  ) : null}
                </div>

                {formAnswerByQuestion === q.id ? (
                  <div className="px-6 space-y-2">
                    <Input.Textarea
                      placeholder="Escreva aqui..."
                      control={control}
                      variant="outlined"
                      rows={5}
                      isFullWidth
                      {...register('answer')}
                    />
                    <div className="flex flex-col sm:flex-row justify-end pt-4 max-sm:space-y-2 sm:space-x-2">
                      <Button
                        variant="filled"
                        rounded
                        className={c(
                          'max-sm:w-full bg-success-400',
                          loading && 'p-3'
                        )}
                        onClick={handleSubmit(onSubmit)}
                        loading={loading}
                      >
                        Enviar resposta
                      </Button>
                      <Button
                        variant="outlined"
                        className="max-sm:w-full"
                        onClick={() => {
                          setFormAnswerByQuestion(undefined)
                          reset()
                        }}
                        rounded
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : null}

                {seeAnswers === q.id ? (
                  <div className="space-y-4 pl-8 pt-3">
                    {q.answers.map((c) => (
                      <div key={c.id} className="space-y-2">
                        <p>
                          <strong>R.: </strong>
                          {trucate({
                            text: c.answer || '',
                            line: 3,
                          })}
                        </p>
                        <p>{date(c.createdAt, { withHour: true })}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

          <Pagination
            onPageChange={(page) => setQuestionsPage(page)}
            totalCountOfRegisters={product?.questions?.length || 0}
            currentPage={questionsPage}
            registersPerPage={3}
          />
        </>
      ) : null}
    </div>
  )
}

export default ProductQuestionFormSection
