import express, { Request, Response } from 'express'

import { sendInternalServerError } from '../errors/InternalServerError'
import { verifyTokenAndAdmin } from '../middlewares/verifyToken'
import { Document, ObjectId } from 'mongoose'
import { sendBadRequest } from '../errors/BadRequest'
import { prismaClient } from '../../database/prismaClient'
import { pagination } from '../middlewares/pagination'
import { searchFile } from '../../utils/files'

const router = express.Router()

type Product = {
  id: string
  title: string
  description: string
  sizes: string[]
  colors: string[]
  price: number
  stock: number
  categories?: string[]
  createdAt: Date
  updatedAt: Date
  orderId: string | null
  images: string[]
}

type ProductsAll = Omit<Product, 'images'> & {
  images: (Document<unknown, any, any> & any & { _id: ObjectId }) | null
}

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
        product: newProduct,
      })
    } catch (error) {
      return sendInternalServerError(
        request,
        response,
        'Erro ao criar produto!',
        error
      )
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
      const product = await prismaClient.product.findUnique({ where: { id } })

      if (!product)
        return sendBadRequest(request, response, 'Product não encontrado!')

      const updatedProduct = await prismaClient.product.update({
        where: { id },
        data: {
          ...payload,
        },
      })

      return response.status(201).json({
        message: 'Produto atualizado com sucesso!',
        product: updatedProduct,
      })
    } catch (error) {
      return sendInternalServerError(
        request,
        response,
        'Erro ao atualizar produto!',
        error
      )
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
        return sendBadRequest(request, response, 'Product não encontrado!')

      await prismaClient.product.delete({ where: { id } })

      return response
        .status(200)
        .json({ message: 'Produto excluido com sucesso!' })
    } catch (error) {
      return sendInternalServerError(
        request,
        response,
        'Erro ao excluir produto!',
        error
      )
    }
  }
)

// Get Product

router.get('/:id', async (request: Request, response: Response) => {
  let { id } = request.params

  try {
    const product = await prismaClient.product.findUnique({ where: { id } })

    if (!product)
      return sendBadRequest(request, response, 'Product não encontrado!')

    const images = await searchFile(product?.images || '')

    return response.status(201).json({
      message: 'Produto encontrado com sucesso!',
      product: {
        ...product,
        images,
      },
    })
  } catch (error) {
    return sendInternalServerError(
      request,
      response,
      'Erro ao buscar produto!',
      error
    )
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
      products.map(async (product: Product): Promise<ProductsAll> => {
        const images = await searchFile(product?.images)

        return {
          images,
          id: product.id,
          title: product.title,
          description: product.description,
          colors: product.colors,
          sizes: product.sizes,
          stock: product.stock,
          categories: product.categories,
          price: product.price,
          orderId: product.orderId,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        }
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
    return sendInternalServerError(
      request,
      response,
      'Erro ao listar produtos!',
      error
    )
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
