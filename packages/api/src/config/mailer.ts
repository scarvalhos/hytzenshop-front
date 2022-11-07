import 'dotenv/config'

const mailerConfig = {
  port: process.env.MAILER_PORT || '',
  user: process.env.MAILER_USER || '',
  pass: process.env.MAILER_PASS || '',
  host: process.env.MAILER_HOST || '',
}

export { mailerConfig }
