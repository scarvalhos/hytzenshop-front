import { c, date } from '@hytzenshop/helpers'

import React from 'react'

interface ChatMessageCardProps {
  userId?: string
  messageUserId: string
  name: string
  message: string
  createdAt: string
}

export const ChatMessageCard: React.FC<ChatMessageCardProps> = ({
  message,
  createdAt,
  messageUserId,
  name,
  userId,
}) => {
  return (
    <div
      className={c(
        'flex',
        userId === messageUserId ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={c(
          'px-4 py-4 rounded-lg max-w-sm space-y-2',
          userId === messageUserId
            ? 'bg-dark-gray-100 bg-opacity-30'
            : 'bg-dark-gray-300 bg-opacity-40'
        )}
      >
        {userId !== messageUserId && (
          <p className="text-light-gray-100 font-medium">{name}</p>
        )}

        <p>{message}</p>

        <p className={c('text-sm', userId === messageUserId && 'text-right')}>
          {date(createdAt, { withHour: true })}
        </p>
      </div>
    </div>
  )
}
