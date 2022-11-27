'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.verifyTokenAndAdmin =
  exports.verifyTokenAndAuthorization =
  exports.verifyToken =
    void 0
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'))
const auth_1 = require('../../config/auth')
function verifyToken(request, response, next) {
  const authHeader = request.headers.authorization
  if (
    !(authHeader === null || authHeader === void 0
      ? void 0
      : authHeader.startsWith('Bearer')) ||
    !authHeader
  )
    return response.status(401).json('You are not authenticated!')
  const parts = authHeader.split(' ')
  if (parts.length !== 2)
    return response.status(401).send({ error: 'Token error' })
  const [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme))
    return response.status(401).send({ error: 'Token malformated' })
  jsonwebtoken_1.default.verify(token, auth_1.secret, (err, user) => {
    if (err) return response.status(401).send({ error: 'Token Invalid' })
    request.body = Object.assign(Object.assign({}, request.body), { user })
    return next()
  })
}
exports.verifyToken = verifyToken
function verifyTokenAndAuthorization(request, response, next) {
  verifyToken(request, response, () => {
    const { user } = request.body
    if (user.id === request.params.id || user.isAdmin) {
      next()
    } else {
      return response.status(403).json('Not alowed to do that!')
    }
  })
}
exports.verifyTokenAndAuthorization = verifyTokenAndAuthorization
function verifyTokenAndAdmin(request, response, next) {
  verifyToken(request, response, () => {
    const { user } = request.body
    if (user.isAdmin) {
      next()
    } else {
      return response.status(403).json('Not alowed to do that!')
    }
  })
}
exports.verifyTokenAndAdmin = verifyTokenAndAdmin
//# sourceMappingURL=verifyToken.js.map
