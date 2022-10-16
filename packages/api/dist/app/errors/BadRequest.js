"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBadRequest = void 0;
const sendBadRequest = (req, res, message) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(`${req.method} ${req.originalUrl} - ${message}`);
    }
    res.status(400).json({
        data: null,
        message,
    });
};
exports.sendBadRequest = sendBadRequest;
//# sourceMappingURL=BadRequest.js.map