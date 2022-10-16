import mongoose, { model } from 'mongoose'
import path from 'path'
import aws from 'aws-sdk'
import fs from 'fs'

import { promisify } from 'util'

const s3 = new aws.S3()

interface IFile {
  name: string
  size: number
  key: string
  url: string
}

const FileSchema = new mongoose.Schema<IFile>(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
    },
    key: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
)

FileSchema.pre('save', function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`
  }
})

FileSchema.pre('remove', function () {
  if (process.env.STORAGE_TYPE === 'production') {
    s3.deleteObject({
      Bucket: 'hytzenshop',
      Key: this.key,
    }).promise()
    return
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', this.key)
    )
  }
})

export const File = model<IFile>('File', FileSchema)
