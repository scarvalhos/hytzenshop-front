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
const verifyToken_1 = require("../middlewares/verifyToken");
const prismaClient_1 = require("../../database/prismaClient");
const pagination_1 = require("../middlewares/pagination");
const files_1 = require("../../utils/files");
const router = express_1.default.Router();
// Create Product
router.post('/', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, images, categories, sizes, colors, price, stock, } = request.body;
    try {
        const newProduct = yield prismaClient_1.prismaClient.product.create({
            data: {
                title,
                description,
                images,
                categories,
                sizes,
                colors,
                price,
                stock,
            },
        });
        return response.status(201).json({
            message: 'Produto cadastrado com sucesso!',
            data: {
                product: newProduct,
            },
        });
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Update Product
router.put('/:id', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = request.params;
    const _a = request.body, { user } = _a, payload = __rest(_a, ["user"]);
    try {
        const updatedProduct = yield prismaClient_1.prismaClient.product.update({
            where: { id },
            data: Object.assign({}, payload),
        });
        return response.status(201).json({
            message: 'Produto atualizado com sucesso!',
            data: {
                product: updatedProduct,
            },
        });
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Delete Product
router.delete('/:id', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = request.params;
    try {
        const product = yield prismaClient_1.prismaClient.product.findUnique({ where: { id } });
        if (!product)
            return response.status(401).json({ message: 'Product not founded!' });
        yield prismaClient_1.prismaClient.product.delete({ where: { id } });
        return response
            .status(200)
            .json({ message: 'Product deleted succesfully!' });
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Get Product
router.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = request.params;
    try {
        const product = yield prismaClient_1.prismaClient.product.findUnique({ where: { id } });
        const images = yield (0, files_1.searchFile)((product === null || product === void 0 ? void 0 : product.images) || '');
        return response.status(201).json({
            message: 'Produto encontrado com sucesso!',
            data: {
                product: Object.assign(Object.assign({}, product), { images }),
            },
        });
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Get All Products
router.get('/', pagination_1.pagination, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { pagination: { take, sort, skip, order, filter }, } = request;
    try {
        const productsCount = yield prismaClient_1.prismaClient.product.count({
            where: Object.assign({}, filter),
        });
        const products = yield prismaClient_1.prismaClient.product.findMany({
            where: Object.assign({}, filter),
            orderBy: { [sort]: order },
            skip,
            take,
        });
        const productsParsed = yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const images = yield (0, files_1.searchFile)(product === null || product === void 0 ? void 0 : product.images);
            return Object.assign(Object.assign({}, product), { images });
        })));
        return response.status(200).json({
            message: 'Produtos listados com sucesso!',
            data: {
                count: productsCount,
                products: productsParsed,
            },
        });
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
exports.default = router;
// Filter by category example
// const params = new URLSearchParams()
// const filterString = JSON.stringify({
//   categories: { hasSome: ['t-shirts'] },
// })
// params.set('limit', '10')
// params.set('page', '1')
// params.set('sort', 'createdAt')
// params.set('order', 'desc')
// params.set('filter', filterString)
// (`http://localhost:3333/api/products?${params}`)
//# sourceMappingURL=product.js.map