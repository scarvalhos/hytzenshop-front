import express, { Request, Response } from 'express'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

import { ValidationError } from 'yup'
import { sendBadRequest } from '../errors/BadRequest'
import { prismaClient } from '../../database/prismaClient'
import { verifyToken } from '../middlewares/verifyToken'
import { secret } from '../../config/auth'
import { hash } from '../../config/hash'

import {
  validateUser,
  validateUserAddress,
  validateUserData,
} from '../validators/auth'

import mailer from '../../modules/mailer'

import { URL_FRONTEND } from '../../config'

const router = express.Router()

// Register

router.post('/register', async (request: Request, response: Response) => {
  const { username, email, password, avatar, isAdmin, userData } = request.body

  let userAddressId

  try {
    const user =
      (await prismaClient.user.findUnique({ where: { username } })) ||
      (await prismaClient.user.findUnique({ where: { email } }))

    if (user) {
      return response.status(401).json('User already exists!')
    }

    await validateUser({
      username,
      email,
      password,
      avatar,
      isAdmin,
    })

    if (userData?.address) {
      await validateUserAddress({
        ...userData?.address,
      })
    }

    if (userData) {
      await validateUserData({
        ...userData,
      })
    }

    if (userData?.address) {
      userAddressId = await prismaClient.userAddress.create({
        data: { ...userData?.address },
      })
    }

    const userDataId =
      userData &&
      (await prismaClient.userData.create({
        data: {
          birthDate: userData?.birthDate,
          completeName: userData?.completeName,
          cpf: userData?.cpf,
          phone: userData?.phone,
          userAddressId: userAddressId?.id || undefined,
        },
      }))

    const newUser = await prismaClient.user.create({
      data: {
        username,
        email,
        password: CryptoJS.AES.encrypt(password, hash).toString(),
        avatar,
        isAdmin,
        ...(userDataId && {
          userDataId: userDataId.id || undefined,
        }),
      },
    })

    delete (newUser as any).password

    return response.status(201).json(newUser)
  } catch (error) {
    if (error instanceof ValidationError) {
      return sendBadRequest(request, response, error.errors)
    }

    return response.status(500).json(error)
  }
})

// Login

router.post('/login', async (request: Request, response: Response) => {
  const { username, password } = request.body

  try {
    const user = await prismaClient.user.findUnique({
      where: { username },
    })

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
        id: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: '2d' }
    )

    delete (user as any).password

    return response.status(200).json({ ...user, accessToken })
  } catch (error) {
    return response.status(500).json(error)
  }
})

// Me

router.get('/me', verifyToken, async (request: Request, response: Response) => {
  let { user, ...rest } = request.body

  try {
    const data = await prismaClient.user.findUnique({
      where: { id: user.id },
      include: { userData: { include: { address: true } } },
    })

    delete (data as any).password

    return response.status(200).json(data)
  } catch (error) {
    return response.status(500).json(error)
  }
})

// Forgot password

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body

  try {
    const user = await prismaClient.user.findUnique({ where: { email } })

    if (!user) return res.status(400).send({ error: 'User not found' })

    const token = jwt.sign(
      {
        id: user.id,
      },
      secret,
      { expiresIn: '1h' }
    )

    await prismaClient.user.update({
      where: { id: user.id },
      data: { passwordResetToken: token },
    })

    mailer.sendMail(
      {
        to: email,
        from: 'samcarvalhos@hotmail.com',
        subject: 'Redefina sua senha',
        html: `<a href="${URL_FRONTEND}/auth/reset-password?token=${token}">Definir a senha</a>`,
      },
      (err) => {
        if (err)
          return res
            .status(400)
            .send({ error: `Cannot send forgot password email ${err}` })

        return res.send()
      }
    )

    return res
      .status(200)
      .send({ message: `E-mail de recuperação enviado para '${email}'` })
  } catch (err) {
    res.status(400).send({ error: 'Error on forgot password. Try again' })
  }
})

// Reset password

router.post('/reset-password', async (req, res) => {
  const { email, token, password } = req.body

  try {
    const user = await prismaClient.user.findUnique({ where: { email } })

    if (!user) return res.status(400).send({ error: 'User not found' })

    if (token !== user.passwordResetToken)
      return res.status(400).send({ error: 'Token invalid' })

    jwt.verify(token, secret, (err: any, user: any) => {
      if (err)
        return res
          .status(400)
          .send({ error: 'Token expires. Generate a new one' })
    })

    user.password = CryptoJS.AES.encrypt(password, hash).toString()
    user.passwordResetToken = null

    await prismaClient.user.update({ where: { id: user.id }, data: user })

    return res.status(200).send({ message: 'Nova senha definida com sucesso!' })
  } catch (err) {
    res.status(400).send({ error: 'Cannot reset password. Try again' })
  }
})

export default router
