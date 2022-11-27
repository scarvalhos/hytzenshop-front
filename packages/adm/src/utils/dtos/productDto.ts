import { Product } from '@utils/types'

type ProductGetDto = {
  message: string
  product: Product
}

type ProductGetAllDto = {
  message: string
  data: {
    count: number
    products: Product[]
  }
}

export type { ProductGetDto, ProductGetAllDto }
