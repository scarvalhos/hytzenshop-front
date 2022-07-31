import express, { Request, Response } from 'express'

import { Product } from '../models/Product'

import { verifyTokenAndAdmin } from '../middlewares/verifyToken'

const router = express.Router()

// Create Product

router.post(
  '/',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    try {
      const newProduct = await Product.create(request.body)

      return response.status(201).json(newProduct)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Update Product

router.put(
  '/:id',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    let { id } = request.params

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          $set: request.body,
        },
        { new: true }
      )
      return response.status(200).json(updatedProduct)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Delete Product

router.delete(
  '/:id',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    let { id } = request.params

    try {
      await Product.findByIdAndDelete(id)

      return response.status(200).json('Product has been deleted!')
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Get Product

router.get('/:id', async (request: Request, response: Response) => {
  let { id } = request.params

  try {
    const product = await Product.findById(id)

    return response.status(200).json(product)
  } catch (error) {
    return response.status(500).json(error)
  }
})

// Get All Products

router.get('/', async (request: Request, response: Response) => {
  const { new: qNew, category, limit, filter } = request.query

  try {
    let products

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5)
    } else if (category) {
      if (limit) {
        products = await Product.find({
          categories: {
            $in: [category],
          },
        }).limit(Number(limit))
      } else {
        products = await Product.find({
          categories: {
            $in: [category],
          },
        })
      }
    } else if (filter) {
      const { productTitle }: any = filter

      products = await Product.find({
        title: new RegExp(productTitle, 'gi'),
      })
    } else {
      products = await Product.find()
    }

    return response.status(200).json(products)
  } catch (error) {
    return response.status(500).json(error)
  }
})

export default router
