import 'dotenv/config'

import { S3Client } from '@aws-sdk/client-s3'

import multerS3 from 'multer-s3'
import multer from 'multer'
import crypto from 'crypto'
import path from 'path'

type StorageType = 'production' | 'development'

const STORAGE_TYPE = process.env.STORAGE_TYPE as StorageType

const ClienteS3 = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
})

const storageType = {
  development: multer.diskStorage({
    destination: (_req: any, file: any, callback: any) => {
      callback(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    filename: (_req: any, file: any, callback: any) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) callback(err)
        file.key = `${hash.toString('hex')}-${file.originalname}`

        callback(null, file.key)
      })
    },
  }),
  production: multerS3({
    s3: ClienteS3 as any,
    bucket: 'hytzenshop',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, callback) =>
      crypto.randomBytes(16, (err, hash) => {
        if (err) callback(err)
        const fileName = `${hash.toString('hex')}-${file.originalname}`
        callback(null, fileName)
      }),
  }),
}

export default {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageType[STORAGE_TYPE],
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (_req: any, file: any, callback: any) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ]

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new Error('Inválid file type.'))
    }
  },
}
