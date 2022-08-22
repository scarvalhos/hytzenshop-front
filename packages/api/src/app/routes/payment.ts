import express, { Request, Response } from 'express'
import mercadopago from 'mercadopago'
import fetch from 'cross-fetch'
import { io } from '../..'

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN as string,
})

const router = express.Router()

router.post('/payment', async (request: Request, response: Response) => {
  const { method } = request.params

  if (method === 'boleto') {
    try {
      const res = await fetch('https://api.mercadopago.com/v1/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.body),
      })

      const data = await res.json()

      return response.status(200).json(data)
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  if (method === 'pix') {
    try {
      const res = await fetch('https://api.mercadopago.com/v1/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.body),
      })

      const data = await res.json()

      return response.status(200).json(data)
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  try {
    const data = await mercadopago.payment.create(request.body)

    if (data.response.status === 'rejected') {
      return response.status(400).json(data)
    }

    return response.status(200).json(data)
  } catch (error) {
    return response.status(400).json(error)
  }
})

router.post(
  '/payment/webhooks',
  async (request: Request, response: Response) => {
    const { id, topic } = request.query as any

    try {
      if (topic === 'payment') {
        const payment = await mercadopago.payment.findById(id)

        fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
          },
        }).then((res) => {
          io.emit('update.payment', { data: res })
          return response.status(200).json({ payment: payment, response: res })
        })
      }
      return response.status(200)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
)

export default router
