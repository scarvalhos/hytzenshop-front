"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mercadopago_1 = __importDefault(require("mercadopago"));
exports.default = mercadopago_1.default.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});
