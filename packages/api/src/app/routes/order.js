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
const Order_1 = require("../models/Order");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
// Create Order
router.post('/', verifyToken_1.verifyToken, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = yield Order_1.Order.create(request.body);
        return response.status(201).json(newOrder);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Update Order
router.put('/:id', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = request.params;
    try {
        const updatedOrder = yield Order_1.Order.findByIdAndUpdate(id, {
            $set: request.body,
        }, { new: true });
        return response.status(200).json(updatedOrder);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Delete Order
router.delete('/:id', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = request.params;
    try {
        yield Order_1.Order.findByIdAndDelete(id);
        return response.status(200).json('Order has been deleted!');
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Get User Orders
router.get('/:userId', verifyToken_1.verifyTokenAndAuthorization, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { userId } = request.params;
    try {
        const orders = yield Order_1.Order.find({ userId });
        return response.status(200).json(orders);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Get All Orders
router.get('/', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.Order.find();
        return response.status(200).json(orders);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Get Monthly Income
router.get('/income', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
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
