export type RadioValue = 'BOLETO' | 'PIX' | 'CREDITO' | ''

export interface PaymentMethods {
  bolbradesco: string
  pix: string
  debelo: string
  master: string
  Visa: string
  elo: string
  hipercard: string
  amex: string
  account_money: string
  pec: string
  [key: string]: string
}

export const paymentMethods: PaymentMethods = {
  bolbradesco: '?method=boleto',
  pix: '?method=pix',
  debelo: '',
  master: '',
  Visa: '',
  elo: '',
  hipercard: '',
  amex: '',
  account_money: '',
  pec: '',
}

export const paymentMethodsMessage: PaymentMethods = {
  bolbradesco: 'Não foi possível gerar o seu boleto. Tente novamente!',
  pix: 'Não foi possível gerar o pix. Tente novamente!',
  debelo: '',
  master: '',
  Visa: '',
  elo: '',
  hipercard: '',
  amex: '',
  account_money: '',
  pec: '',
}
