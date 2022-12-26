import * as React from 'react'

import { getFirstLetters, getFirstName, numonly } from '@hytzenshop/helpers'
import { TbBrandWhatsapp, TbEye, TbMailForward } from 'react-icons/tb'
import { Avatar, useTheme } from '@mui/material'
import { Button } from '@luma/ui'
import { User } from '@hytzenshop/types'

interface UserCardProps {
  user?: User
  renderInsideCard?: () => React.ReactNode
}

const UserCard: React.FC<UserCardProps> = ({ user, renderInsideCard }) => {
  const theme = useTheme()

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

  return (
    <div className="bg-dark-gray-500 px-6 py-4 rounded-md flex-1 flex flex-col md:flex-row md:items-center justify-between max-md:space-y-2">
      <div className="flex flex-row items-center space-x-2">
        <Avatar
          src={user?.profile?.avatar || ''}
          sx={{
            width: 42,
            height: 42,
            border: user?.profile?.avatar
              ? `1.5px solid ${theme.palette.success.main}`
              : '',
            background: theme.palette.primary.dark,
            ...(!user?.profile?.avatar && {
              filter: 'brightness(1.5)',
            }),
          }}
        >
          {!user?.profile?.avatar ? (
            <p className="text-sm text-light-gray-500">
              {getFirstLetters(user?.username || '')}
            </p>
          ) : null}
        </Avatar>

        <div>
          <p className="text-light-gray-100 font-medium">
            {user?.profile?.completeName}
          </p>
          <p className="text-sm">{user?.email}</p>
        </div>
      </div>

      {renderInsideCard && renderInsideCard()}

      <div className="flex space-x-2 justify-end items-center">
        <Button
          href={link}
          target="_blank"
          variant="filled"
          rounded
          className="max-md:w-full md:p-3"
        >
          <span className="flex items-center justify-center space-x-2">
            <TbBrandWhatsapp size={16} color={theme.palette.primary.light} />
            <p className="md:hidden">Whatsapp</p>
          </span>
        </Button>
        <Button
          href={mail}
          target="_blank"
          variant="filled"
          rounded
          className="p-3 bg-light-gray-100"
        >
          <TbMailForward size={16} color={theme.palette.primary.contrastText} />
        </Button>
        <Button variant="filled" rounded className="p-3 bg-dark-gray-300">
          <TbEye size={16} color={theme.palette.success.main} />
        </Button>
      </div>
    </div>
  )
}

export default UserCard
