import { File } from '../app/models/File'
import { prismaClient } from '../database/prismaClient'

const searchFile = (id: string | string[]) => {
  return typeof id === 'string'
    ? File.findById(id)
    : Promise.all(id.map((el) => File.findById(el)))
}

const searchOrder = (id: string | string[]) => {
  return typeof id === 'string'
    ? prismaClient.orderedProduct.findUnique({ where: { id } })
    : Promise.all(
        id.map((el) =>
          prismaClient.orderedProduct.findUnique({ where: { id: el } })
        )
      )
}

export { searchFile, searchOrder }
