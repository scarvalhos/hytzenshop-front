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
const Product_1 = require("../models/Product");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
// Create Product
router.post('/', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield Product_1.Product.create(request.body);
        return response.status(201).json(newProduct);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Update Product
router.put('/:id', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = request.params;
    try {
        const updatedProduct = yield Product_1.Product.findByIdAndUpdate(id, {
            $set: request.body,
        }, { new: true });
        return response.status(200).json(updatedProduct);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Delete Product
router.delete('/:id', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = request.params;
    try {
        yield Product_1.Product.findByIdAndDelete(id);
        return response.status(200).json('Product has been deleted!');
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Get Product
router.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = request.params;
    try {
        const product = yield Product_1.Product.findById(id);
        return response.status(200).json(product);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Get All Products
router.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { new: qNew, category, limit, filter, order } = request.query;
    try {
        let products;
        if (qNew) {
            products = yield Product_1.Product.find().sort({ createdAt: -1 }).limit(5);
        }
        else if (category) {
            if (limit) {
                products = yield Product_1.Product.find({
                    categories: {
                        $in: [category],
                    },
                }).limit(Number(limit));
            }
            else {
                products = yield Product_1.Product.find({
                    categories: {
                        $in: [category],
                    },
                });
            }
        }
        else if (filter) {
            const { productTitle } = filter;
            products = yield Product_1.Product.find({
                title: new RegExp(productTitle, 'gi'),
            });
        }
        else if (order === 'random') {
            products = yield Product_1.Product.aggregate([{ $sample: { size: 5 } }]);
        }
        else {
            products = yield Product_1.Product.find();
        }
        return response.status(200).json(products);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
exports.default = router;
