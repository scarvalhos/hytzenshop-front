"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("../../services/stripe"));
const router = express_1.default.Router();
router.post('/payment', (request, response) => {
    const { tokenId, amount } = request.body;
    stripe_1.default.charges
        .create({
        source: tokenId,
        amount,
        currency: 'brl',
    })
        .then((stripeRes) => {
        return response.status(200).json(stripeRes);
    })
        .catch((stripeErr) => {
        return response.status(500).json(stripeErr);
    });
});
exports.default = router;
//# sourceMappingURL=stripe.js.map