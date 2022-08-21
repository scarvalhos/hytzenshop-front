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
const Cart_1 = require("../models/Cart");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
// Create Cart
router.post('/', verifyToken_1.verifyToken, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCart = yield Cart_1.Cart.create(request.body);
        return response.status(201).json(newCart);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Update Cart
router.put('/:id', verifyToken_1.verifyToken, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = request.params;
    try {
        const updatedCart = yield Cart_1.Cart.findByIdAndUpdate(id, {
            $set: request.body,
        }, { new: true });
        return response.status(200).json(updatedCart);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Delete Cart
router.delete('/:id', verifyToken_1.verifyTokenAndAuthorization, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = request.params;
    try {
        yield Cart_1.Cart.findByIdAndDelete(id);
        return response.status(200).json('Cart has been deleted!');
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Get User Cart
router.get('/:userId', verifyToken_1.verifyToken, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { userId } = request.params;
    try {
        const cart = yield Cart_1.Cart.findOne({ userId });
        return response.status(200).json(cart);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Get All Carts
router.get('/', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield Cart_1.Cart.find();
        return response.status(200).json(carts);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
exports.default = router;