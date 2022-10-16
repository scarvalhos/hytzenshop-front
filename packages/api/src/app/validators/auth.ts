import * as yup from 'yup'

import YupPassword from 'yup-password'

YupPassword(yup)

import { OPCOES_ESTADO } from '../../utils/enums'

import { cpf } from 'cpf-cnpj-validator'

interface UserAddress {
  street: string
  number: string
  district: string
  city: string
  uf: string
  cep: string
  country: string
  complement?: string
}

interface UserData {
  completeName: string
  cpf: string
  phone: string
  birthDate: string
}

interface User {
  username: string
  email: string
  password: string
  isAdmin: Boolean
  avatar?: string
}

const validateUser = (body: User) =>
  yup
    .object()
    .shape({
      username: yup
        .string()
        .typeError('Username inválido')
        .required('Necessário preencher o campo username'),
      email: yup
        .string()
        .typeError('E-mail inválido')
        .email('Necessário preencher o campo com um e-mail válido')
        .required('Necessário preencher o campo e-mail'),
      password: yup
        .string()
        .typeError('Senha inválida')
        .min(8, 'Senha muito curta, digite pelo menos 8 caracteres')
        .minNumbers(1, 'A senha deve conter ao menos um número')
        .minLowercase(1, 'A senha deve conter ao menos uma letra minúscula')
        .minUppercase(1, 'A senha deve conter ao menos uma letra maiúscula')
        .minSymbols(1, 'A senha deve conter ao menos um caracter especial')
        .required('Necessário preencher o campo senha'),
      isAdmin: yup
        .bool()
        .typeError('Informe corretamente se o usuário é administrador')
        .notRequired()
        .default(false)
        .required('Necessário preencher o campo admin'),
      avatar: yup.string().optional(),
    })
    .validate(body, { abortEarly: false, stripUnknown: true })

const validateUserAddress = (body: UserAddress) =>
  yup
    .object()
    .shape({
      street: yup
        .string()
        .typeError('Rua inválido')
        .required('Necessário preencher o campo rua'),
      number: yup
        .string()
        .typeError('Número inválido')
        .required('Necessário preencher o campo número'),
      district: yup
        .string()
        .typeError('Bairro inválido')
        .required('Necessário preencher o campo bairro'),
      city: yup
        .string()
        .typeError('Cidade inválido')
        .required('Necessário preencher o campo cidade'),
      uf: yup
        .string()
        .equals(OPCOES_ESTADO)
        .typeError('Estado inválido')
        .equals(OPCOES_ESTADO)
        .required('Necessário preencher o campo estado'),
      cep: yup
        .string()
        .typeError('CEP inválido')
        .required('Necessário preencher o campo CEP'),
      country: yup
        .string()
        .typeError('País inválido')
        .required('Necessário preencher o campo país'),
      complement: yup.string().typeError('Complemento inválido').optional(),
    })
    .validate(body, { abortEarly: false, stripUnknown: true })

const validateUserData = (body: UserData) =>
  yup
    .object()
    .shape({
      completeName: yup
        .string()
        .min(3, 'Nome muito curto')
        .required('O nome precisa ser preenchido'),
      cpf: yup
        .string()
        .typeError('CPF inválido')
        .test({
          test: (v) => !v || cpf.isValid(v),
          message: 'CPF não é válido',
        })
        .required('CPF precisa ser preenchido'),
      phone: yup
        .string()
        .typeError('Celular inválido')
        .required('Celular precisa ser preenchido'),
      birthDate: yup
        .string()
        .typeError('Necessário preencher a data de nascimento')
        .required('Necessário preencher a data de nascimento'),
    })
    .validate(body, { abortEarly: false, stripUnknown: true })

export { validateUser, validateUserAddress, validateUserData }
