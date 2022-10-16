import 'dotenv/config'

import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

async function testePrismaConnection() {
  try {
    await prismaClient.user.findFirst()
    console.log('Conectado ao Prisma')
  } catch (error) {
    console.error('Falha ao conectar ao Prisma')
  }
}

export { prismaClient, testePrismaConnection }
