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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prismaClient_1 = require("../../database/prismaClient");
const pagination_1 = require("../middlewares/pagination");
const Order_1 = require("../models/Order");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
// Create Order
router.post('/', verifyToken_1.verifyToken, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = request.body, { user } = _a, payload = __rest(_a, ["user"]);
    try {
        const newOrder = yield prismaClient_1.prismaClient.order.create({
            data: payload,
        });
        return response.status(201).json({
            message: 'Pedido criado com sucesso!',
            data: {
                order: newOrder,
            },
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }
}));
// Update Order
router.put('/:id', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = request.params;
    try {
        const updatedOrder = yield prismaClient_1.prismaClient.order.update({
            where: {
                id,
            },
            data: request.body,
        });
        return response.status(200).json({
            message: 'Pedido atualizado com sucesso!',
            data: {
                order: updatedOrder,
            },
        });
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// User Update Order
router.patch('/:id/:status', verifyToken_1.verifyToken, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, status } = request.params;
    try {
        const order = yield prismaClient_1.prismaClient.order.findFirst({
            where: { mpPaymentId: id },
        });
        if (!order) {
            return response.status(500).json({ message: 'Pedido não encontrado!' });
        }
        const updatedOrder = yield prismaClient_1.prismaClient.order.update({
            where: { id: order.id },
            data: {
                status,
            },
        });
        return response.status(200).json({
            message: 'Pedido atualizado com sucesso!',
            data: {
                order: updatedOrder,
            },
        });
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Delete Order
router.delete('/:id', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = request.params;
    try {
        const order = yield prismaClient_1.prismaClient.order.findUnique({ where: { id } });
        if (!order) {
            return response.status(200).json({
                message: 'Pedido não encontrado!',
            });
        }
        yield prismaClient_1.prismaClient.order.delete({ where: { id } });
        return response.status(200).json({
            message: 'Pedido excluído com sucesso!',
        });
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Get User Order
router.get('/order/:orderId', verifyToken_1.verifyTokenAndAuthorization, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { orderId } = request.params;
    try {
        const order = yield prismaClient_1.prismaClient.order.findUnique({
            where: { id: orderId },
        });
        return response.status(200).json({
            message: 'Pedido encontrado com sucesso!',
            data: {
                order,
            },
        });
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Get User Orders
router.get('/:userId', verifyToken_1.verifyTokenAndAuthorization, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { userId } = request.params;
    try {
        const orders = yield prismaClient_1.prismaClient.order.findMany({ where: { userId } });
        return response.status(200).json({
            message: 'Pedidos encontrados com sucesso!',
            data: {
                orders,
            },
        });
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Get All Orders
router.get('/', pagination_1.pagination, verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { pagination: { take, sort, skip, order, filter }, } = request;
    try {
        const ordersCount = yield prismaClient_1.prismaClient.order.count({
            where: Object.assign({}, filter),
        });
        const orders = yield prismaClient_1.prismaClient.order.findMany({
            where: Object.assign({}, filter),
            orderBy: { [sort]: order },
            skip,
            take,
        });
        return response.status(200).json({
            message: 'Pedidos listados com sucesso!',
            data: {
                count: ordersCount,
                orders,
            },
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }
}));
// Get Monthly Income
router.get('/income', verifyToken_1.verifyTokenAndAdmin, (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = yield Order_1.Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: '$amount',
                },
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: '$sales' },
                },
            },
        ]);
        return response.status(200).json(income);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
exports.default = router;
// 1h 39m 10s
//# sourceMappingURL=order.js.map