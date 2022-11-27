'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const prismaClient_1 = require('../../database/prismaClient')
const pagination_1 = require('../middlewares/pagination')
const verifyToken_1 = require('../middlewares/verifyToken')
const router = express_1.default.Router()
router.get(
  '/',
  verifyToken_1.verifyTokenAndAdmin,
  pagination_1.pagination,
  (request, response) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const {
        pagination: { take, sort, skip, order, filter },
      } = request
      try {
        const usersCount = yield prismaClient_1.prismaClient.user.count({
          where: Object.assign({}, filter),
        })
        const users = yield prismaClient_1.prismaClient.user.findMany({
          where: Object.assign({}, filter),
          include: { userData: { include: { address: true } } },
          orderBy: { [sort]: order },
          skip,
          take,
        })
        return response.status(200).json({
          message: 'Usuários listados com sucesso!',
          data: {
            count: usersCount,
            users,
          },
        })
      } catch (error) {
        return response.status(500).json({ error })
      }
    })
)
// Get user stats
router.get('/stats', verifyToken_1.verifyTokenAndAdmin, (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { orderBy, counter } = request.query
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - counter))
    const lastMonth = new Date(date.setMonth(date.getMonth() - counter))
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - counter)
    )
    try {
      const stats = yield prismaClient_1.prismaClient.user.groupBy({
        by: ['email', 'createdAt'],
        where: {
          createdAt: { gte: orderBy === 'ano' ? lastYear : previousMonth },
        },
      })
      return response.status(200).json({
        message: `Usuários cadastrados no último ${orderBy} listados com sucesso!`,
        data: {
          count: stats.length,
          stats,
        },
      })
    } catch (error) {
      return response.status(500).json({ error })
    }
  })
)
// Get user
router.get('/:id', verifyToken_1.verifyTokenAndAdmin, (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let { id } = request.params
    try {
      const user = yield prismaClient_1.prismaClient.user.findUnique({
        where: { id },
        include: { userData: { include: { address: true } } },
      })
      return response.status(200).json({ user })
    } catch (error) {
      return response.status(500).json({ error })
    }
  })
)
// Update
router.put(
  '/:id',
  verifyToken_1.verifyTokenAndAuthorization,
  (request, response) =>
    __awaiter(void 0, void 0, void 0, function* () {
      var _a
      let { id } = request.params
      let { userData } = request.body
      const address = userData.address || {}
      let updatedUser
      try {
        const user = yield prismaClient_1.prismaClient.user.findUnique({
          where: { id },
          include: { userData: { include: { address: true } } },
        })
        if (address) {
          updatedUser = yield prismaClient_1.prismaClient.userAddress.update({
            where: {
              id:
                ((_a =
                  user === null || user === void 0 ? void 0 : user.userData) ===
                  null || _a === void 0
                  ? void 0
                  : _a.userAddressId) || '',
            },
            data: Object.assign({}, address),
          })
        }
        if (userData) {
          updatedUser = yield prismaClient_1.prismaClient.userData.update({
            where: {
              id:
                (user === null || user === void 0 ? void 0 : user.userDataId) ||
                '',
            },
            data: Object.assign({}, userData),
          })
        }
        return response.status(200).json({
          message: 'Usuário atualizado com sucesso!',
          data: {
            userData: updatedUser,
          },
        })
      } catch (error) {
        return response.status(500).json({ error })
      }
    })
)
// Delete
router.delete(
  '/:id',
  verifyToken_1.verifyTokenAndAuthorization,
  (request, response) =>
    __awaiter(void 0, void 0, void 0, function* () {
      let { id } = request.params
      try {
        const user = yield prismaClient_1.prismaClient.user.findUnique({
          where: { id },
        })
        if (!user)
          return response.status(401).json({ message: 'User not founded!' })
        yield prismaClient_1.prismaClient.user.delete({ where: { id } })
        return response
          .status(200)
          .json({ message: 'User deleted succesfully!' })
      } catch (error) {
        return response.status(500).json({ error })
      }
    })
)
exports.default = router
//# sourceMappingURL=user.js.map
