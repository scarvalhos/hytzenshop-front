import mongoose, { model } from 'mongoose'

interface IProduct {
  title: string
  description: string
  images: {
    id: string
    name: string
    url: string
  }[]
  categories: []
  size: []
  color: []
  price: number
  stock: number
  inStock: boolean
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        id: {
          type: String,
        },
        name: {
          type: String,
        },

        url: {
          type: String,
        },
      },
    ],
    categories: {
      type: [],
    },
    size: {
      type: [],
    },
    color: {
      type: [],
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 1,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

export const Product = model<IProduct>('Product', ProductSchema)
