import express, { Request, Response } from 'express'

import { Order } from '../models/Order'

import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middlewares/verifyToken'

const router = express.Router()

// Create Order

router.post('/', verifyToken, async (request: Request, response: Response) => {
  try {
    const newOrder = await Order.create(request.body)

    return response.status(201).json(newOrder)
  } catch (error) {
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
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        {
          $set: request.body,
        },
        { new: true }
      )
      return response.status(200).json(updatedOrder)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// User Update Order

router.patch(
  '/:id',
  verifyToken,
  async (request: Request, response: Response) => {
    let { id } = request.params

    try {
      const order = await Order.where({ mpPaymentId: id })

      if (!order) {
        return response.status(500).json({ message: 'Pedido não encontrado!' })
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        order[0].id,
        {
          $set: request.body,
        },
        { new: true }
      )

      return response.status(200).json(updatedOrder)
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
      await Order.findByIdAndDelete(id)

      return response.status(200).json('Order has been deleted!')
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
      const orders = await Order.find({ userId })

      return response.status(200).json(orders)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Get All Orders

router.get(
  '/',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    try {
      const orders = await Order.find()

      return response.status(200).json(orders)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Get Monthly Income

router.get(
  '/income',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
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
