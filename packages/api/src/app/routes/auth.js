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
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const auth_1 = require("../../config/auth");
const hash_1 = require("../../config/hash");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
// Register
router.post('/register', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = request.body;
    try {
        const user = yield User_1.User.findOne({ username });
        if (user) {
            return response.status(401).json('User already exists!');
        }
        const newUser = yield User_1.User.create({
            username,
            email,
            password: crypto_js_1.default.AES.encrypt(password, hash_1.hash).toString(),
        });
        return response.status(201).json(newUser);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Login
router.post('/login', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.body;
    try {
        const user = yield User_1.User.findOne({ username });
        if (!user) {
            return response.status(401).json('Wrong credentials');
        }
        const hashedPassword = crypto_js_1.default.AES.decrypt(user === null || user === void 0 ? void 0 : user.password, hash_1.hash).toString(crypto_js_1.default.enc.Utf8);
        if (hashedPassword !== password) {
            return response.status(401).json('Wrong password');
        }
        const accessToken = jsonwebtoken_1.default.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, auth_1.secret, { expiresIn: '3d' });
        const _a = user._doc, { password: p } = _a, others = __rest(_a, ["password"]);
        return response.status(200).json(Object.assign(Object.assign({}, others), { accessToken }));
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Me
router.get('/me', verifyToken_1.verifyToken, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let _b = request.body, { user } = _b, rest = __rest(_b, ["user"]);
    try {
        const data = yield User_1.User.findById(user.id);
        return response.status(200).json(data);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
exports.default = router;
