import express, { Request, Response } from 'express'

import { sendInternalServerError } from '../errors/InternalServerError'
import { verifyTokenAndAdmin } from '../middlewares/verifyToken'
import { prismaClient } from '../../database/prismaClient'
import { searchFile } from '../../utils/files'

const router = express.Router()

// CREATE SYSTEM CONFIGS

router.post(
  '/',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    const { showAnnouncement, announcement, sliderImages } = request.body

    try {
      const systemConfigUpdated = await prismaClient.systemConfiguration.create(
        {
          data: {
            showAnnouncement,
            announcement,
            sliderImages,
          },
        }
      )

      return response.status(201).json({
        message: 'Configurações do sistema criado com sucesso!',
        systemConfiguration: systemConfigUpdated,
      })
    } catch (error: any) {
      return sendInternalServerError(request, response, error.message, error)
    }
  }
)

// UPDATE SYSTEM CONFIGS

router.put(
  '/',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    const { showAnnouncement, announcement, sliderImages } = request.body

    try {
      const systemConfig = await prismaClient.systemConfiguration.findFirst()

      const systemConfigUpdated = await prismaClient.systemConfiguration.upsert(
        {
          where: {
            id: systemConfig?.id,
          },
          create: {
            showAnnouncement,
            announcement,
            sliderImages,
          },
          update: {
            showAnnouncement,
            announcement,
            sliderImages,
          },
        }
      )

      return response.status(201).json({
        message: 'Configurações do sistema atualizadas com sucesso!',
        systemConfiguration: systemConfigUpdated,
      })
    } catch (error: any) {
      return sendInternalServerError(request, response, error.message, error)
    }
  }
)

// GET SYSTEM CONFIGS

router.get('/', async (request: Request, response: Response) => {
  try {
    const systemConfiguration =
      await prismaClient.systemConfiguration.findFirst({
        select: {
          id: true,
          announcement: true,
          showAnnouncement: true,
          sliderImages: true,
        },
      })

    const images = systemConfiguration?.sliderImages
      ? await searchFile(systemConfiguration?.sliderImages || '')
      : []

    return response.status(201).json({
      message: 'Configurações encontradas com sucesso!',
      systemConfiguration: {
        ...systemConfiguration,
        sliderImages: images,
      },
    })
  } catch (error: any) {
    return sendInternalServerError(request, response, error.message, error)
  }
})

export default router
