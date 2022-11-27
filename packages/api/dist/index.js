'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.io = void 0
require('dotenv/config')
const mongoose_1 = __importDefault(require('mongoose'))
const express_1 = __importDefault(require('express'))
const morgan_1 = __importDefault(require('morgan'))
const cors_1 = __importDefault(require('cors'))
const http_1 = __importDefault(require('http'))
const path_1 = __importDefault(require('path'))
const prismaClient_1 = require('./database/prismaClient')
const socket_io_1 = require('socket.io')
const auth_1 = __importDefault(require('./app/routes/auth'))
const user_1 = __importDefault(require('./app/routes/user'))
const cart_1 = __importDefault(require('./app/routes/cart'))
const order_1 = __importDefault(require('./app/routes/order'))
const product_1 = __importDefault(require('./app/routes/product'))
const category_1 = __importDefault(require('./app/routes/category'))
const payment_1 = __importDefault(require('./app/routes/payment'))
const files_1 = __importDefault(require('./app/routes/files'))
;(0, prismaClient_1.testePrismaConnection)()
const app = (0, express_1.default)()
const httpServer = http_1.default.createServer(app)
exports.io = new socket_io_1.Server(httpServer, {
  cors: {
    origin: '*',
  },
})
app.use((0, cors_1.default)({ origin: '*' }))
app.use(express_1.default.json())
app.use(express_1.default.urlencoded({ extended: true }))
app.use((0, morgan_1.default)('dev'))
app.use(
  '/files',
  express_1.default.static(
    path_1.default.resolve(__dirname, '..', 'tmp', 'uploads')
  )
)
const MONGODB_URL = process.env.MONGODB_URL
mongoose_1.default
  .connect(MONGODB_URL)
  .then(() => console.log('DB connection successfull!'))
  .catch((err) => console.log(err))
app.use('/api/auth', auth_1.default)
app.use('/api/users', user_1.default)
app.use('/api/carts', cart_1.default)
app.use('/api/orders', order_1.default)
app.use('/api/products', product_1.default)
app.use('/api/categories', category_1.default)
app.use('/api/checkout', payment_1.default)
app.use('/api/files', files_1.default)
httpServer.listen(process.env.PORT || 3333, () =>
  console.log('Backend is running!')
)
//# sourceMappingURL=index.js.map
