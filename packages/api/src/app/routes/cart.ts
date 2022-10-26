import express, { Request, Response } from 'express'

import { sendInternalServerError } from '../errors/InternalServerError'
import { sendBadRequest } from '../errors/BadRequest'
import { prismaClient } from '../../database/prismaClient'

import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middlewares/verifyToken'

const router = express.Router()

// Create Cart

router.post('/', verifyToken, async (request: Request, response: Response) => {
  try {
    const newCart = await prismaClient.cart.create({
      data: { userId: request.body.userId, products: request.body.products },
    })

    return response.status(201).json({
      message: 'Carrinho criado com sucesso!',
      cart: newCart,
    })
  } catch (error: any) {
    return sendInternalServerError(request, response, error.message, error)
  }
})

// Update Cart

router.put(
  '/:id',
  verifyToken,
  async (request: Request, response: Response) => {
    const { id } = request.params
    const { products } = request.body

    try {
      const cart = await prismaClient.cart.findUnique({ where: { id } })

      if (!cart)
        return sendBadRequest(request, response, 'Carrinho não encontrado!')

      const updatedCart = await prismaClient.cart.update({
        where: { id },
        data: {
          products,
        },
      })

      return response.status(200).json({
        message: 'Carrinho atualizado com sucesso!',
        cart: updatedCart,
      })
    } catch (error: any) {
      return sendInternalServerError(request, response, error.message, error)
    }
  }
)

// Delete Cart

router.delete(
  '/:id',
  verifyTokenAndAuthorization,
  async (request: Request, response: Response) => {
    let { id } = request.params

    try {
      const cart = await prismaClient.cart.findUnique({ where: { id } })

      if (!cart)
        return sendBadRequest(request, response, 'Carrinho não encontrado!')

      await prismaClient.cart.delete({ where: { id } })

      return response.status(200).json({
        message: 'Carrinho excluído com sucesso!',
      })
    } catch (error: any) {
      return sendInternalServerError(request, response, error.message, error)
    }
  }
)

// Get User Cart

router.get(
  '/:userId',
  verifyToken,
  async (request: Request, response: Response) => {
    let { userId } = request.params

    try {
      const user = await prismaClient.user.findUnique({
        where: { id: userId },
      })

      if (!user)
        return sendBadRequest(request, response, 'Usuário não encontrado!')

      const cart = await prismaClient.cart.findFirst({
        where: { userId },
      })

      return response.status(200).json({
        message: 'Carrinho encontrado!',
        cart,
      })
    } catch (error: any) {
      return sendInternalServerError(request, response, error.message, error)
    }
  }
)

// Get All Carts

router.get(
  '/',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    try {
      const cartsCount = await prismaClient.cart.count()
      const carts = await prismaClient.cart.findMany()

      return response.status(200).json({
        message: 'Carrinhos listados com sucesso!',
        data: {
          count: cartsCount,
          carts,
        },
      })
    } catch (error: any) {
      return sendInternalServerError(request, response, error.message, error)
    }
  }
)

export default router
