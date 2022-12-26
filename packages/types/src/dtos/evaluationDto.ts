import { Evaluation } from '../types'

type EvaluationGetDto = {
  message: string
  evaluation: Evaluation
}

type EvaluationGetAllDto = {
  message: string
  data: {
    count: number
    evaluations: Evaluation[]
  }
}

export type { EvaluationGetDto, EvaluationGetAllDto }
