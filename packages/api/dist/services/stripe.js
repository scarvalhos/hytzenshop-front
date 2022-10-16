"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: '2020-08-27',
    appInfo: {
        name: 'Ignews',
        version: '0.1.0',
    },
    telemetry: false,
});
exports.default = stripe;
//# sourceMappingURL=stripe.js.map