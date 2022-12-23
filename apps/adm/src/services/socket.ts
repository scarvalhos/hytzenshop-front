import io from 'socket.io-client'

export const webSocketUriDev = 'ws://localhost:3333'
export const webSocketUriPro = `${process.env.NEXT_PUBLIC_WEBSOCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_WEBSOCKET_HOST}`

const webSocketUri =
  process.env.NEXT_PUBLIC_ENV_TYPE === 'development'
    ? webSocketUriDev
    : webSocketUriPro

export const socket = io(webSocketUri, {
  transports: ['websocket', 'polling'],
})

export const socketPayments = io(`${webSocketUri}/api/checkout`, {
  transports: ['websocket', 'polling'],
})
