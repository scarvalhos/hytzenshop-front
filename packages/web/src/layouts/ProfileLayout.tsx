import { TbDashboard, TbTruckDelivery, TbUserCircle } from 'react-icons/tb'
import { useBreakpoint } from '@hooks/useBreakpoint'
import { useRouter } from 'next/router'
import { Link, Can } from '@core'
import { useAuth } from '@contexts/AuthContext'
import { c } from '@utils/helpers'

import Header from '@components/Header'
import React from 'react'

interface ProfileLayoutProps {
  children?: React.ReactNode
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  const { pathname } = useRouter()
  const { sm, md } = useBreakpoint()
  const { user } = useAuth()

  return (
    <>
      <Header
        {...(sm && {
          renderInHeader: () => (
            <div className="flex flex-row ml-4">
              <Link href="/profile/dados-pessoais">
                <p
                  className={c(
                    'capitalize relative p-4 text-sm flex flex-row items-center justify-center',
                    pathname === '/profile/dados-pessoais'
                      ? "text-success-300 before:content-[''] before:rounded-t-sm before:w-[100%] before:h-[3px] before:bg-success-300 before:absolute before:bottom-0 before:left-0"
                      : 'text-light-gray-300'
                  )}
                >
                  <TbUserCircle size={18} style={{ marginRight: 6 }} />
                  {md && 'Dados pessoais'}
                </p>
              </Link>
              <Link href="/profile/pedidos">
                <p
                  className={c(
                    'capitalize relative p-4 text-sm flex flex-row items-center justify-center',
                    pathname.startsWith('/profile/pedidos')
                      ? "text-success-300 before:content-[''] before:rounded-t-sm before:w-[100%] before:h-[3px] before:bg-success-300 before:absolute before:bottom-0 before:left-0"
                      : 'text-light-gray-300'
                  )}
                >
                  <TbTruckDelivery size={18} style={{ marginRight: 6 }} />
                  {md && 'Meus pedidos'}
                </p>
              </Link>

              <Can isAdmin={user?.isAdmin}>
                <Link href="http://localhost:3001/">
                  <p
                    className={c(
                      'capitalize relative p-4 text-sm flex flex-row items-center justify-center'
                    )}
                  >
                    <TbDashboard size={18} style={{ marginRight: 6 }} />
                    {md && 'Dashboard'}
                  </p>
                </Link>
              </Can>
            </div>
          ),
        })}
      />

      {children}
    </>
  )
}

export default ProfileLayout
