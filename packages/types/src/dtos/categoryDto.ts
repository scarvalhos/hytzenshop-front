import { Category } from '../types'

type CategoryGetDto = {
  message: string
  category: Category
}

type CategoryGetAllDto = {
  message: string
  data: {
    count: number
    categories: Category[]
  }
}

export type { CategoryGetDto, CategoryGetAllDto }