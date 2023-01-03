import { ChatGetAllDto, PaginationParams } from '@hytzenshop/types'
import { Button, Icons, Pagination } from '@luma/ui'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { TbMessage } from 'react-icons/tb'
import { c, date } from '@hytzenshop/helpers'
import { api } from '@hytzenshop/services'

import React from 'react'

const getMessages = async ({ limit, order, page, sort }: PaginationParams) => {
  return api
    .get<ChatGetAllDto>('/customerservice/chat/user', {
      params: {
        limit,
        order,
        page,
        sort,
      },
    })
    .then(({ data }) => data)
}

const RequestsServicesList: React.FC = () => {
  const [state, dispatch] = React.useState<PaginationParams>({
    page: 1,
    limit: 8,
    filter: '',
    sort: 'updatedAt',
    order: 'desc',
  })

  const messagesQuery = useQuery(
    ['requests-services', state.page],
    () =>
      getMessages({
        filter: state.filter,
        limit: state.limit,
        page: state.page,
        order: state.order,
        sort: state.sort,
      }),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<ChatGetAllDto, unknown>

  const setPage = React.useCallback(
    (page: number) => {
      dispatch({
        ...state,
        page,
      })
    },
    [state]
  )

  return (
    <main className={c('flex flex-col w-full')}>
      <p className="text-light-gray-100 font-semibold text-2xl mt-14 mb-6">
        Chamados abertos
      </p>

      <div className="flex flex-row lg:space-x-4 w-full">
        <div className={c('flex-1 lg:max-w-sm')}>
          <div className="grid grid-cols-1 gap-4">
            {messagesQuery.data?.data.chats.map((chat) => (
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
                  <Button variant="outlined" rounded className="p-3">
                    <TbMessage />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-lg:hidden bg-dark-gray-500 bg-opacity-30 rounded-md flex-1 flex flex-col items-center justify-center min-h-[78vh]">
          <Icons.MailboxIcon className="h-40 w-fit" />
        </div>
      </div>

      {!messagesQuery.isLoading && (
        <Pagination
          currentPage={state.page}
          totalCountOfRegisters={messagesQuery.data?.data.count || 0}
          registersPerPage={state.limit}
          onPageChange={setPage}
        />
      )}
    </main>
  )
}

export default RequestsServicesList
