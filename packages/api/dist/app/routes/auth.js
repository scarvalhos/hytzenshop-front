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
const yup_1 = require("yup");
const BadRequest_1 = require("../errors/BadRequest");
const prismaClient_1 = require("../../database/prismaClient");
const verifyToken_1 = require("../middlewares/verifyToken");
const auth_1 = require("../../config/auth");
const hash_1 = require("../../config/hash");
const auth_2 = require("../validators/auth");
const mailer_1 = __importDefault(require("../../modules/mailer"));
const config_1 = require("../../config");
const router = express_1.default.Router();
// Register
router.post('/register', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, avatar, isAdmin, userData } = request.body;
    let userAddressId;
    try {
        const user = (yield prismaClient_1.prismaClient.user.findUnique({ where: { username } })) ||
            (yield prismaClient_1.prismaClient.user.findUnique({ where: { email } }));
        if (user) {
            return response.status(401).json('User already exists!');
        }
        yield (0, auth_2.validateUser)({
            username,
            email,
            password,
            avatar,
            isAdmin,
        });
        if (userData === null || userData === void 0 ? void 0 : userData.address) {
            yield (0, auth_2.validateUserAddress)(Object.assign({}, userData === null || userData === void 0 ? void 0 : userData.address));
        }
        if (userData) {
            yield (0, auth_2.validateUserData)(Object.assign({}, userData));
        }
        if (userData === null || userData === void 0 ? void 0 : userData.address) {
            userAddressId = yield prismaClient_1.prismaClient.userAddress.create({
                data: Object.assign({}, userData === null || userData === void 0 ? void 0 : userData.address),
            });
        }
        const userDataId = userData &&
            (yield prismaClient_1.prismaClient.userData.create({
                data: {
                    birthDate: userData === null || userData === void 0 ? void 0 : userData.birthDate,
                    completeName: userData === null || userData === void 0 ? void 0 : userData.completeName,
                    cpf: userData === null || userData === void 0 ? void 0 : userData.cpf,
                    phone: userData === null || userData === void 0 ? void 0 : userData.phone,
                    userAddressId: (userAddressId === null || userAddressId === void 0 ? void 0 : userAddressId.id) || undefined,
                },
            }));
        const newUser = yield prismaClient_1.prismaClient.user.create({
            data: Object.assign({ username,
                email, password: crypto_js_1.default.AES.encrypt(password, hash_1.hash).toString(), avatar,
                isAdmin }, (userDataId && {
                userDataId: userDataId.id || undefined,
            })),
        });
        delete newUser.password;
        return response.status(201).json(newUser);
    }
    catch (error) {
        if (error instanceof yup_1.ValidationError) {
            return (0, BadRequest_1.sendBadRequest)(request, response, error.errors);
        }
        return response.status(500).json(error);
    }
}));
// Login
router.post('/login', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.body;
    try {
        const user = yield prismaClient_1.prismaClient.user.findUnique({
            where: { username },
        });
        if (!user) {
            return response.status(401).json('Wrong credentials');
        }
        const hashedPassword = crypto_js_1.default.AES.decrypt(user === null || user === void 0 ? void 0 : user.password, hash_1.hash).toString(crypto_js_1.default.enc.Utf8);
        if (hashedPassword !== password) {
            return response.status(401).json('Wrong password');
        }
        const accessToken = jsonwebtoken_1.default.sign({
            id: user.id,
            isAdmin: user.isAdmin,
        }, auth_1.secret, { expiresIn: '2d' });
        delete user.password;
        return response.status(200).json(Object.assign(Object.assign({}, user), { accessToken }));
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Me
router.get('/me', verifyToken_1.verifyToken, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let _a = request.body, { user } = _a, rest = __rest(_a, ["user"]);
    try {
        const data = yield prismaClient_1.prismaClient.user.findUnique({
            where: { id: user.id },
            include: { userData: { include: { address: true } } },
        });
        delete data.password;
        return response.status(200).json(data);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// Forgot password
router.post('/forgot-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield prismaClient_1.prismaClient.user.findUnique({ where: { email } });
        if (!user)
            return res.status(400).send({ error: 'User not found' });
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
        }, auth_1.secret, { expiresIn: '1h' });
        yield prismaClient_1.prismaClient.user.update({
            where: { id: user.id },
            data: { passwordResetToken: token },
        });
        mailer_1.default.sendMail({
            to: email,
            from: 'samcarvalhos@hotmail.com',
            subject: 'Redefina sua senha',
            html: `<a href="${config_1.URL_FRONTEND}/auth/reset-password?token=${token}">Definir a senha</a>`,
        }, (err) => {
            if (err)
                return res
                    .status(400)
                    .send({ error: `Cannot send forgot password email ${err}` });
            return res.send();
        });
        return res
            .status(200)
            .send({ message: `E-mail de recuperação enviado para '${email}'` });
    }
    catch (err) {
        res.status(400).send({ error: 'Error on forgot password. Try again' });
    }
}));
// Reset password
router.post('/reset-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, token, password } = req.body;
    try {
        const user = yield prismaClient_1.prismaClient.user.findUnique({ where: { email } });
        if (!user)
            return res.status(400).send({ error: 'User not found' });
        if (token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Token invalid' });
        jsonwebtoken_1.default.verify(token, auth_1.secret, (err, user) => {
            if (err)
                return res
                    .status(400)
                    .send({ error: 'Token expires. Generate a new one' });
        });
        user.password = crypto_js_1.default.AES.encrypt(password, hash_1.hash).toString();
        user.passwordResetToken = null;
        yield prismaClient_1.prismaClient.user.update({ where: { id: user.id }, data: user });
        return res.status(200).send({ message: 'Nova senha definida com sucesso!' });
    }
    catch (err) {
        res.status(400).send({ error: 'Cannot reset password. Try again' });
    }
}));
exports.default = router;
//# sourceMappingURL=auth.js.map