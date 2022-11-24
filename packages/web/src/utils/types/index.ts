import { Address, User } from './auth'

export type PaymentStatus =
  | 'pending'
  | 'approved'
  | 'authorized'
  | 'in_process'
  | 'in_mediation'
  | 'rejected'
  | 'cancelled'
  | 'refunded'
  | 'charged_back'

export type OrderStatus =
  | 'pending'
  | 'approved'
  | 'processing'
  | 'sending'
  | 'delivered'

export interface FileRecord {
  _id: string
  name: string
  size: number
  key: string
  url: string
}

export interface Product {
  id: string
  images: FileRecord[]
  title: string
  description: string
  price: number
  categories: string[]
  sizes?: string[]
  colors?: string[]
  stock: number
}

export interface CartProduct {
  id?: string
  product?: Product
  productId?: string
  unitaryPrice?: number
  quantity?: number
  sizes?: string[]
  colors?: string[]
}

export interface Cart {
  id: string
  userId: string
  products: CartProduct[]
}

export interface Category {
  id: string
  name: string
}

export interface Order {
  id: string
  userId: string
  user: User
  addressId: string
  address: Address
  orderedProducts: CartProduct[]
  amount: number
  status: OrderStatus
  mpPaymentId: string
  createdAt: string
}

export interface SystemConfig {
  id?: string
  sliderImages?: FileRecord[]
  announcement?: string
  showAnnouncement?: boolean
}

export interface PaymentWebhookResponse {
  data: {
    id: string
    status: PaymentStatus
  }
}

export interface CepResponse {
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
}

export const states = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
  'DF',
] as const

export interface BrasilAPICepResponse {
  cep: string
  city: string
  location: unknown
  neighborhood: string
  service: string
  state: typeof states[number]
  street: string
}

export const statesOptions: { label: string; value: typeof states[number] }[] =
  [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Espirito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Pernambuco', value: 'PB' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' },
    { label: 'Distrito Federal', value: 'DF' },
  ]

export interface Option<T> {
  label: string
  value: T
}

export const sizes = ['P', 'M', 'G', 'GG'] as const

export type Sizes = typeof sizes[number]

export const sizesOptions: Option<Sizes>[] = [
  { label: 'P', value: 'P' },
  { label: 'M', value: 'M' },
  { label: 'G', value: 'G' },
  { label: 'GG', value: 'GG' },
]
