import { TbMessage } from 'react-icons/tb'
import { c, date } from '@hytzenshop/helpers'
import { Button } from '@luma/ui'
import { Chat } from '@hytzenshop/types'

import React from 'react'

interface ChatListProps {
  chats?: Chat[]
}

export const ChatList: React.FC<ChatListProps> = ({ chats }) => {
  return (
    <div className={c('flex-1 lg:max-w-sm h-full')}>
      <div className="grid grid-cols-1 gap-4">
        {chats?.map((chat) => (
          <div
            key={chat.id}
            className="bg-dark-gray-500 px-6 py-4 rounded-md flex justify-between items-center space-y-2"
          >
            <div>
              <p className="text-light-gray-100">
                {chat.subject}{' '}
                <span className="text-sm text-light-gray-500">
                  {date(chat.createdAt, { withHour: true })}
                </span>
              </p>

              <p>{chat.description}</p>
            </div>

            <div>
              <Button
                href={`/customer-service/chat/${chat.id}`}
                variant="outlined"
                rounded
                className="p-3"
              >
                <TbMessage />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
