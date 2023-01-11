import * as Popover from '@radix-ui/react-popover'

import { Avatar, withGlassEffect, Link } from '@luma/ui'
import { TbLogout, TbUserCircle } from 'react-icons/tb'
import { useAuth } from '@contexts/AuthContext'

import React from 'react'

const ProfilePopover = () => {
  const { signOut, user } = useAuth()

  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      <span className="flex flex-col items-end max-sm:hidden">
        {user?.username ? (
          <p className="text-light-gray-100 font-medium">
            {user?.profile?.completeName}
          </p>
        ) : (
          <p className="bg-dark-gray-300 animate-pulse w-32 h-3 rounded-sm" />
        )}

        {user?.username ? (
          <p className="text-sm">{user?.username}</p>
        ) : (
          <p className="bg-dark-gray-300 animate-pulse w-20 h-3 rounded-sm mt-1" />
        )}
      </span>

      <Popover.Root>
        <Popover.Trigger>
          <Avatar
            src={user?.profile?.avatar}
            name={user?.profile?.completeName || user?.username}
            imageClassName="w-10 h-10"
            fallbackClassName="p-4"
          />
        </Popover.Trigger>

        <Popover.Anchor />

        <Popover.Portal className="relative">
          <Popover.Content className="absolute top-10 right-0 w-[210px] z-50">
            {withGlassEffect(
              <>
                <p className="text-sm">Conta</p>

                <Link
                  href={`${process.env.NEXT_PUBLIC_SHOP_URL_FRONTEND}/profile/dados-pessoais`}
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
    </div>
  )
}

export default ProfilePopover
