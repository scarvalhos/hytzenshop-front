import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { ChatGetAllDto, PaginationParams } from '@hytzenshop/types'
import { useDebounceCallback } from '@react-hook/debounce'
import { useBreakpoint } from '@hytzenshop/hooks'
import { Pagination } from '@luma/ui'
import { ChatList } from '../ChatList'
import { socket } from '@services/socket'
import { api } from '@hytzenshop/services'
import { c } from '@hytzenshop/helpers'

import React from 'react'
import Chat from '../Chat/Chat'

const getMessages = async ({ limit, order, page, sort }: PaginationParams) => {
  return api
    .get<ChatGetAllDto>('/customerservice/chat', {
      params: {
        limit,
        order,
        page,
        sort,
      },
    })
    .then(({ data }) => data)
}

interface RequestsServicesListProps {
  children?: React.ReactNode
}

const RequestsServicesList: React.FC<RequestsServicesListProps> = ({
  children,
}) => {
  const [state, dispatch] = React.useState<PaginationParams>({
    page: 1,
    limit: 8,
    filter: '',
    sort: 'updatedAt',
    order: 'desc',
  })

  const queryClient = useQueryClient()

  const { lg } = useBreakpoint()

  const messagesQuery = useQuery(
    ['chats', state.page],
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

  const onUpdateMessage = useDebounceCallback(() => {
    queryClient.invalidateQueries(['chats', state.page])
  })

  React.useEffect(() => {
    socket.on('update-chat', () => {
      onUpdateMessage()
    })
  }, [onUpdateMessage])

  const withMobileValidation = () => {
    if (lg) {
      return (
        <>
          <ChatList
            chats={messagesQuery.data?.data.chats}
            isLoading={messagesQuery.isLoading}
          />
          {children ? children : <Chat />}
        </>
      )
    }

    return <ChatList chats={messagesQuery.data?.data.chats} />
  }

  return (
    <main className={c('flex flex-col w-full')}>
      <p className="text-light-gray-100 font-semibold text-2xl mt-14 mb-6">
        Chamados abertos
      </p>

      <div className="flex flex-row lg:space-x-4 w-full h-[78vh] max-h-[78vh]">
        {withMobileValidation()}
      </div>

      {!messagesQuery.isLoading && messagesQuery.data?.data.count ? (
        <Pagination
          currentPage={state.page}
          totalCountOfRegisters={messagesQuery.data?.data.count || 0}
          registersPerPage={state.limit}
          onPageChange={setPage}
        />
      ) : null}
    </main>
  )
}

export default RequestsServicesList
