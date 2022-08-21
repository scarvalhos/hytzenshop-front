"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mercadopago_1 = __importDefault(require("mercadopago"));
const __1 = require("../..");
mercadopago_1.default.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});
const router = express_1.default.Router();
router.post('/payment', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { method } = request.params;
    if (method === 'boleto') {
        try {
            const res = yield fetch('https://api.mercadopago.com/v1/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request.body),
            });
            const data = yield res.json();
            return response.status(200).json(data);
        }
        catch (error) {
            return response.status(400).json(error);
        }
    }
    try {
        const data = yield mercadopago_1.default.payment.create(request.body);
        if (data.response.status === 'rejected') {
            return response.status(400).json(data);
        }
        return response.status(200).json(data);
    }
    catch (error) {
        return response.status(400).json(error);
    }
}));
router.post('/payment/webhooks', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = request.body;
    try {
        if (data.type === 'payment') {
            const payment = yield mercadopago_1.default.payment.findById(data.id);
            const mpResponse = yield fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
                },
                body: JSON.stringify(request.body),
            });
            const mpResponseParse = yield mpResponse.json();
            __1.io.emit('update.payment', { data: mpResponseParse });
            return response
                .status(200)
                .json({ payment: payment, response: mpResponseParse });
        }
        // return response.status(200).json(data)
    }
    catch (error) {
        return response.status(400).json(error);
    }
}));
exports.default = router;