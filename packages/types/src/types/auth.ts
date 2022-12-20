interface Address {
  id: string
  street: string
  number: string
  district: string
  city: string
  uf: string
  cep: string
  country: string
  complement: string
}

interface Profile {
  id: string
  avatar?: string
  completeName?: string
  cpf?: string
  phone?: string
  birthDate?: string
  address?: Address
  createdAt?: string
  updatedAt?: string
}

interface User {
  id: string
  email: string
  username: string
  accessToken: string
  passwordResetToken?: string
  isAdmin: true
  profileId?: string
  profile?: Profile
  createdAt?: string
  updatedAt?: string
}

interface SignInCredentials {
  username: string
  password: string
  stayConnected?: boolean
  checkoutNextStep?: () => void
}

export type { Address, Profile, User, SignInCredentials }
