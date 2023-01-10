import * as yup from 'yup'

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'

import { ChatGetDto, ChatMessage } from '@hytzenshop/types'
import { FieldValues, useForm } from 'react-hook-form'
import { useDebounceCallback } from '@react-hook/debounce'
import { yupResolver } from '@hookform/resolvers/yup'
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

const readMessage = async (id: string) => {
  return api
    .put<ChatGetDto>(`/customerservice/message/${id}/read`)
    .then(({ data }) => data)
}

const usePrevious = (value?: string | null) => {
  const ref = React.useRef<string | undefined | null>('')

  React.useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

const validate = yup.object().shape({
  message: yup.string().required('Campo obrigatório'),
})

export const useChat = ({ id }: ChatProps) => {
  const [seeEmojiPicker, setSeeEmojiPicker] = React.useState(false)
  const [messages, setMessages] = React.useState<ChatMessage[]>([])

  const [showButton, setShowButton] = React.useState(false)
  const [atBottom, setAtBottom] = React.useState(false)

  const showButtonTimeoutRef = React.useRef<any>(null)
  const appendInterval = React.useRef<any>(null)
  const virtuoso = React.useRef<any>(null)

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validate),
  })

  const { user } = useAuth()

  const queryClient = useQueryClient()
  const prevChatId = usePrevious(id)

  const chatQuery = useQuery(['chat', id], () => getChat(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  }) as UseQueryResult<ChatGetDto, unknown>

  const parsedMessages = React.useMemo(
    () =>
      [
        {
          id: chatQuery.data?.chat.userId,
          message: chatQuery.data?.chat.description,
          createdAt: chatQuery.data?.chat.createdAt,
          messageUserId: chatQuery.data?.chat.userId,
          name:
            chatQuery.data?.chat.user.profile?.completeName ||
            chatQuery.data?.chat.user.username,
          sended: Boolean(chatQuery.data?.chat.updatedAt),
          read: false,
        },
      ].concat(
        messages.map((m) => {
          return {
            id: m.id,
            message: m.message,
            createdAt: m.createdAt,
            messageUserId: m.userId,
            name: m.user?.profile?.completeName || m.user?.username,
            sended: Boolean(m.updatedAt),
            read: Boolean(m.read),
          }
        })
      ),
    [chatQuery.data?.chat, messages]
  )

  const sendMessageMutation = useMutation(sendMessage, {
    onMutate: async (chat) => {
      await queryClient.cancelQueries({ queryKey: ['chat', id] })

      const previousChat = queryClient.getQueryData<ChatGetDto>(['chat', id])

      queryClient.setQueryData(['chat', id], {
        ...previousChat,
        chat: {
          ...previousChat?.chat,
          chat: [
            ...(previousChat?.chat.chat || []),
            {
              id: chat.id,
              message: chat.message,
              chatId: previousChat?.chat.id,
              chat: previousChat?.chat,
              userId: user?.id,
              user,
              createdAt: new Date().toString(),
            },
          ],
        },
      })

      return {
        previousChat,
        chat: {
          ...previousChat,
          chat: {
            ...previousChat?.chat,
            chat: [
              ...(previousChat?.chat.chat || []),
              {
                id: chat.id,
                message: chat.message,
                chatId: previousChat?.chat.id,
                chat: previousChat?.chat,
                userId: user?.id,
                user,
                createdAt: new Date().toString(),
              },
            ],
          },
        },
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', id] })
      reset({
        message: '',
      })
    },

    onError: (_err, _newChat, context) => {
      queryClient.setQueryData(['chat', id], context?.previousChat)
    },
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

  const onRecieveMessage = useDebounceCallback((arg) => {
    setMessages(arg.data.chat || [])
  })

  const onUpdateMessage = useDebounceCallback((arg) => {
    queryClient.invalidateQueries(['chat', arg.data.chatId])
  })

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

  React.useEffect(() => {
    socket.on('update-chat', (arg) => {
      onUpdateMessage(arg)
    })
  }, [onUpdateMessage])

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

  React.useEffect(() => {
    const unreadMessages = messages.filter(
      (m) => m.userId !== user?.id && m.read === false
    )

    if (unreadMessages.length > 0) {
      for (const message of unreadMessages) {
        readMessage(message?.id)
      }
    }
  }, [messages, user?.id])

  React.useEffect(() => {
    const cleanUp = appendInterval.current

    return () => {
      clearInterval(cleanUp)
      clearTimeout(showButtonTimeoutRef.current)
    }
  }, [])

  React.useEffect(() => {
    clearTimeout(showButtonTimeoutRef.current)

    if (!atBottom) {
      showButtonTimeoutRef.current = setTimeout(() => setShowButton(true), 500)
    } else {
      setShowButton(false)
    }
  }, [atBottom, setShowButton])

  return {
    setSeeEmojiPicker,
    seeEmojiPicker,
    parsedMessages,
    appendInterval,
    handleSubmit,
    setAtBottom,
    showButton,
    prevChatId,
    chatQuery,
    register,
    setValue,
    virtuoso,
    onSubmit,
    control,
    errors,
    watch,
    user,
  }
}
