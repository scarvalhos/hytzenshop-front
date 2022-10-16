"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailer = void 0;
require("dotenv/config");
const mailer = {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
};
exports.mailer = mailer;
//# sourceMappingURL=mailer.js.map