import * as yup from 'yup'

import YupPassword from 'yup-password'

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

//---------------------------------------------------------------------------------------//

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

//---------------------------------------------------------------------------------------//

export const validateCreateProductSchema = yup.object().shape({
  title: yup
    .string()
    .typeError('Título inválido')
    .required('Campo obrigatório'),
  description: yup
    .string()
    .typeError('Descrição inválida')
    .required('Campo obrigatório'),
  price: yup.string().typeError('Preço inválido').required('Campo obrigatório'),
  stock: yup
    .string()
    .typeError('Estoque inválido')
    .required('Campo obrigatório'),
  images: yup
    .array()
    .min(1, 'Envie pelo menos 1 imagem')
    .required('Campo obrigatório'),
  colors: yup
    .mixed()
    .test({
      test: (v) => v && v.length > 0,
      message: 'Escolha pelo menos uma cor',
    })
    .required('Campo obrigatório'),
  sizes: yup
    .mixed()
    .test({
      test: (v) => v && v.length > 0,
      message: 'Escolha pelo menos um tamanho',
    })
    .required('Campo obrigatório'),
  categories: yup
    .mixed()
    .test({
      test: (v) => v && v.length > 0,
      message: 'Escolha pelo menos uma categoria',
    })
    .required('Campo obrigatório'),
})
