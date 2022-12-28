import { Address, User } from './auth'
import { theme } from '@luma/ui'

export * from './auth'
export * from './etc'

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
  | 'cancelled'
  | 'authorized'
  | 'in_process'
  | 'in_mediation'
  | 'rejected'
  | 'refunded'
  | 'charged_back'

export interface FileRecord {
  _id: string
  id?: string
  name: string
  size: number
  key: string
  url: string
}

// Answers

export interface Answers {
  id: string
  answer: string
  question: Question
  questionId: string
  createdAt: string
  updatedAt: string
}

// Question

export interface Question {
  id: string
  name: string
  email: string
  question: string
  answers: Answers[]
  product: Product
  productId: string
  createdAt: string
  updatedAt: string
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
  evaluation?: Evaluation[]
  averageRating?: number
  questions: Question[]
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
  shipping?: string
  evaluation?: Evaluation[]
}

export interface Evaluation {
  id: string
  user: User
  order: Order
  product: Product
  note: number
  comment?: string
  userId: string
  orderId: string
  productId: string
  approved?: boolean
  createdAt?: string
}

export interface SystemConfig {
  id?: string
  sliderImages?: FileRecord[]
  announcement?: string
  showAnnouncement?: boolean
}

export interface PaginationParams {
  page?: number
  limit?: number
  filter?: string
  sort?: string
  order?: string
}

export interface PaymentSocketResponse {
  data: {
    id: string
    status: PaymentStatus
    orderId: string
  }
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

export interface CepResponse {
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string

  bairro?: string
  complemento?: string
  ddd?: string
  gia?: string
  ibge?: string
  localidade?: string
  logradouro?: string
  siafi?: string
  uf?: typeof states[number]
}

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

export const statusOrders = [
  'pending',
  'approved',
  'processing',
  'sending',
  'delivered',
  'cancelled',
  'authorized',
  'in_process',
  'in_mediation',
  'rejected',
  'refunded',
  'charged_back',
] as const

export type StatusOrders = typeof statusOrders[number]

export const displayStatusOrders: Record<StatusOrders, string> = {
  pending: 'Pendente',
  approved: 'Pagamento aprovado',
  processing: 'Processando',
  sending: 'Enviando',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
  authorized: 'Autorizado',
  in_process: 'Processando',
  rejected: 'Recusado',
  refunded: 'Devolvido',
  charged_back: 'Cobrado de volta',
  in_mediation: 'Em mediação',
}

export const statusOrdersColor = (s: StatusOrders) => {
  switch (s) {
    case 'pending':
      return 'bg-warning-400'

    case 'approved':
    case 'delivered':
    case 'authorized':
    case 'in_process':
      return 'bg-success-400'

    case 'processing':
      return 'bg-light-gray-500'

    case 'sending':
      return 'bg-primary-300'

    case 'cancelled':
    case 'rejected':
    case 'refunded':
      return 'bg-danger-300'

    case 'charged_back':
    case 'in_mediation':
      return 'bg-dark-gray-100'

    default:
      return theme.colors['dark-gray'][400]
  }
}

export const statusOrdersOptions: Option<StatusOrders>[] = [
  ...statusOrders.map((value) => ({
    label: displayStatusOrders[value],
    value,
  })),
]

// SHIPPING SIMULATION

export type ShippingService = 'E' | 'X' | 'M' | 'R'

export interface ShippingSimulationBody {
  cepOrigem: string
  cepDestino: string
  origem: string
  produtos: [
    {
      peso: number
      altura: number
      largura: number
      comprimento: number
      tipo: 'C' | 'E'
      valor: number
      produto: string
    }
  ]
  servicos: ShippingService[]
  ordernar?: 'preco' | 'prazo'
}

export interface ShippingSimulationResponse {
  vlrFrete: number
  prazoEnt: number
  dtPrevEnt: string
  tarifas: [
    {
      valor: number
      descricao: string
    }
  ]
  error: {
    codigo: string
    mensagem: string
  }
  idSimulacao: number
  idTransp: number
  cnpjTransp: string
  idTranspResp: number
  cnpjTranspResp: string
  alertas: any
  nf_obrig: string
  url_logo: string
  transp_nome: string
  descricao: string
  servico: ShippingService
  referencia: string
}
