import express, { Request, Response } from 'express'

import { hash } from '../../config/hash'
import { User } from '../models/User'

import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middlewares/verifyToken'

const router = express.Router()

// Get all users

router.get(
  '/',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    const query = request.query.new
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find()

      return response.status(200).json(users)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Get user stats

router.get(
  '/stats',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: '$createdAt' },
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: 1 },
          },
        },
      ])

      return response.status(200).json(data)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Get user

router.get(
  '/:id',
  verifyTokenAndAdmin,
  async (request: Request, response: Response) => {
    let { id } = request.params

    try {
      const user = await User.findById(id)

      return response.status(200).json(user)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Update

router.put(
  '/:id',
  verifyTokenAndAuthorization,
  async (request: Request, response: Response) => {
    let { id } = request.params
    let { user, ...rest } = request.body

    if (rest.password) {
      rest.password = CryptoJS.AES.encrypt(rest.password, hash).toString()
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: rest,
        },
        { new: true }
      )
      return response.status(200).json(updatedUser)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

// Delete

router.delete(
  '/:id',
  verifyTokenAndAuthorization,
  async (request: Request, response: Response) => {
    let { id } = request.params

    try {
      await User.findByIdAndDelete(id)

      return response.status(200).json('User has been deleted!')
    } catch (error) {
      return response.status(500).json(error)
    }
  }
)

export default router
