import { Badge, Button, LoadingAnimation } from '@luma/ui'
import { TbMessage } from 'react-icons/tb'
import { useAuth } from '@contexts/AuthContext'
import { c, date } from '@hytzenshop/helpers'
import { Chat } from '@hytzenshop/types'

import React from 'react'

interface ChatListProps {
  chats?: Chat[]
  isLoading?: boolean
}

export const ChatList: React.FC<ChatListProps> = ({ chats, isLoading }) => {
  const { user } = useAuth()

  return (
    <div className={c('flex-1 lg:max-w-sm h-full')}>
      <div className="grid grid-cols-1 gap-4">
        {isLoading && (
          <div className="flex items-center justify-center h-[78vh]">
            <LoadingAnimation size={160} />
          </div>
        )}

        {!isLoading && chats?.length
          ? chats?.map((chat) => (
              <div
                key={chat.id}
                className="bg-dark-gray-500 px-6 py-4 rounded-md flex justify-between items-center space-y-2"
              >
                <div>
                  <p className="text-light-gray-100">
                    {chat.subject}{' '}
                    <span className="text-sm text-light-gray-500">
                      {date(
                        chat.updatedAt ||
                          chat.chat[chat.chat.length - 1]?.createdAt,
                        {
                          withHour: true,
                        }
                      )}
                    </span>
                  </p>

                  <p>{chat.description}</p>
                </div>

                <div>
                  <Badge
                    content={
                      chat && user
                        ? chat.chat.filter(
                            (c) => c.userId !== user?.id && c.read === false
                          ).length || undefined
                        : undefined
                    }
                    className="bg-danger-300"
                  >
                    <Button
                      href={`/dashboard/customer-service/chat/${chat.id}`}
                      variant="outlined"
                      rounded
                      className="p-3"
                    >
                      <TbMessage />
                    </Button>
                  </Badge>
                </div>
              </div>
            ))
          : !isLoading
          ? 'Nenhum chamado aberto'
          : null}
      </div>
    </div>
  )
}
