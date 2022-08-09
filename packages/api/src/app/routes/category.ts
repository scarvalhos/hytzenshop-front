import express, { Request, Response } from 'express'

import { Category } from '../models/Category'

import { verifyTokenAndAdmin } from '../middlewares/verifyToken'

const router = express.Router()

// Create Category

router.post(
  '/',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    try {
      const category = await Category.find(request.body)

      if (category === []) {
        return response.status(400).json('Essa categoria já existe')
      }

      const newCategory = await Category.create(request.body)

      return response.status(201).json(newCategory)
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
      await Category.findByIdAndDelete(id)

      return response.status(200).json('Product has been deleted!')
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Get Category

router.get('/:id', async (request: Request, response: Response) => {
  let { id } = request.params

  try {
    const category = await Category.findById(id)

    return response.status(200).json(category)
  } catch (error) {
    return response.status(500).json(error)
  }
})

// Get All Categories

router.get('/', async (request: Request, response: Response) => {
  try {
    const categories = await Category.find()

    return response.status(200).json(categories)
  } catch (error) {
    return response.status(500).json(error)
  }
})

export default router
