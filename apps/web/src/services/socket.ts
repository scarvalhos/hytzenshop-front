import io from 'socket.io-client'

const websocketPort = process.env.NEXT_PUBLIC_WEBSOCKET_PORT || '3333'
const websocketHost = process.env.NEXT_PUBLIC_WEBSOCKET_HOST || 'localhost'
const websocketProtocol = process.env.NEXT_PUBLIC_WEBSOCKET_PROTOCOL || 'ws'

export const webSocketUriDev = `${websocketProtocol}://${websocketHost}:${websocketPort}`
export const webSocketUriPro = `${websocketProtocol}://${websocketHost}`

const webSocketUri =
  process.env.NEXT_PUBLIC_ENV_TYPE === 'development'
    ? webSocketUriDev
    : webSocketUriPro

export const socket = io(webSocketUri, {
  transports: ['websocket'],
})

export const socketPayments = io(`${webSocketUri}/api/checkout`, {
  transports: ['websocket'],
})
