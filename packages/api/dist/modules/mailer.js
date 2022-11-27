'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const nodemailer_1 = __importDefault(require('nodemailer'))
const mailer_1 = require('../config/mailer')
const { host, port, user, pass } = mailer_1.mailer
const transport = nodemailer_1.default.createTransport({
  host,
  port: parseInt(port || ''),
  secure: false,
  auth: {
    user,
    pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
})
exports.default = transport
//# sourceMappingURL=mailer.js.map
