import * as React from 'react'

const INPUT_TYPES = [
  'text',
  'email',
  'password',
  'cel',
  'tel',
  'cpf',
  'cpf_cnpj',
  'cnpj',
  'number',
  'money',
  'cep',
  'url',
  'crea',
  'kwp',
  'digito',
  'date',
  'search',
  'percentage',
] as const

export type InputTypes = typeof INPUT_TYPES[number]
type Masks = Partial<Record<InputTypes, unknown>>

const masks: Masks = {
  // date: 'DD/MM/YYYY',
  text: '',
  cep: '00000-000',
  cpf: '000.000.000-00',
  cnpj: '00.000.000/0000-00',
  cel: '(00) 00000-0000',
  tel: '(00) 0000-0000',
  digito: '0',
  number: /^\d+$/,
  money: [
    {
      mask: 'R$ money',
      blocks: {
        money: {
          mask: Number,
          scale: 2,
          thousandsSeparator: '.',
          radix: ',',
          mapToRadix: [','],
          normalizeZeros: true,
          padFractionalZeros: true,
          signed: false,
        },
      },
    },
  ],
  crea: '0.000.000',
  kwp: [
    {
      mask: 'num {kWp}',
      autofix: true,
      eager: true,
      blocks: {
        num: {
          mask: Number,
          scale: 2,
          thousandsSeparator: '.',
          radix: ',',
          mapToRadix: [','],
          normalizeZeros: true,
          padFractionalZeros: true,
          signed: false,
        },
      },
    },
  ],
  percentage: [
    {
      mask: 'num{%}',
      autofix: true,
      eager: true,
      blocks: {
        num: {
          mask: Number,
          scale: 2,
          thousandsSeparator: '.',
          radix: ',',
          mapToRadix: [','],
          normalizeZeros: true,
          padFractionalZeros: true,
          signed: true,
        },
      },
    },
  ],
  cpf_cnpj: [{ mask: '000.000.000-00' }, { mask: '00.000.000/0000-00' }],
}

const realtypes: Record<InputTypes, string> = {
  text: 'text',
  email: 'email',
  password: 'password',
  money: 'text',
  cel: 'tel',
  cnpj: 'text',
  cpf: 'text',
  number: 'text',
  tel: 'tel',
  cep: 'text',
  url: 'text',
  crea: 'text',
  kwp: 'text',
  cpf_cnpj: 'text',
  digito: 'text',
  date: 'date',
  search: 'text',
  percentage: 'text',
}

const defaultPlaceholders: Record<InputTypes, string> = {
  text: 'João da Silva',
  email: 'joaodasilva@email.com',
  password: 'Digite sua senha',
  money: 'R$ 0,00',
  cel: '(12) 99345-6789',
  tel: '(12) 3534-6789',
  cpf: '123.456.789-10',
  cnpj: '12.345.678/0001-91',
  number: '123',
  cep: '123456-789',
  url: 'exemplo.com.br',
  crea: '1.234.567',
  kwp: '4,00 kWp',
  cpf_cnpj: 'CPF ou CNPJ',
  digito: '0',
  date: '00/00/0000',
  search: 'Pesquise aqui',
  percentage: '0,0%',
}

export const useFieldInput = ({ name }: { name: string }) => {
  const id = React.useMemo(() => `${name}-f`, [name])

  return {
    masks,
    id,
    realtypes,
    defaultPlaceholders,
  }
}
