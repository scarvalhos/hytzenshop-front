import express, { Request, Response } from 'express'

import { prismaClient } from '../../database/prismaClient'
import { pagination } from '../middlewares/pagination'
import { Order } from '../models/Order'

import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middlewares/verifyToken'

const router = express.Router()

type PaymentStatus =
  | 'pending'
  | 'approved'
  | 'authorized'
  | 'in_process'
  | 'in_mediation'
  | 'rejected'
  | 'cancelled'
  | 'refunded'
  | 'charged_back'

// Create Order

router.post('/', verifyToken, async (request: Request, response: Response) => {
  const { user, ...payload } = request.body
  try {
    const newOrder = await prismaClient.order.create({
      data: payload,
    })

    return response.status(201).json({
      message: 'Pedido criado com sucesso!',
      data: {
        order: newOrder,
      },
    })
  } catch (error) {
    console.log(error)
    return response.status(500).json(error)
  }
})

// Update Order

router.put(
  '/:id',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    let { id } = request.params

    try {
      const updatedOrder = await prismaClient.order.update({
        where: {
          id,
        },
        data: request.body,
      })

      return response.status(200).json({
        message: 'Pedido atualizado com sucesso!',
        data: {
          order: updatedOrder,
        },
      })
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// User Update Order

router.patch(
  '/:id/:status',
  verifyToken,
  async (request: Request, response: Response) => {
    let { id, status } = request.params as { id: string; status: PaymentStatus }

    try {
      const order = await prismaClient.order.findFirst({
        where: { mpPaymentId: id },
      })

      if (!order) {
        return response.status(500).json({ message: 'Pedido não encontrado!' })
      }

      const updatedOrder = await prismaClient.order.update({
        where: { id: order.id },
        data: {
          status,
        },
      })

      return response.status(200).json({
        message: 'Pedido atualizado com sucesso!',
        data: {
          order: updatedOrder,
        },
      })
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Delete Order

router.delete(
  '/:id',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    let { id } = request.params

    try {
      const order = await prismaClient.order.findUnique({ where: { id } })

      if (!order) {
        return response.status(200).json({
          message: 'Pedido não encontrado!',
        })
      }

      await prismaClient.order.delete({ where: { id } })

      return response.status(200).json({
        message: 'Pedido excluído com sucesso!',
      })
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Get User Order

router.get(
  '/order/:orderId',
  verifyTokenAndAuthorization,
  async (request: Request, response: Response) => {
    let { orderId } = request.params

    try {
      const order = await prismaClient.order.findUnique({
        where: { id: orderId },
      })

      return response.status(200).json({
        message: 'Pedido encontrado com sucesso!',
        data: {
          order,
        },
      })
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Get User Orders

router.get(
  '/:userId',
  verifyTokenAndAuthorization,
  async (request: Request, response: Response) => {
    let { userId } = request.params

    try {
      const orders = await prismaClient.order.findMany({ where: { userId } })

      return response.status(200).json({
        message: 'Pedidos encontrados com sucesso!',
        data: {
          orders,
        },
      })
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Get All Orders

router.get(
  '/',
  pagination,
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    const {
      pagination: { take, sort, skip, order, filter },
    } = request as any

    try {
      const ordersCount = await prismaClient.order.count({
        where: { ...filter },
      })

      const orders = await prismaClient.order.findMany({
        where: { ...filter },
        orderBy: { [sort]: order },
        skip,
        take,
      })

      return response.status(200).json({
        message: 'Pedidos listados com sucesso!',
        data: {
          count: ordersCount,
          orders,
        },
      })
    } catch (error) {
      console.log(error)
      return response.status(500).json(error)
    }
  }
)

// Get Monthly Income

router.get(
  '/income',
  verifyTokenAndAdmin,
  async (_request: Request, response: Response) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    )

    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: '$createdAt' },
            sales: '$amount',
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: '$sales' },
          },
        },
      ])

      return response.status(200).json(income)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

export default router

// 1h 39m 10s
