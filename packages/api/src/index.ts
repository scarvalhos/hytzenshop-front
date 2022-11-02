import 'dotenv/config'

import mongoose from 'mongoose'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import path from 'path'

import { testePrismaConnection } from './database/prismaClient'
import { Server } from 'socket.io'

import authRoute from './app/routes/auth'
import userRoute from './app/routes/user'
import cartRoute from './app/routes/cart'
import orderRoute from './app/routes/order'
import productRoute from './app/routes/product'
import categoryRoute from './app/routes/category'
import paymentRoute from './app/routes/payment'
import filesRoute from './app/routes/files'
import configRoute from './app/routes/config'

testePrismaConnection()

const app = express()
const httpServer = http.createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
)

const MONGODB_URL = process.env.MONGODB_URL as string

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log('DB connection successfull!'))
  .catch((err) => console.log(err))

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/carts', cartRoute)
app.use('/api/orders', orderRoute)
app.use('/api/products', productRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/checkout', paymentRoute)
app.use('/api/files', filesRoute)
app.use('/api/config', configRoute)

httpServer.listen(process.env.PORT || 3333, () =>
  console.log('Backend is running!')
)
