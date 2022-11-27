import { Order } from '@utils/types'

type OrderGetDto = {
  message: string
  order: Order
}

type OrderGetAllDto = {
  message: string
  data: {
    count: number
    orders: Order[]
  }
}

export type { OrderGetDto, OrderGetAllDto }
