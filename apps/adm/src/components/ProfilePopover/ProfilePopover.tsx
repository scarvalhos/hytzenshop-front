import * as Popover from '@radix-ui/react-popover'

import { Avatar, withGlassEffect } from '@luma/ui'
import { TbLogout, TbUserCircle } from 'react-icons/tb'
import { useAuth } from '@contexts/AuthContext'

import Link from '@core/Link'

import React from 'react'

const ProfilePopover = () => {
  const { signOut, user } = useAuth()

  return (
    <Popover.Root>
      <Popover.Trigger>
        <span className="flex flex-row items-center justify-center space-x-2">
          <span className="flex flex-col items-end">
            <p className="text-light-gray-100 font-medium">
              {user?.profile?.completeName}
            </p>
            <p className="text-sm">@{user?.username}</p>
          </span>
          <Avatar
            src={user?.profile?.avatar}
            name={user?.profile?.completeName}
            imageClassName="w-12 h-12"
            fallbackClassName="p-4"
          />
        </span>
      </Popover.Trigger>

      <Popover.Anchor />

      <Popover.Portal className="relative">
        <Popover.Content className="absolute top-8 right-0 w-[210px] z-50">
          {withGlassEffect(
            <>
              <p className="text-sm">Conta</p>

              <Link
                href="/profile/dados-pessoais"
                className="flex flex-row py-1 text-light-gray-100"
              >
                <TbUserCircle size={20} style={{ marginRight: '10px' }} />
                Minhas informações
              </Link>

              <button
                className="flex flex-row py-1 text-light-gray-100"
                onClick={signOut}
              >
                <TbLogout
                  size={20}
                  style={{ marginRight: '10px', marginLeft: 2 }}
                />
                Sair
              </button>
            </>,
            {
              glassEffect: true,
              glassClassName:
                'px-4 py-3 rounded-md space-y-2 border border-light-gray-400 border-opacity-20 backdrop-blur-2xl',
            }
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default ProfilePopover
