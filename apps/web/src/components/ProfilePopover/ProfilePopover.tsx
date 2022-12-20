import * as Popover from '@radix-ui/react-popover'
import * as Avatar from '@radix-ui/react-avatar'

import { DivideY, withGlassEffect } from '@luma/ui'
import { getFirstLetters } from '@hytzenshop/helpers'
import { useBreakpoint } from '@hytzenshop/hooks'
import { Can, Link } from '@core'
import { useAuth } from '@contexts/AuthContext'

import {
  TbDashboard,
  TbLogout,
  TbTruckDelivery,
  TbUserCircle,
} from 'react-icons/tb'

import React from 'react'

const ProfilePopover = () => {
  const { signOut, user } = useAuth()
  const { sm } = useBreakpoint()

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Avatar.Root>
          <Avatar.Image
            src={user?.profile?.avatar}
            alt={user?.profile?.completeName}
            className="w-8 h-8 rounded-full border-[1.5px] border-success-300 bg-dark-gray-400"
          />

          <Avatar.AvatarFallback className="text-light-gray-100 border border-success-300 rounded-full text-xs p-1">
            {getFirstLetters(user?.username || '')}
          </Avatar.AvatarFallback>
        </Avatar.Root>
      </Popover.Trigger>

      <Popover.Anchor />

      <Popover.Portal className="relative">
        <Popover.Content className="absolute top-8 right-0 w-[210px] z-50">
          {withGlassEffect(
            <>
              <p className="text-sm">Conta</p>

              <DivideY dividerClassName="my-2 border-light-gray-400 border-opacity-20">
                {sm && (
                  <Link href="/profile" className="flex flex-row py-1">
                    <TbUserCircle size={20} style={{ marginRight: '10px' }} />
                    Minhas informações
                  </Link>
                )}

                {!sm && (
                  <Link
                    href="/profile/dados-pessoais"
                    className="flex flex-row py-1 text-light-gray-100"
                  >
                    <TbUserCircle size={20} style={{ marginRight: '10px' }} />
                    Dados pessoais
                  </Link>
                )}

                {!sm && (
                  <Link
                    href="/profile/pedidos"
                    className="flex flex-row py-1 text-light-gray-100"
                  >
                    <TbTruckDelivery
                      size={20}
                      style={{ marginRight: '10px' }}
                    />
                    Meus pedidos
                  </Link>
                )}

                {!sm && (
                  <Can isAdmin={user?.isAdmin}>
                    <Link
                      href="http://localhost:3001/"
                      className="flex flex-row py-1 text-light-gray-100"
                    >
                      <TbDashboard size={20} style={{ marginRight: '10px' }} />
                      Dashboard
                    </Link>
                  </Can>
                )}

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
              </DivideY>
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
