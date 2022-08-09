import express, { Request, Response } from 'express'
import mercadopago from 'mercadopago'

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN as string,
})

const router = express.Router()

router.post('/payment', async (request: Request, response: Response) => {
  const { method } = request.params
  try {
    if (method === 'boleto') {
      const res = await fetch('https://api.mercadopago.com/v1/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.body),
      })

      const data = await res.json()

      return response.status(200).json(data)
    }

    const data = await mercadopago.payment.create(request.body)

    return response.status(200).json(data)
  } catch (error) {
    return response.status(400).json(error)
  }
})

export default router
