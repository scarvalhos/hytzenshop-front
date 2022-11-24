import * as yup from 'yup'

import YupPassword from 'yup-password'
import { cpf, cnpj } from 'cpf-cnpj-validator'

YupPassword(yup)

const PASS_MSG = `Deve conter ao menos 08 caracteres, 01 número, 01 letra maíscula, 01 letra minúscula, 01 caracter especial.`

export const validatePersonalDataSchema = yup.object().shape({
  cpf: yup.string().required('Cpf é obrigatório!'),
  phone: yup.string().required('Celular é obrigatório!'),
  birthDate: yup.string().required('Data de nascimento é obrigatório!'),
  completeName: yup.string().required('Nome completo é obrigatório!'),
  cep: yup.string().required('Cep é obrigatório!'),
  city: yup.string().required('Cidade obrigatório!'),
  district: yup.string().required('Bairro obrigatório!'),
  street: yup.string().required('Rua é obrigatória!'),
  uf: yup.string().required('Estado obrigatório!'),
  complement: yup.string().optional(),
  number: yup.string().required('Número é obrigatório!'),
  country: yup.string().required('País é obrigatório!'),
})

export const validateLoginSchema = yup.object().shape({
  username: yup.string().required('Username é obrigatório!'),
  password: yup
    .string()
    .typeError('Senha inválida')
    .min(8, PASS_MSG)
    .minNumbers(1, PASS_MSG)
    .minLowercase(1, PASS_MSG)
    .minUppercase(1, PASS_MSG)
    .minSymbols(1, PASS_MSG)
    .required(PASS_MSG),
})

export const validateCreateAccountSchema = yup.object().shape({
  username: yup.string().required('Username é obrigatório!'),
  email: yup.string().required('E-mail é obrigatório').email(),
  password: yup
    .string()
    .typeError('Senha inválida')
    .min(8, PASS_MSG)
    .minNumbers(1, PASS_MSG)
    .minLowercase(1, PASS_MSG)
    .minUppercase(1, PASS_MSG)
    .minSymbols(1, PASS_MSG)
    .required(PASS_MSG),
  c_password: yup
    .string()
    .typeError('Confirmar senha inválido')
    .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
    .required('Confirmar senha é obrigatório'),
})

export const validateCreditPaymentSchema = yup.object().shape({
  cardholderNumber: yup.number().required('Campo obrigatório'),
  expirationDate: yup.number().required('Campo obrigatório'),
  cardholderName: yup.string().required('Campo obrigatório'),
  cardholderEmail: yup.string().email().required('Campo obrigatório'),
  securityCode: yup.number().required('Campo obrigatório'),
  issuer: yup.string().required('Campo obrigatório'),
  identificationType: yup.string().required('Campo obrigatório'),
  identificationNumber: yup.number().required('Campo obrigatório'),
  installments: yup.string().required('Campo obrigatório'),
})

export const validatePaymentSchema = yup.object().shape({
  payerFirstName: yup.string().required('Campo obrigátorio'),
  payerLastName: yup.string().required('Campo obrigátorio'),
  email: yup.string().required('Campo obrigátorio').email(),
  identificationType: yup.string().required('Campo obrigátorio'),
  // identificationNumber: yup.number().required('Campo obrigátorio'),

  identificationNumber: yup
    .string()
    .when('identificationType', {
      is: 'CPF',
      then: yup
        .string()
        .test({
          test: (v) => !v || cpf.isValid(v),
          message: 'CPF inválido',
        })
        .required('Campo obrigátorio'),
      otherwise: yup.string().optional(),
    })
    .when('identificationType', {
      is: 'CNPJ',
      then: yup
        .string()
        .test({
          test: (v) => !v || cnpj.isValid(v),
          message: 'CNPJ inválido',
        })
        .required('Campo obrigátorio'),
      otherwise: yup.string().optional(),
    }),
})

export const validateNewsletterSchema = yup.object().shape({
  newsletter: yup
    .string()
    .email()
    .typeError('Email inválido')
    .required('E-mail é obrigatório'),
})
