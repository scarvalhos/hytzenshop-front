import { useDebounceCallback } from '@react-hook/debounce'
import { useQueryClient } from '@tanstack/react-query'
import { TbBellRinging } from 'react-icons/tb'
import { socket } from '@services/socket'
import { toast } from '@luma/ui'

import React from 'react'

type SocketProviderProps = {
  children: React.ReactNode
}

type SocketContextData = {
  ok?: boolean
}

export const SocketContext = React.createContext({} as SocketContextData)

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const queryClient = useQueryClient()

  const onSocketNotification = useDebounceCallback((arg) => {
    const queryKey = {
      user: ['users'],
      cart: ['carts'],
      evaluation: ['evaluations'],
      newsletter: ['newsletter'],
      order: ['orders'],
      payment: ['orders'],
    }[String(arg.reference)]

    queryClient.invalidateQueries(queryKey)
    queryClient.invalidateQueries(['me'])

    new Audio('/audios/notification.mp3').play()

    return toast.primary(arg.data.message, {
      icon: <TbBellRinging size={20} className="text-primary-300" />,
    })
  })

  const onSocketConnected = useDebounceCallback((arg) =>
    console.info(arg, 'connected')
  )

  React.useEffect(() => {
    socket.on('notification-adm', (arg) => {
      onSocketNotification(arg)
    })
  }, [onSocketNotification])

  React.useEffect(() => {
    socket.on('connected', (arg) => onSocketConnected(arg))
  }, [onSocketConnected])

  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>
}

export const useNotification = () => {
  return React.useContext(SocketContext)
}
