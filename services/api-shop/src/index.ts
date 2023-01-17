import 'dotenv/config'

import express, { Request, Response } from 'express'
import cors from 'cors'
import http from 'http'

const app = express()
const httpServer = http.createServer(app)
const router = express.Router()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  '/api',
  router.get('/', async (request: Request, response: Response) => {
    try {
      return response.status(201).json({
        message: 'Hello World!',
      })
    } catch (error: any) {
      return response.status(500).json({
        message: error.message || 'Erro interno do servidor',
      })
    }
  })
)

httpServer.listen(process.env.PORT || 2090, () =>
  console.log(`Backend is running at PORT ${process.env.PORT || 2090}!`)
)
