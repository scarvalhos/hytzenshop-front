import nodemailer from 'nodemailer'

import { mailerConfig } from '../config/mailer'

const { host, port, user, pass } = mailerConfig

const transport = nodemailer.createTransport({
  host,
  port: parseInt(port || ''),
  secure: false,
  auth: {
    user,
    pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

export default transport
