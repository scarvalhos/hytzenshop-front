import { Button, DivideLine, Icons, Input, Shared } from '@luma/ui'
import { TbArrowRight } from 'react-icons/tb'
import { useChat } from './Chat.hook'

import React from 'react'

export interface ChatProps {
  id?: string | null
}

const Chat: React.FC<ChatProps> = ({ id }) => {
  const {
    handleSubmit,
    chatQuery,
    messages,
    onSubmit,
    register,
    control,
    user,
  } = useChat({ id })

  return (
    <div className="bg-dark-gray-500 bg-opacity-30 rounded-md flex flex-col items-center justify-center flex-1 h-full px-6 py-8 max-lg:mt-8">
      {!chatQuery.data?.chat ? (
        <Icons.MailboxIcon className="h-40 w-fit" />
      ) : (
        <div className="bg-dark-gray-400 bg-opacity-30 w-full h-full rounded-sm flex flex-col items-center justify-between py-6 space-y-6">
          <div className="w-full h-full space-y-4 relative overflow-y-auto px-6">
            <Shared.ChatMessageCard
              message={chatQuery.data.chat.description}
              userId={user?.id}
              createdAt={chatQuery.data.chat.createdAt}
              messageUserId={chatQuery.data.chat.userId}
              name={
                chatQuery.data.chat.user.profile?.completeName ||
                chatQuery.data.chat.user.username
              }
            />

            <DivideLine dividerClassName="my-4" />

            {messages.map((message) => (
              <Shared.ChatMessageCard
                key={message.id}
                message={message.message}
                userId={user?.id}
                createdAt={message.createdAt}
                messageUserId={message.userId}
                name={
                  message.user.profile?.completeName || message.user.username
                }
              />
            ))}
          </div>

          <div className="w-full px-6">
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
