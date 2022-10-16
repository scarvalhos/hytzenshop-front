import mongoose, { model } from 'mongoose'

interface Dados {
  completeName: string
  cpf: string
  phone: string
  birthDate: string
}

interface Address {
  street: string
  number: string
  district: string
  city: string
  uf: string
  cep: string
  country: string
  complement: string
}

export interface IUser {
  username: string
  name: string
  email: string
  password: string
  isAdmin: boolean
  avatar: string
  dados: Dados
  address: Address
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
    avatar: {
      type: String,
    },
    dados: {
      completeName: {
        type: String,
      },
      cpf: {
        type: String,
      },
      phone: {
        type: String,
      },
      birthDate: {
        type: String,
      },
    },
    address: {
      street: {
        type: String,
      },
      number: {
        type: String,
      },
      district: {
        type: String,
      },
      city: {
        type: String,
      },
      uf: {
        type: String,
      },
      cep: {
        type: String,
      },
      country: {
        type: String,
      },
      complement: {
        type: String,
      },
    },
  },
  { timestamps: true }
)

export const User = model<IUser>('User', UserSchema)
