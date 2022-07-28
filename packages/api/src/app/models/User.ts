import mongoose, { model } from 'mongoose'

export interface IUser {
  username: string
  name: string
  email: string
  password: string
  isAdmin: boolean
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export const User = model<IUser>('User', UserSchema)
