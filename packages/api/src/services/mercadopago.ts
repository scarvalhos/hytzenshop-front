import mercadopago from 'mercadopago'

export default mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN as string,
})
