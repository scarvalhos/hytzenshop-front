import express, { Request, Response } from 'express'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

import { Types } from 'mongoose'
import { User, IUser } from '../models/User'
import { secret } from '../../config/auth'
import { hash } from '../../config/hash'
import { verifyToken } from '../middlewares/verifyToken'

interface User extends IUser {
  _id: Types.ObjectId
  _doc: any
}

const router = express.Router()

// Register

router.post('/register', async (request: Request, response: Response) => {
  const { username, email, password } = request.body

  try {
    const user = await User.findOne({ username })

    if (user) {
      return response.status(401).json('User already exists!')
    }

    const newUser = await User.create({
      username,
      email,
      password: CryptoJS.AES.encrypt(password, hash).toString(),
    })

    return response.status(201).json(newUser)
  } catch (error) {
    return response.status(500).json(error)
  }
})

// Login

router.post('/login', async (request: Request, response: Response) => {
  const { username, password } = request.body

  try {
    const user: User | null = await User.findOne({ username })

    if (!user) {
      return response.status(401).json('Wrong credentials')
    }

    const hashedPassword = CryptoJS.AES.decrypt(user?.password, hash).toString(
      CryptoJS.enc.Utf8
    )

    if (hashedPassword !== password) {
      return response.status(401).json('Wrong password')
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: '3d' }
    )

    const { password: p, ...others } = user._doc

    return response.status(200).json({ ...others, accessToken })
  } catch (error) {
    return response.status(500).json(error)
  }
})

// Me

router.get('/me', verifyToken, async (request: Request, response: Response) => {
  let { user, ...rest } = request.body

  try {
    const data = await User.findById(user.id)
    return response.status(200).json(data)
  } catch (error) {
    return response.status(500).json(error)
  }
})

export default router
