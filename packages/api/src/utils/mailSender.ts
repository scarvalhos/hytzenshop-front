import transport from '../modules/mailer'

import { Request, Response } from 'express'
import { sendBadRequest } from '../app/errors/BadRequest'
import { mailerConfig } from '../config/mailer'

const mailerSender = (
  {
    to,

    html,
    subject,
  }: { to: string; subject: string; html: string },
  {
    req,
    res,
    errorMenssage,
  }: { req: Request; res: Response; errorMenssage?: string }
) => {
  return transport.sendMail(
    {
      to,
      from: mailerConfig.user,
      subject,
      html,
    },
    (err) => {
      if (err) return sendBadRequest(req, res, errorMenssage)

      return res.send()
    }
  )
}

export { mailerSender }
