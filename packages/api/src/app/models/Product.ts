import mongoose, { model } from 'mongoose'

interface IProduct {
  title: string
  description: string
  image: string
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
    image: {
      type: String,
      required: true,
    },
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
