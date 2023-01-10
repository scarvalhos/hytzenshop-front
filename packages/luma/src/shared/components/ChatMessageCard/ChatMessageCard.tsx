import { TbClock, TbCheck, TbChecks } from 'react-icons/tb'
import { c, date } from '@hytzenshop/helpers'

import React from 'react'

interface ChatMessageCardProps {
  messageUserId?: string
  createdAt?: string
  message?: string
  userId?: string
  sended?: boolean
  read?: boolean
  name?: string
  id?: string
}

export const ChatMessageCard: React.FC<ChatMessageCardProps> = React.memo(
  ({ messageUserId, createdAt, message, userId, sended, name, read, id }) => {
    return (
      <div
        id={id}
        className={c(
          'flex py-2 px-6',
          userId === messageUserId ? 'justify-end' : 'justify-start'
        )}
      >
        <div
          className={c(
            'px-4 py-4 rounded-lg max-w-sm space-x-2 flex items-end',
            userId === messageUserId
              ? 'bg-dark-gray-100 bg-opacity-30'
              : 'bg-dark-gray-300 bg-opacity-40'
          )}
        >
          <span className="space-y-1">
            {userId !== messageUserId && (
              <p className="text-light-gray-100 font-medium">{name}</p>
            )}
            <p>{message}</p>
          </span>

          <span className="flex items-center space-x-1">
            <p className={c('text-xs')}>
              {date(createdAt, { onlyHour: true })}
            </p>

            {userId === messageUserId &&
              (!sended ? (
                <TbClock size={12} />
              ) : read ? (
                <TbChecks size={14} className="text-success-300" />
              ) : (
                <TbCheck size={14} />
              ))}
          </span>
        </div>
      </div>
    )
  }
)
