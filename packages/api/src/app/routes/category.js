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
const Category_1 = require("../models/Category");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
// Create Category
router.post('/', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.Category.find(request.body);
        if (category === []) {
            return response.status(400).json('Essa categoria já existe');
        }
        const newCategory = yield Category_1.Category.create(request.body);
        return response.status(201).json(newCategory);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Delete Category
router.delete('/:id', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = request.params;
    try {
        yield Category_1.Category.findByIdAndDelete(id);
        return response.status(200).json('Product has been deleted!');
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Get Category
router.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = request.params;
    try {
        const category = yield Category_1.Category.findById(id);
        return response.status(200).json(category);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Get All Categories
router.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.Category.find();
        return response.status(200).json(categories);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
exports.default = router;
