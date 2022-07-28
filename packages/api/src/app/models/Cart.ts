import mongoose, { model } from 'mongoose'

interface IProduct {
  productId: string
  unitaryPrice: number
  color: string
  size: string
  quantity: number
}

interface ICart {
  userId: string
  products: IProduct[]
}

const CartSchema = new mongoose.Schema<ICart>(
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
        unitaryPrice: {
          type: Number,
          default: 1,
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
  },
  { timestamps: true }
)

export const Cart = model<ICart>('Cart', CartSchema)
