import mongoose, { model } from 'mongoose'

interface IProduct {
  productId: string
  color: string
  size: string
  quantity: number
}

interface IOrder {
  userId: string
  products: IProduct[]
  amount: number
  address: {}
  status: string
  mpPaymentId: string
}

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        color: {
          type: String,
        },
        size: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
    mpPaymentId: {
      type: String,
    },
  },
  { timestamps: true }
)

export const Order = model<IOrder>('Order', OrderSchema)
