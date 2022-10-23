import express, { Request, Response } from 'express'

import { sendInternalServerError } from '../errors/InternalServerError'
import { sendBadRequest } from '../errors/BadRequest'
import { File } from '../models/File'

import multerConfig from '../../config/multer'
import multer from 'multer'

const router = express.Router()

// GET ALL FILES

router.get('/', async (request: Request, response: Response) => {
  try {
    const files = await File.find()

    return response.status(200).json({
      message: 'Arquivos encontrados',
      data: {
        count: files.length,
        files,
      },
    })
  } catch (error) {
    return sendInternalServerError(
      request,
      response,
      'Erro ao listar arquivos',
      error
    )
  }
})

// GET FILE

router.get('/:id', async (request: Request, response: Response) => {
  const { id } = request.params

  try {
    const file = await File.findById(id)

    if (!file)
      return sendBadRequest(request, response, 'Arquivo não encontrado!')

    return response.status(200).json({
      message: 'Arquivo encontrado com sucesso!',
      file,
    })
  } catch (error) {
    return sendInternalServerError(
      request,
      response,
      'Erro ao buscar arquivo',
      error
    )
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
      return sendInternalServerError(
        request,
        response,
        'Erro ao fazer upload do arquivo',
        error
      )
    }
  }
)

// DELETE FILES

router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const file = await File.findById(request.params.id)

    if (!file)
      return sendBadRequest(request, response, 'Arquivo não encontrado!')

    await file?.remove()

    return response.send()
  } catch (error) {
    return sendInternalServerError(
      request,
      response,
      'Erro ao excluir arquivo',
      error
    )
  }
})

export default router
