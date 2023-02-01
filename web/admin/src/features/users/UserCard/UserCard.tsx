import * as React from 'react'

import { TbBrandWhatsapp, TbMailForward } from 'react-icons/tb'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { c, getFirstName, numonly } from '@hytzenshop/helpers'
import { Button, Avatar, Tooltip } from '@luma/ui'
import { User, UserGetAllDto } from '@hytzenshop/types'
import { useBreakpoint } from '@hytzenshop/hooks'
import { RiAdminLine } from 'react-icons/ri'
import { api } from '@hytzenshop/services'

interface UserCardProps {
  user?: User
  renderInsideCard?: () => React.ReactNode
}

const UserCard: React.FC<UserCardProps> = ({ user, renderInsideCard }) => {
  const { sm } = useBreakpoint()

  const queryClient = useQueryClient()

  const link = React.useMemo(
    () =>
      `https://api.whatsapp.com/send?phone=${numonly(
        user?.profile?.phone
      )}&text=Ol%C3%A1%2C%20${getFirstName(user?.profile?.completeName)}!%20`,
    [user?.profile?.completeName, user?.profile?.phone]
  )

  const mail = React.useMemo(
    () =>
      `mailto:${user?.email}?Subject=${encodeURI(
        'Assunto da mensagem!'
      )}&body=${encodeURI('Conteúdo da mensagem muito legal!')}`,
    [user?.email]
  )

  const onSetUserAdmin = useMutation(
    (props: { id: string; isAdmin: boolean }) => {
      return api.patch(`/users/${props.id}`, { isAdmin: props.isAdmin })
    },
    {
      onMutate: async ({ id, isAdmin }) => {
        await queryClient.cancelQueries({ queryKey: ['users'] })

        const previousUsers = queryClient.getQueryData<UserGetAllDto>(['users'])

        queryClient.setQueryData(['users'], {
          ...previousUsers,
          data: {
            ...previousUsers?.data,
            users: previousUsers?.data.users.map((u) =>
              u.id === id ? { ...u, isAdmin } : u
            ),
          },
        })

        return {
          previousUsers,
          data: {
            ...previousUsers?.data,
            users: previousUsers?.data.users.map((u) =>
              u.id === id ? { ...u, isAdmin } : u
            ),
          },
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
      },

      onError: (_err, _newMe, context) => {
        queryClient.setQueryData(['users'], context?.previousUsers)
      },
    }
  ).mutateAsync

  return (
    <div className="bg-primary px-6 py-4 rounded-md flex-1 flex flex-col sm:flex-row sm:items-center justify-between max-sm:space-y-6">
      <div className="flex flex-row items-center space-x-2">
        <Avatar
          src={user?.profile?.avatar || ''}
          name={user?.profile?.completeName || user?.username || ''}
          imageClassName="w-[42px] h-[42px]"
          fallbackClassName="p-4"
        />

        <div>
          <p className="text-primary font-medium">
            {user?.profile?.completeName || user?.username}
          </p>
          <p className="text-sm">{user?.email}</p>
        </div>
      </div>

      {renderInsideCard && renderInsideCard()}

      <div className="flex space-x-2 justify-end items-center max-sm:mt-4">
        <Button
          href={link}
          target="_blank"
          variant={sm ? 'filled' : 'outlined'}
          rounded
          className="max-sm:w-full sm:p-3"
        >
          <span className="flex items-center justify-center space-x-2">
            <TbBrandWhatsapp size={16} className="sm:text-light-gray-100" />
            <p className="sm:hidden">Whatsapp</p>
          </span>
        </Button>
        <Button
          href={mail}
          target="_blank"
          variant="filled"
          rounded
          className="p-3 bg-secondary"
        >
          <TbMailForward size={16} className="text-light-gray-500" />
        </Button>
        <Tooltip content="Usuário administrador" className="shadow-lg">
          <Button
            rounded
            onClick={() =>
              onSetUserAdmin({
                id: user?.id || '',
                isAdmin: !user?.isAdmin,
              })
            }
            className={c(
              'p-3',
              user?.isAdmin
                ? 'bg-primary-300 text-light-gray-100'
                : 'border border-dark-gray-100 text-light-gray-100'
            )}
          >
            <RiAdminLine size={16} />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}

export default UserCard
