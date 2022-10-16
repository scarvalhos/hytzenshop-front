import nodemailer from 'nodemailer'

import { mailer } from '../config/mailer'

const { host, port, user, pass } = mailer

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
