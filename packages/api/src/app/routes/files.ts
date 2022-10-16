import express, { Request, Response } from 'express'
import { File } from '../models/File'

import multerConfig from '../../config/multer'
import multer from 'multer'

const router = express.Router()

// GET ALL FILES

router.get('/', async (request: Request, response: Response) => {
  try {
    const files = await File.find()
    return response.status(200).json(files)
  } catch (error) {
    return response.status(500).json(error)
  }
})

// GET FILE

router.get('/:id', async (request: Request, response: Response) => {
  const { id } = request.params

  try {
    const file = await File.findById(id)

    return response.status(200).json({
      message: 'Arquivo encontrado com sucesso!',
      data: {
        file,
      },
    })
  } catch (error) {
    return response.status(500).json(error)
  }
})

// CREATE FILES

router.post(
  '/',
  multer(multerConfig).single('file'),
  async (request: Request, response: Response) => {
    try {
      const {
        originalname: name,
        size,
        key,
        location: url = '',
      } = request.file as any

      const file = await File.create({
        name,
        size,
        key,
        url,
      })

      return response.status(200).json(file)
    } catch (error) {
      console.log(error)
      return response.status(500).json(error)
    }
  }
)

// DELETE FILES

router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const file = await File.findById(request.params.id)

    await file?.remove()

    return response.send()
  } catch (error) {
    return response.status(500).json(error)
  }
})

export default router
