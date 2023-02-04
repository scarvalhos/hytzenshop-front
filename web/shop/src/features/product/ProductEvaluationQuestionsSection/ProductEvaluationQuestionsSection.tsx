import { Shared, Button, EvaluationStars, Pagination } from '@luma/ui'
import { useProductEvalutionQuestionsSection } from './ProductEvalutionQuestionsSection.hook'
import { c, generateArrayOfNumbers } from '@hytzenshop/helpers'
import { Evaluation, Product } from '@hytzenshop/types'

import ProductQuestionFormSection from '../ProductQuestionFormSection'
import React from 'react'

interface ProductEvalutionQuestionsSectionProps {
  product?: Product
}

interface TabsProps {
  setActiveTab: React.Dispatch<
    React.SetStateAction<'evaluations' | 'questions'>
  >
  activeTab: 'evaluations' | 'questions'
  evaluations?: Evaluation[]
  product?: Product
}

const Tabs: React.FC<TabsProps> = ({
  setActiveTab,
  activeTab,
  evaluations,
  product,
}) => {
  return (
    <div className="flex flex-row border-b border-light-gray-200 dark:border-dark-gray-400 w-full">
      <Button onClick={() => setActiveTab('evaluations')} className="relative">
        <p
          className={c(
            ' whitespace-nowrap py-2',
            activeTab === 'evaluations'
              ? "text-success-300 before:content-[''] before:rounded-t-sm before:w-[100%] before:h-[3px] before:bg-success-300 before:absolute before:bottom-0 before:left-0"
              : 'text-light-gray-500'
          )}
        >
          Avaliações ({evaluations?.length})
        </p>
      </Button>

      <Button onClick={() => setActiveTab('questions')} className="relative">
        <p
          className={c(
            'whitespace-nowrap py-2',
            activeTab === 'questions'
              ? "text-success-300 before:content-[''] before:rounded-t-sm before:w-[100%] before:h-[3px] before:bg-success-300 before:absolute before:bottom-0 before:left-0"
              : 'text-light-gray-500'
          )}
        >
          Perguntas ({product?.questions.length})
        </p>
      </Button>
    </div>
  )
}

const ProductEvalutionQuestionsSection: React.FC<
  ProductEvalutionQuestionsSectionProps
> = ({ product }) => {
  const {
    activeTab,
    evaluationPage,
    evaluationPercentages,
    evaluations,
    setActiveTab,
    setEvaluationPage,
  } = useProductEvalutionQuestionsSection({ product })

  const content = {
    evaluations: (
      <div>
        {evaluations?.length === 0 ? (
          <div className="bg-primary text-secondary font-medium my-4 p-4 space-y-1 rounded-md text-center w-full cursor-default">
            Esse produto ainda não possui nenhuma avaliação.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {evaluations
                ?.slice((evaluationPage - 1) * 3, evaluationPage * 3)
                ?.map((e) => (
                  <Shared.EvaluationCard
                    key={e.id}
                    evaluation={e}
                    application="web"
                  />
                ))}
            </div>

            <Pagination
              onPageChange={(page) => setEvaluationPage(page)}
              totalCountOfRegisters={evaluations?.length || 0}
              currentPage={evaluationPage}
              registersPerPage={3}
            />
          </>
        )}
      </div>
    ),
    questions: <ProductQuestionFormSection product={product} />,
  }

  return (
    <div className={c('px-8 md:px-16 my-20 max-w-screen-2xl mx-auto')}>
      {evaluations?.length === 0 ? null : (
        <div className="bg-primary rounded-md p-6 flex flex-col sm:flex-row justify-between sm:items-center my-4 max-sm:space-y-4">
          <div className="flex flex-col flex-1 space-y-2 items-center justify-center pr-4">
            <p className="text-xl text-primary font-medium">Avaliação média</p>
            <EvaluationStars
              size={32}
              noteClassname="text-2xl text-success-300 font-semibold"
              note={product?.averageRating || 0}
              totalEvaluations={product?.evaluation?.length || 0}
              show="note"
            />
          </div>

          <div className="flex-1 space-y-2 px-6">
            <p>Total de {product?.evaluation?.length} avaliações</p>

            {generateArrayOfNumbers(1, 6)
              .reverse()
              .map((n) => (
                <div key={n} className="flex items-center space-x-2">
                  <div className="bg-third shadow-none w-full max-w-md h-2 rounded-full relative">
                    <p className="absolute -left-4 -top-1 m-0">{n}</p>
                    <div
                      className="h-full bg-success-300 rounded-full transition-all"
                      style={{
                        width: `${evaluationPercentages[n as never]}%`,
                      }}
                    />
                  </div>
                  <p>{evaluationPercentages[n as never]}%</p>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="rounded-md flex flex-col">
        <Tabs
          activeTab={activeTab}
          evaluations={evaluations}
          product={product}
          setActiveTab={setActiveTab}
        />

        <main className="py-6">{content[activeTab]}</main>
      </div>
    </div>
  )
}

export default ProductEvalutionQuestionsSection
