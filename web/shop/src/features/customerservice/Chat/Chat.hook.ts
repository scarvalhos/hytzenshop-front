import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'

import { ChatGetDto, ChatMessage } from '@hytzenshop/types'
import { FieldValues, useForm } from 'react-hook-form'
import { useDebounceCallback } from '@react-hook/debounce'
import { defaultToastError } from '@hytzenshop/helpers'
import { ChatProps } from './Chat'
import { useAuth } from '@contexts/AuthContext'
import { socket } from '@services/socket'
import { api } from '@hytzenshop/services'

import React from 'react'

const getChat = async (id?: string | null) => {
  return api
    .get<ChatGetDto>(`/customerservice/chat/${id}`)
    .then(({ data }) => data)
}

const sendMessage = async ({
  id,
  message,
}: {
  id: string
  message: string
}) => {
  return api
    .put<ChatGetDto>(`/customerservice/chat/${id}`, { message })
    .then(({ data }) => data)
}

export const useChat = ({ id }: ChatProps) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([])

  const { control, handleSubmit, register, reset } = useForm()
  const { user } = useAuth()

  const queryClient = useQueryClient()

  const chatQuery = useQuery(['chat', id], () => getChat(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  }) as UseQueryResult<ChatGetDto, unknown>

  const sendMessageMutation = useMutation(sendMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries(['chat', id])
      reset({
        message: '',
      })
    },
    onError: defaultToastError,
  })

  const onSubmit = React.useCallback(
    (values: FieldValues) => {
      sendMessageMutation.mutateAsync({
        id: String(id),
        message: values.message,
      })
    },
    [id, sendMessageMutation]
  )

  const onRecieveMessage = useDebounceCallback((arg) =>
    setMessages(arg.data.chat || [])
  )

  React.useEffect(() => {
    if (id) {
      socket.emit('entered-chat', {
        chatId: id,
      })
    }
  }, [id, user?.id])

  React.useEffect(() => {
    socket.on('new-chat', (arg) => {
      onRecieveMessage(arg)
    })
  }, [onRecieveMessage])

  React.useEffect(
    () => setMessages(chatQuery.data?.chat.chat || []),
    [chatQuery.data?.chat.chat, id]
  )

  React.useEffect(() => {
    if (window) {
      window.addEventListener('beforeunload', function () {
        socket.emit('leave-chat', {
          chatId: id,
        })
      })
    }
  }, [id])

  return {
    control,
    handleSubmit,
    messages,
    onSubmit,
    register,
    chatQuery,
    user,
  }
}
