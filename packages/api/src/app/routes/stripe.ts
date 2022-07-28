import express, { Request, Response } from 'express'

import stripe from '../../services/stripe'

const router = express.Router()

router.post('/payment', (request: Request, response: Response) => {
  const { tokenId, amount } = request.body

  stripe.charges
    .create({
      source: tokenId,
      amount,
      currency: 'brl',
    })
    .then((stripeRes) => {
      return response.status(200).json(stripeRes)
    })
    .catch((stripeErr) => {
      return response.status(500).json(stripeErr)
    })
})

export default router
