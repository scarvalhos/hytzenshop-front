import { NextFunction, Request, Response } from 'express'

type PaginationQuery = {
  skip: string
  limit: string
  sort: string
  order: 'asc' | 'desc'
  filter: any
  page: string
  search: any
}

const pagination = (req: Request, _res: Response, next: NextFunction) => {
  const {
    page = '1',
    limit: take = '10',
    sort = 'createdAt',
    order = 'desc',
    filter = 'null',
    search = {},
  } = req.query as unknown as PaginationQuery

  ;(req as any).pagination = {
    skip: (parseInt(page) - 1) * parseInt(take),
    take: parseInt(take),
    sort,
    order: order.toLowerCase(),
    filter: JSON.parse(filter),
    search,
  }

  next()
}

export { pagination }
