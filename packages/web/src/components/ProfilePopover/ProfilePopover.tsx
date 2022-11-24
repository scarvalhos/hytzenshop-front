import * as Popover from '@radix-ui/react-popover'
import * as Avatar from '@radix-ui/react-avatar'

import { useBreakpoint } from '@hooks/useBreakpoint'
import { Can, Link } from '@core'
import { useAuth } from '@contexts/AuthContext'

import {
  TbDashboard,
  TbLogout,
  TbTruckDelivery,
  TbUserCircle,
} from 'react-icons/tb'

import Divide from 'core/Divide'
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
        </Avatar.Root>
      </Popover.Trigger>

      <Popover.Anchor />

      <Popover.Portal className="relative">
        <Popover.Content className="absolute top-8 right-0 w-[210px] z-[9999999]">
          <div className="bg-dark-gray-400 px-4 py-3 rounded-md space-y-2">
            <p className="text-sm">Conta</p>

            <Divide dividerClassName="my-2">
              {sm && (
                <Link href="/profile" className="flex flex-row py-1">
                  <TbUserCircle size={20} style={{ marginRight: '10px' }} />
                  Minhas informações
                </Link>
              )}

              {!sm && (
                <Link
                  href="/profile/dados-pessoais"
                  className="flex flex-row py-1"
                >
                  <TbUserCircle size={20} style={{ marginRight: '10px' }} />
                  Dados pessoais
                </Link>
              )}

              {!sm && (
                <Link href="/profile/pedidos" className="flex flex-row py-1">
                  <TbTruckDelivery size={20} style={{ marginRight: '10px' }} />
                  Meus pedidos
                </Link>
              )}

              {!sm && (
                <Can isAdmin={user?.isAdmin}>
                  <Link
                    href="http://localhost:3001/"
                    className="flex flex-row py-1"
                  >
                    <TbDashboard size={20} style={{ marginRight: '10px' }} />
                    Dashboard
                  </Link>
                </Can>
              )}

              <button className="flex flex-row py-1" onClick={signOut}>
                <TbLogout
                  size={20}
                  style={{ marginRight: '10px', marginLeft: 2 }}
                />
                Sair
              </button>
            </Divide>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default ProfilePopover
