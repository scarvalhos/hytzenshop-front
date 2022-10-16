import express, { Request, Response } from 'express'

import { verifyTokenAndAdmin } from '../middlewares/verifyToken'
import { prismaClient } from '../../database/prismaClient'

const router = express.Router()

// Create Category

router.post(
  '/',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    const { name } = request.body

    try {
      const category = await prismaClient.category.findFirst({
        where: { name },
      })

      if (category) {
        return response.status(400).json('Essa categoria já existe')
      }

      const newCategory = await prismaClient.category.create({ data: { name } })

      return response.status(201).json({
        message: 'Categoria criada com sucesso!',
        data: { category: newCategory },
      })
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Delete Category

router.delete(
  '/:id',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    let { id } = request.params

    try {
      const category = await prismaClient.category.findUnique({ where: { id } })

      if (!category)
        return response.status(401).json({ message: 'Category not founded!' })

      await prismaClient.category.delete({ where: { id } })

      return response.status(200).json({
        message: 'Categoria excluida com sucesso!',
      })
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Get Category

router.get('/:id', async (request: Request, response: Response) => {
  let { id } = request.params

  try {
    const category = await prismaClient.category.findUnique({ where: { id } })

    if (!category) {
      return response.status(401).json({
        message: 'Categoria não encontrada!',
      })
    }

    return response.status(200).json({
      message: 'Categoria encontrada com sucesso!',
      data: { category },
    })
  } catch (error) {
    return response.status(500).json(error)
  }
})

// Get All Categories

router.get('/', async (request: Request, response: Response) => {
  try {
    const categories = await prismaClient.category.findMany()

    return response.status(200).json({
      message: 'Categorias encontradas com sucesso!',
      data: {
        count: categories.length,
        categories,
      },
    })
  } catch (error) {
    return response.status(500).json(error)
  }
})

export default router
