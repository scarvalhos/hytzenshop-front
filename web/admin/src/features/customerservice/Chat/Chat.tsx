import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'

import { Button, DivideLine, Icons, Input } from '@luma/ui'
import { date, c, defaultToastError } from '@hytzenshop/helpers'
import { ChatGetDto, ChatMessage } from '@hytzenshop/types'
import { FieldValues, useForm } from 'react-hook-form'
import { useDebounceCallback } from '@react-hook/debounce'
import { TbArrowRight } from 'react-icons/tb'
import { useAuth } from '@contexts/AuthContext'
import { socket } from '@services/socket'
import { api } from '@hytzenshop/services'

import React from 'react'

interface ChatProps {
  id?: string | null
}

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

const Chat: React.FC<ChatProps> = ({ id }) => {
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
    [chatQuery.data?.chat.chat]
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

  return (
    <div className="bg-dark-gray-500 bg-opacity-30 rounded-md flex-1 flex flex-col items-center justify-center h-full px-6 py-8">
      {!chatQuery.data?.chat ? (
        <Icons.MailboxIcon className="h-40 w-fit" />
      ) : (
        <div className="bg-dark-gray-400 bg-opacity-30 w-full h-full rounded-sm flex flex-col items-center justify-between px-6 py-6 space-y-6">
          <div className="w-full h-full flex flex-col justify-end gap-4 relative overflow-y-auto">
            <div
              className={c(
                'flex',
                user?.id === chatQuery.data.chat.userId
                  ? 'justify-end'
                  : 'justify-start'
              )}
            >
              <div
                className={c(
                  'px-4 py-4 rounded-lg max-w-sm space-y-2',
                  user?.id === chatQuery.data.chat.userId
                    ? 'bg-dark-gray-100 bg-opacity-30'
                    : 'bg-dark-gray-300 bg-opacity-40'
                )}
              >
                <p>{chatQuery.data?.chat.description}</p>

                <p
                  className={c(
                    'text-sm',
                    user?.id === chatQuery.data.chat.userId && 'text-right'
                  )}
                >
                  {date(chatQuery.data?.chat.createdAt, { withHour: true })}
                </p>
              </div>
            </div>

            <DivideLine dividerClassName="my-4" />

            {messages.map((message) => (
              <div
                key={message.id}
                className={c(
                  'flex',
                  user?.id === message.userId ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={c(
                    'px-4 py-4 rounded-lg max-w-sm space-y-2',
                    user?.id === message.userId
                      ? 'bg-dark-gray-100 bg-opacity-30'
                      : 'bg-dark-gray-300 bg-opacity-40'
                  )}
                >
                  {user?.id !== message.userId && (
                    <p className="text-light-gray-100 font-medium">
                      {message.user.profile?.completeName ||
                        message.user.username}
                    </p>
                  )}

                  <p>{message.message}</p>

                  <p
                    className={c(
                      'text-sm',
                      user?.id === message.userId && 'text-right'
                    )}
                  >
                    {date(message.createdAt, { withHour: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full">
            <Input.Textarea
              rows={1}
              placeholder="Mensagem"
              control={control}
              variant="filled"
              isFullWidth
              rounded
              className="scrollbar-none"
              {...register('message')}
              renderAfter={
                <Button
                  className="p-3"
                  variant="filled"
                  rounded
                  onClick={handleSubmit(onSubmit)}
                >
                  <TbArrowRight />
                </Button>
              }
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat
