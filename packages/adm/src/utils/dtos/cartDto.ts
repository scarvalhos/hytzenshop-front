import { Cart } from '@utils/types'

type CartGetDto = {
  message: string
  cart: Cart
}

type CartGetAllDto = {
  message: string
  data: {
    count: number
    carts: Cart[]
  }
}

export type { CartGetDto, CartGetAllDto }
