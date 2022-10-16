"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserData = exports.validateUserAddress = exports.validateUser = void 0;
const yup = __importStar(require("yup"));
const yup_password_1 = __importDefault(require("yup-password"));
(0, yup_password_1.default)(yup);
const enums_1 = require("../../utils/enums");
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
const validateUser = (body) => yup
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
    .validate(body, { abortEarly: false, stripUnknown: true });
exports.validateUser = validateUser;
const validateUserAddress = (body) => yup
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
        .equals(enums_1.OPCOES_ESTADO)
        .typeError('Estado inválido')
        .equals(enums_1.OPCOES_ESTADO)
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
    .validate(body, { abortEarly: false, stripUnknown: true });
exports.validateUserAddress = validateUserAddress;
const validateUserData = (body) => yup
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
        test: (v) => !v || cpf_cnpj_validator_1.cpf.isValid(v),
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
    .validate(body, { abortEarly: false, stripUnknown: true });
exports.validateUserData = validateUserData;
//# sourceMappingURL=auth.js.map