import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { secret } from '../../config/auth'

export function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader?.startsWith('Bearer') || !authHeader)
    return response.status(401).json('You are not authenticated!')

  const parts = authHeader.split(' ')

  if (parts.length !== 2)
    return response.status(401).send({ error: 'Token error' })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme))
    return response.status(401).send({ error: 'Token malformated' })

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) return response.status(401).send({ error: 'Token Invalid' })

    request.body = { ...request.body, user }

    return next()
  })
}

export function verifyTokenAndAuthorization(
  request: Request,
  response: Response,
  next: NextFunction
) {
  verifyToken(request, response, () => {
    const { user } = request.body

    if (user.id === request.params.id || user.isAdmin) {
      next()
    } else {
      return response.status(403).json('Not alowed to do that!')
    }
  })
}

export function verifyTokenAndAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  verifyToken(request, response, () => {
    const { user } = request.body

    if (user.isAdmin) {
      next()
    } else {
      return response.status(403).json('Not alowed to do that!')
    }
  })
}
