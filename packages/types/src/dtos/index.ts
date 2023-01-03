import { Chat } from '../types'

export type { CartGetAllDto, CartGetDto } from './cartDto'

export type { CategoryGetAllDto, CategoryGetDto } from './categoryDto'

export type { OrderGetAllDto, OrderGetDto } from './orderDto'

export type { ProductGetAllDto, ProductGetDto } from './productDto'

export type { SystemConfigDto } from './systemConfigDto'

export type { UserErrorDto, UserGetAllDto, UserGetDto } from './userDto'

export type { EvaluationGetAllDto, EvaluationGetDto } from './evaluationDto'

export type { QuestionGetAllDto, QuestionGetDto } from './questionDto'

export type NewsletterGetAllDto = {
  message: string
  data: {
    count: number
    newsletterSubs: any[]
  }
}

export type ChatGetAllDto = {
  message: string
  data: {
    count: number
    chats: Chat[]
  }
}

export type ChatGetDto = {
  message: string
  chat: Chat
}
