import mongoose, { model } from 'mongoose'

interface ICategory {
  category: string
}

const CategorySchema = new mongoose.Schema<ICategory>({
  category: {
    type: String,
    unique: true,
  },
})

export const Category = model<ICategory>('Category', CategorySchema)
