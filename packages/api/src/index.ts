import 'dotenv/config'

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

import authRoute from './app/routes/auth'
import userRoute from './app/routes/user'
import cartRoute from './app/routes/cart'
import orderRoute from './app/routes/order'
import productRoute from './app/routes/product'
import categoryRoute from './app/routes/category'
// import stripeRoute from './app/routes/stripe'
import paymentRoute from './app/routes/payment'

const app = express()
const httpServer = http.createServer(app)

export const io = new Server(httpServer)

app.use(cors())
app.use(express.json())

io.on('connection', (socket) => {
  socket.emit('Hello', { name: 'Samara Carvalho' })
})

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

httpServer.listen(process.env.PORT || 3333, () =>
  console.log('Backend is running!')
)
