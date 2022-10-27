import express, { Request, Response } from 'express'

import { verifyToken, verifyTokenAndAdmin } from '../middlewares/verifyToken'
import { sendInternalServerError } from '../errors/InternalServerError'
import { sendBadRequest } from '../errors/BadRequest'
import { prismaClient } from '../../database/prismaClient'
import { pagination } from '../middlewares/pagination'
import { searchOrder } from '../../utils/files'

const router = express.Router()

export type OrderStatus =
  | 'pending'
  | 'approved'
  | 'processing'
  | 'sending'
  | 'delivered'

// Create Order

router.post('/', verifyToken, async (request: Request, response: Response) => {
  const { addressId, orderedProducts, userId, amount, mpPaymentId, status } =
    request.body

  try {
    const orderedProductsIds = await Promise.all(
      orderedProducts.map(async (item: any): Promise<any> => {
        const orderedProduct = await prismaClient.orderedProduct.upsert({
          where: { id: item.id || '' },
          update: {
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            colors: item.colors,
            sizes: item.sizes,
          },
          create: {
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            colors: item.colors,
            sizes: item.sizes,
          },
        })

        return orderedProduct.id
      })
    )

    const newOrder = await prismaClient.order.create({
      data: {
        amount,
        mpPaymentId,
        status,
        address: { connect: { id: addressId } },
        user: { connect: { id: userId } },
        orderedProductsIds: orderedProductsIds,
      },
    })

    return response.status(201).json({
      message: 'Pedido criado com sucesso!',
      order: newOrder,
    })
  } catch (error: any) {
    return sendInternalServerError(request, response, error.message, error)
  }
})

// Update Order

router.put(
  '/:id',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    let { id } = request.params

    try {
      const order = await prismaClient.order.findUnique({
        where: {
          id,
        },
      })

      if (!order)
        return sendBadRequest(request, response, 'Pedido não encontrado')

      const updatedOrder = await prismaClient.order.update({
        where: {
          id,
        },
        data: request.body,
      })

      return response.status(200).json({
        message: 'Pedido atualizado com sucesso!',
        order: updatedOrder,
      })
    } catch (error: any) {
      return sendInternalServerError(request, response, error.message, error)
    }
  }
)

// User Update Order

router.patch(
  '/:id/:status',
  verifyToken,
  async (request: Request, response: Response) => {
    let { id, status } = request.params as { id: string; status: OrderStatus }
    const { user } = request.body

    try {
      const order = await prismaClient.order.findFirst({
        where: { mpPaymentId: id },
      })

      if (!order)
        return sendBadRequest(request, response, 'Pedido não encontrado')

      if (!user.isAdmin && user.id !== order?.userId)
        return sendBadRequest(
          request,
          response,
          'Você não tem permissão para isso!'
        )

      const updatedOrder = await prismaClient.order.update({
        where: { id: order.id },
        data: {
          status,
        },
      })

      return response.status(200).json({
        message: 'Pedido atualizado com sucesso!',
        order: updatedOrder,
      })
    } catch (error: any) {
      return sendInternalServerError(request, response, error.message, error)
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

      if (!order)
        return sendBadRequest(request, response, 'Pedido não encontrado')

      await prismaClient.order.delete({ where: { id } })

      return response.status(200).json({
        message: 'Pedido excluído com sucesso!',
      })
    } catch (error: any) {
      return sendInternalServerError(request, response, error.message, error)
    }
  }
)

// Get User Order

router.get(
  '/order/:orderId',
  verifyToken,
  async (request: Request, response: Response) => {
    let { orderId } = request.params
    const { user } = request.body

    try {
      const order = await prismaClient.order.findUnique({
        where: { id: orderId },
        include: { address: true },
      })

      if (!order)
        return sendBadRequest(request, response, 'Pedido não encontrado')

      if (!user.isAdmin && user.id !== order?.userId)
        return sendBadRequest(
          request,
          response,
          'Você não tem permissão para isso!'
        )

      const orderedProducts = await searchOrder(order.orderedProductsIds)

      return response.status(200).json({
        message: 'Pedido encontrado com sucesso!',
        order: {
          orderedProducts,
          ...order,
        },
      })
    } catch (error: any) {
      return sendInternalServerError(request, response, error.message, error)
    }
  }
)

// Get User Orders

router.get(
  '/:userId',
  pagination,
  verifyToken,
  async (request: Request, response: Response) => {
    const {
      pagination: { take, sort, skip, order, filter },
    } = request as any

    const { userId } = request.params
    const { user } = request.body

    if (!user.isAdmin && user.id !== userId)
      return sendBadRequest(
        request,
        response,
        'Você não tem permissão para isso!'
      )
    try {
      const ordersCount = await prismaClient.order.count({
        where: { userId, ...filter },
      })

      const orders = await prismaClient.order.findMany({
        where: { userId, ...filter },
        include: { address: true },
        orderBy: { [sort]: order },
        skip,
        take,
      })

      const ordersParsed = await Promise.all(
        orders.map(async (order: any): Promise<any> => {
          const orderedProducts = await searchOrder(order.orderedProductsIds)

          return {
            orderedProducts,
            ...order,
          }
        })
      )

      return response.status(200).json({
        message: 'Pedidos encontrados com sucesso!',
        data: {
          count: ordersCount,
          orders: ordersParsed,
        },
      })
    } catch (error: any) {
      return sendInternalServerError(request, response, error.message, error)
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
        include: {
          address: true,
          user: {
            select: {
              profile: true,
              id: true,
              email: true,
              isAdmin: true,
              username: true,
            },
          },
        },
        orderBy: { [sort]: order },
        skip,
        take,
      })

      const ordersParsed = await Promise.all(
        orders.map(async (order: any): Promise<any> => {
          const orderedProducts = await searchOrder(order.orderedProductsIds)

          return {
            orderedProducts,
            ...order,
          }
        })
      )

      return response.status(200).json({
        message: 'Pedidos listados com sucesso!',
        data: {
          count: ordersCount,
          orders: ordersParsed,
        },
      })
    } catch (error: any) {
      return sendInternalServerError(request, response, error.message, error)
    }
  }
)

// Get Monthly Income

// router.get(
//   '/income',
//   verifyTokenAndAdmin,
//   async (_request: Request, response: Response) => {
//     const date = new Date()
//     const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
//     const previousMonth = new Date(
//       new Date().setMonth(lastMonth.getMonth() - 1)
//     )

//     try {
//       const income = await Order.aggregate([
//         { $match: { createdAt: { $gte: previousMonth } } },
//         {
//           $project: {
//             month: { $month: '$createdAt' },
//             sales: '$amount',
//           },
//         },
//         {
//           $group: {
//             _id: '$month',
//             total: { $sum: '$sales' },
//           },
//         },
//       ])

//       return response.status(200).json(income)
//     } catch (error) {
//       return response.status(500).json(error)
//     }
//   }
// )

export default router
