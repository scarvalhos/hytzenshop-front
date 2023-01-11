import * as Popover from '@radix-ui/react-popover'

import { Can, DivideLine, withGlassEffect, Link, Avatar } from '@luma/ui'
import { parseCookies } from 'nookies'
import { useAuth } from '@contexts/AuthContext'

import {
  TbDashboard,
  TbLogout,
  TbTruckDelivery,
  TbUserCircle,
} from 'react-icons/tb'

import React from 'react'

const ProfilePopover = () => {
  const { signOut, user, isAuthenticated } = useAuth()
  const { 'hytzenshop.token': token } = parseCookies()

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Avatar
          src={user?.profile?.avatar}
          name={user?.profile?.completeName || user?.username}
          imageClassName="w-8 h-8"
          fallbackClassName="p-2"
        />
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

              <DivideLine dividerClassName="my-2 border-light-gray-400 border-opacity-20" />

              <Link
                href="/profile/pedidos"
                className="flex flex-row py-1 text-light-gray-100"
              >
                <TbTruckDelivery size={20} style={{ marginRight: '10px' }} />
                Meus pedidos
              </Link>

              <Can isAdmin user={user} isAuthenticated={isAuthenticated}>
                <>
                  <DivideLine dividerClassName="my-2 border-light-gray-400 border-opacity-20" />

                  <Link
                    href={`${process.env.NEXT_PUBLIC_ADM_URL_FRONTEND}?token=${token}`}
                    className="flex flex-row py-1 text-light-gray-100"
                  >
                    <TbDashboard size={20} style={{ marginRight: '10px' }} />
                    Dashboard
                  </Link>
                </>
              </Can>

              <DivideLine dividerClassName="my-2 border-light-gray-400 border-opacity-20" />

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
