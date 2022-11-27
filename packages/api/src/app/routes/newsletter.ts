import express, { Request, Response } from 'express'

import { sendInternalServerError } from '../errors/InternalServerError'
import { verifyTokenAndAdmin } from '../middlewares/verifyToken'
import { sendBadRequest } from '../errors/BadRequest'
import { NewsletterSubs } from '../models/NewsletterSubs'

const router = express.Router()

// GET ALL NEWSLETTER SUBS

router.get(
  '/',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    try {
      const newsletterSubs = await NewsletterSubs.find()

      return response.status(200).json({
        message: 'Contatos encontrados',
        data: {
          count: newsletterSubs.length,
          newsletterSubs,
        },
      })
    } catch (error: any) {
      return sendInternalServerError(request, response, error.message, error)
    }
  }
)

// GET NEWSLETTER SUB

router.get(
  '/:email',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    const { email } = request.params

    try {
      const newsletterSub = await NewsletterSubs.findOne({ email })

      if (!newsletterSub)
        return sendBadRequest(
          request,
          response,
          'Contato não encontrado na newsletter!'
        )

      return response.status(200).json({
        message: 'Contato encontrado com sucesso!',
        newsletterSub,
      })
    } catch (error: any) {
      return sendInternalServerError(request, response, error.message, error)
    }
  }
)

// CREATE NEWSLETTER SUB

router.post('/', async (request: Request, response: Response) => {
  const { email } = request.body as any

  try {
    const newsletterSub = await NewsletterSubs.findOne({ email })

    if (newsletterSub)
      return sendBadRequest(
        request,
        response,
        'Contato já cadastrado na newsletter!'
      )

    const newNewsletterSub = await NewsletterSubs.create({
      email,
    })

    return response.status(200).json({
      message: 'Contato adiconado a newsletter com sucesso!',
      newsletterSub: newNewsletterSub,
    })
  } catch (error: any) {
    return sendInternalServerError(request, response, error.message, error)
  }
})

// DELETE NEWSLETTER SUB

router.delete('/:email', async (request: Request, response: Response) => {
  try {
    const newsletterSub = await NewsletterSubs.findOne({
      email: request.params.email,
    })

    if (!newsletterSub)
      return sendBadRequest(
        request,
        response,
        'Contato não encontrado na newsletter!'
      )

    await newsletterSub?.remove()

    return response.status(200).json({
      message: 'Contato removido da newsletter com sucesso!',
    })
  } catch (error: any) {
    return sendInternalServerError(request, response, error.message, error)
  }
})

// DELETE NEWSLETTER SUBS

router.delete('/', async (request: Request, response: Response) => {
  const emails = request.body.emails as []

  try {
    const subsNotFounded = [] as any

    await Promise.all(
      emails.map(async (email) => {
        const newsletterSub = await NewsletterSubs.findOne({ email })

        if (!newsletterSub || newsletterSub === null) subsNotFounded.push(email)

        await newsletterSub?.remove()
      })
    )

    return response.status(200).json({
      message: 'Contatos removidos da newsletter com sucesso!',
      subsNotFounded,
    })
  } catch (error: any) {
    return sendInternalServerError(request, response, error.message, error)
  }
})

export default router
