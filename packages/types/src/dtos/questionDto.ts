import { Question } from '../types'

type QuestionGetDto = {
  message: string
  question: Question
}

type QuestionGetAllDto = {
  message: string
  data: {
    count: number
    questions: Question[]
  }
}

export type { QuestionGetDto, QuestionGetAllDto }
