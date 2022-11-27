'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.pagination = void 0
const pagination = (req, _res, next) => {
  const {
    page = '1',
    limit: take = '10',
    sort = 'createdAt',
    order = 'desc',
    filter = 'null',
    search = {},
  } = req.query
  req.pagination = {
    skip: (parseInt(page) - 1) * parseInt(take),
    take: parseInt(take),
    sort,
    order: order.toLowerCase(),
    filter: JSON.parse(filter),
    search,
  }
  next()
}
exports.pagination = pagination
//# sourceMappingURL=pagination.js.map
