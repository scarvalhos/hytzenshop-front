import express, { Request, Response } from 'express'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

import { sendInternalServerError } from '../errors/InternalServerError'
import { ValidationError } from 'yup'
import { sendBadRequest } from '../errors/BadRequest'
import { prismaClient } from '../../database/prismaClient'
import { URL_FRONTEND } from '../../config'
import { verifyToken } from '../middlewares/verifyToken'
import { secret } from '../../config/auth'
import { hash } from '../../config/hash'

import {
  validateUser,
  validateAddress,
  validateProfile,
} from '../validators/auth'

import mailer from '../../modules/mailer'

const router = express.Router()

// Register

router.post('/register', async (request: Request, response: Response) => {
  const { username, email, password, isAdmin, profile } = request.body

  let addressId

  try {
    const user =
      (await prismaClient.user.findUnique({ where: { username } })) ||
      (await prismaClient.user.findUnique({ where: { email } }))

    if (user) {
      return sendBadRequest(request, response, 'Usuário já cadastrado!')
    }

    await validateUser({
      username,
      email,
      password,
      isAdmin,
    })

    if (profile?.address) {
      await validateAddress({
        ...profile?.address,
      })
    }

    if (profile) {
      await validateProfile({
        ...profile,
      })
    }

    if (profile?.address) {
      addressId = await prismaClient.address.create({
        data: { ...profile?.address },
      })
    }

    const profileId =
      profile &&
      (await prismaClient.profile.create({
        data: {
          avatar: profile?.avatar,
          birthDate: profile?.birthDate,
          completeName: profile?.completeName,
          cpf: profile?.cpf,
          phone: profile?.phone,
          addressId: addressId?.id || undefined,
        },
      }))

    const newUser = await prismaClient.user.create({
      data: {
        username,
        email,
        password: CryptoJS.AES.encrypt(password, hash).toString(),
        isAdmin,
        ...(profileId && {
          profileId: profileId.id || undefined,
        }),
      },
      include: { profile: { include: { address: true } } },
    })

    delete (newUser as any).password

    return response.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      user: newUser,
    })
  } catch (error: any) {
    if (error instanceof ValidationError) {
      return sendBadRequest(request, response, error.errors)
    }

    return sendInternalServerError(request, response, error.message, error)
  }
})

// Login

router.post('/login', async (request: Request, response: Response) => {
  const { username, password } = request.body

  try {
    const user = await prismaClient.user.findUnique({
      where: { username },
      include: { profile: { include: { address: true } } },
    })

    if (!user) {
      return sendBadRequest(request, response, 'Usuário ou senha incorreta!')
    }

    const hashedPassword = CryptoJS.AES.decrypt(user?.password, hash).toString(
      CryptoJS.enc.Utf8
    )

    if (hashedPassword !== password) {
      return sendBadRequest(request, response, 'Usuário ou senha incorreta!')
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

    return response.status(200).json({
      message: 'Login efetuado com sucesso!',
      user: { ...user, accessToken },
    })
  } catch (error: any) {
    return sendInternalServerError(request, response, error.message, error)
  }
})

// Me

router.get('/me', verifyToken, async (request: Request, response: Response) => {
  let { user, ...rest } = request.body

  try {
    const data = await prismaClient.user.findUnique({
      where: { id: user.id },
      include: { profile: { include: { address: true } } },
    })

    delete (data as any).password

    return response.status(200).json({
      message: 'Usuário encontrado!',
      user: data,
    })
  } catch (error: any) {
    return sendInternalServerError(request, response, error.message, error)
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
  } catch (error: any) {
    return sendInternalServerError(req, res, error.message, error)
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
  } catch (error: any) {
    return sendInternalServerError(req, req, error.message, error)
  }
})

export default router
