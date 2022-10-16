import express, { Request, Response } from 'express'
import { verifyTokenAndAdmin } from '../middlewares/verifyToken'
import { prismaClient } from '../../database/prismaClient'
import { pagination } from '../middlewares/pagination'
import { File } from '../models/File'
import { searchFile } from '../../utils/files'

const router = express.Router()

// Create Product

router.post(
  '/',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    const {
      title,
      description,
      images,
      categories,
      sizes,
      colors,
      price,
      stock,
    } = request.body

    try {
      const newProduct = await prismaClient.product.create({
        data: {
          title,
          description,
          images,
          categories,
          sizes,
          colors,
          price,
          stock,
        },
      })

      return response.status(201).json({
        message: 'Produto cadastrado com sucesso!',
        data: {
          product: newProduct,
        },
      })
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
    const { user, ...payload } = request.body

    try {
      const updatedProduct = await prismaClient.product.update({
        where: { id },
        data: {
          ...payload,
        },
      })

      return response.status(201).json({
        message: 'Produto atualizado com sucesso!',
        data: {
          product: updatedProduct,
        },
      })
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
      const product = await prismaClient.product.findUnique({ where: { id } })

      if (!product)
        return response.status(401).json({ message: 'Product not founded!' })

      await prismaClient.product.delete({ where: { id } })

      return response
        .status(200)
        .json({ message: 'Product deleted succesfully!' })
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Get Product

router.get('/:id', async (request: Request, response: Response) => {
  let { id } = request.params

  try {
    const product = await prismaClient.product.findUnique({ where: { id } })

    const images = await searchFile(product?.images || '')

    return response.status(201).json({
      message: 'Produto encontrado com sucesso!',
      data: {
        product: {
          ...product,
          images,
        },
      },
    })
  } catch (error) {
    return response.status(500).json(error)
  }
})

// Get All Products

router.get('/', pagination, async (request: Request, response: Response) => {
  const {
    pagination: { take, sort, skip, order, filter },
  } = request as any

  try {
    const productsCount = await prismaClient.product.count({
      where: { ...filter },
    })

    const products = await prismaClient.product.findMany({
      where: { ...filter },
      orderBy: { [sort]: order },
      skip,
      take,
    })

    const productsParsed = await Promise.all(
      products.map(async (product): Promise<any> => {
        const images = await searchFile(product?.images)

        return { ...product, images }
      })
    )

    return response.status(200).json({
      message: 'Produtos listados com sucesso!',
      data: {
        count: productsCount,
        products: productsParsed,
      },
    })
  } catch (error) {
    return response.status(500).json(error)
  }
})

export default router

// Filter by category example

// const params = new URLSearchParams()

// const filterString = JSON.stringify({
//   categories: { hasSome: ['t-shirts'] },
// })

// params.set('limit', '10')
// params.set('page', '1')
// params.set('sort', 'createdAt')
// params.set('order', 'desc')

// params.set('filter', filterString)

// (`http://localhost:3333/api/products?${params}`)
