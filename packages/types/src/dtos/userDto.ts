import { User } from '../types/auth'

type UserGetDto = {
  message: string
  user: User
}

type UserGetAllDto = {
  message: string
  data: {
    count: number
    users: User[]
  }
}

type UserErrorDto = {
  response: {
    data: string
  }
}

export type { UserGetDto, UserGetAllDto, UserErrorDto }
