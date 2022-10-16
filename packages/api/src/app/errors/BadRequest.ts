const sendBadRequest = (req: any, res: any, message: any) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(`${req.method} ${req.originalUrl} - ${message}`)
  }

  res.status(400).json({
    data: null,
    message,
  })
}

export { sendBadRequest }
