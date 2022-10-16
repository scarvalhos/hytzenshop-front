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
Object.defineProperty(exports, "__esModule", { value: true });
exports.testePrismaConnection = exports.prismaClient = void 0;
require("dotenv/config");
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
exports.prismaClient = prismaClient;
function testePrismaConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prismaClient.user.findFirst();
            console.log('Conectado ao Prisma');
        }
        catch (error) {
            console.error('Falha ao conectar ao Prisma');
        }
    });
}
exports.testePrismaConnection = testePrismaConnection;
//# sourceMappingURL=prismaClient.js.map