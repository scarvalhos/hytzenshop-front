import express, { Request, Response } from 'express'

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
      data: { userId: request.body.userId },
    })

    return response.status(201).json({
      message: 'Carrinho criado com sucesso!',
      cart: newCart,
    })
  } catch (error) {
    return response.status(500).json({
      message: 'Erro ao criar carrinho',
      error,
    })
  }
})

// Update Cart

router.put(
  '/:id',
  verifyToken,
  async (request: Request, response: Response) => {
    let { id } = request.params

    try {
      const updatedCart = await prismaClient.cart.update({
        where: { id },
        data: {
          products: request.body.products,
        },
      })

      return response.status(200).json({
        message: 'Carrinho atualizado com sucesso!',
        cart: updatedCart,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao atualizar carrinho',
        error,
      })
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
      await prismaClient.cart.delete({ where: { id } })

      return response.status(200).json({
        message: 'Carrinho excluído com sucesso!',
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao excluir carrinho',
        error,
      })
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
      const cart = await prismaClient.cart.findFirst({
        where: { userId },
      })

      if (!cart) {
        return response.status(401).json({
          message: 'Nenhum carrinho não encontrado para esse usuário.',
        })
      }

      return response.status(200).json({
        message: 'Carrinho encontrado!',
        cart,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao buscar carrinho',
        error,
      })
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
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao listar carrinhos',
        error,
      })
    }
  }
)

export default router
