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

    return response.status(201).json(newCart)
  } catch (error) {
    return response.status(500).json(error)
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
      return response.status(200).json(updatedCart)
    } catch (error) {
      return response.status(500).json(error)
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

      return response.status(200).json('Cart has been deleted!')
    } catch (error) {
      return response.status(500).json(error)
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

      return response.status(200).json(cart)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Get All Carts

router.get(
  '/',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    try {
      const carts = await prismaClient.cart.findMany()

      return response.status(200).json(carts)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

export default router
