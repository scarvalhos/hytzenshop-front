const sendInternalServerError = (
  req: any,
  res: any,
  message: string,
  error: any
) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(error)
    console.error(`${req.method} ${req.originalUrl} - ${message}`)
  }
  return res.status(500).json({
    message: message || 'Erro interno do servidor',
  })
}

export { sendInternalServerError }
