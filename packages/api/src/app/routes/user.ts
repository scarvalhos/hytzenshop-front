import express, { Request, Response } from 'express'

import { sendInternalServerError } from '../errors/InternalServerError'
import { sendBadRequest } from '../errors/BadRequest'
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
        include: { profile: { include: { address: true } } },
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
      return sendInternalServerError(
        request,
        response,
        'Erro ao listar usuários!',
        error
      )
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
      return sendInternalServerError(
        request,
        response,
        'Erro ao buscar estatísticas de usuários!',
        error
      )
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
        include: { profile: { include: { address: true } } },
      })

      if (!user)
        return sendBadRequest(request, response, 'Usuário não encontrado!')

      return response
        .status(200)
        .json({ message: 'Usuário encontrado com sucesso!', user })
    } catch (error) {
      return sendInternalServerError(
        request,
        response,
        'Erro ao buscar usuário!',
        error
      )
    }
  }
)

// Update

router.put(
  '/:id',
  verifyTokenAndAuthorization,
  async (request: Request, response: Response) => {
    let { id } = request.params
    let { profile } = request.body

    const address = profile.address

    try {
      const user = await prismaClient.user.findUnique({
        where: { id },
        include: { profile: { include: { address: true } } },
      })

      if (!user)
        return sendBadRequest(request, response, 'Usuário não encontrado!')

      const updatedAddress = await prismaClient.address.upsert({
        where: { id: user?.profile?.addressId || '' },
        create: {
          ...address,
        },
        update: {
          ...address,
        },
      })

      const profileUpdated = await prismaClient.profile.upsert({
        where: { id: user?.profileId || '' },
        update: {
          avatar: profile.avatar,
          birthDate: profile.birthDate,
          completeName: profile.completeName,
          cpf: profile.cpf,
          phone: profile.phone,
          address: {
            connect: { id: updatedAddress.id },
          },
        },
        create: {
          avatar: profile.avatar,
          birthDate: profile.birthDate,
          completeName: profile.completeName,
          cpf: profile.cpf,
          phone: profile.phone,
          address: {
            connect: { id: updatedAddress.id },
          },
          user: { connect: { id: user?.id } },
        },
      })

      const userUpdated = await prismaClient.user.update({
        where: { id },
        data: {
          profile: {
            connect: { id: profileUpdated.id },
          },
        },
        include: { profile: { include: { address: true } } },
      })

      return response.status(200).json({
        message: 'Usuário atualizado com sucesso!',
        user: userUpdated,
      })
    } catch (error) {
      return sendInternalServerError(
        request,
        response,
        'Erro ao atualizar usuário!',
        error
      )
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
        return sendBadRequest(request, response, 'Usuário não encontrado!')

      await prismaClient.user.delete({ where: { id } })

      return response
        .status(200)
        .json({ message: 'Usuário excluído com sucesso!' })
    } catch (error) {
      return sendInternalServerError(
        request,
        response,
        'Erro ao excluir usuário!',
        error
      )
    }
  }
)

export default router
