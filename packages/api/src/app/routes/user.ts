import express, { Request, Response } from 'express'

import { prismaClient } from '../../database/prismaClient'
import { pagination } from '../middlewares/pagination'

import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middlewares/verifyToken'

const router = express.Router()

router.get(
  '/',
  verifyTokenAndAdmin,
  pagination,
  async (request: Request, response: Response) => {
    const {
      pagination: { take, sort, skip, order, filter },
    } = request as any

    try {
      const usersCount = await prismaClient.user.count({
        where: { ...filter },
      })

      const users = await prismaClient.user.findMany({
        where: { ...filter },
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
  }
)

// Get user stats

router.get(
  '/stats',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    const { orderBy, counter } = request.query as any

    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - counter))

    const lastMonth = new Date(date.setMonth(date.getMonth() - counter))
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - counter)
    )

    try {
      const stats = await prismaClient.user.groupBy({
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
  }
)

// Get user

router.get(
  '/:id',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    let { id } = request.params

    try {
      const user = await prismaClient.user.findUnique({
        where: { id },
        include: { userData: { include: { address: true } } },
      })

      return response.status(200).json({ user })
    } catch (error) {
      return response.status(500).json({ error })
    }
  }
)

// Update

router.put(
  '/:id',
  verifyTokenAndAuthorization,
  async (request: Request, response: Response) => {
    let { id } = request.params
    let { userData } = request.body

    const address = userData.address || {}

    let updatedUser

    try {
      const user = await prismaClient.user.findUnique({
        where: { id },
        include: { userData: { include: { address: true } } },
      })

      if (address) {
        updatedUser = await prismaClient.userAddress.update({
          where: { id: user?.userData?.userAddressId || '' },
          data: { ...address },
        })
      }

      if (userData) {
        updatedUser = await prismaClient.userData.update({
          where: { id: user?.userDataId || '' },
          data: { ...userData },
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
  }
)

// Delete

router.delete(
  '/:id',
  verifyTokenAndAuthorization,
  async (request: Request, response: Response) => {
    let { id } = request.params

    try {
      const user = await prismaClient.user.findUnique({ where: { id } })

      if (!user)
        return response.status(401).json({ message: 'User not founded!' })

      await prismaClient.user.delete({ where: { id } })

      return response.status(200).json({ message: 'User deleted succesfully!' })
    } catch (error) {
      return response.status(500).json({ error })
    }
  }
)

export default router
