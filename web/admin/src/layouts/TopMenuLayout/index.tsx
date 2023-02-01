import * as React from 'react'

import { Badge, Button, Link } from '@luma/ui'
import { useAuth } from '@contexts/AuthContext'
import { TbBell } from 'react-icons/tb'

import ProfilePopover from '@components/ProfilePopover'
import { useBreakpoint } from '@hytzenshop/hooks'

type TopMenuLayout = {
  children: React.ReactNode
}

const TopMenuLayout: React.FC<TopMenuLayout> = ({ children }) => {
  const { user } = useAuth()
  const { sm } = useBreakpoint()

  const newNotifications = React.useMemo(
    () =>
      user?.notificationsViews
        .filter((n) => n.notification.application === 'adm')
        .filter((n) => !n.visualized).length || undefined,
    [user]
  )

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center py-4 bg sticky top-0 h-[8vh] z-40">
        <div className="flex flex-row flex-1 items-center justify-between max-w-screen-xl mx-8 sm:mx-24 xl:mx-auto">
          <Link href="/">
            <div className="flex flex-row items-center justify-center space-x-1 max-sm:ml-10">
              <span className="flex">
                <p className="text-success-400 dark:text-success-300 text-2xl font-bebas">
                  {sm ? 'Hytzen' : 'H'}
                </p>
                <p className="text-primary text-2xl font-bebas">
                  {sm ? 'Shop' : 'S'}
                </p>
              </span>

              <p className="text-sm font-bebas"> | ADM</p>
            </div>
          </Link>

          <div className="flex items-center justify-center sm:space-x-4">
            <Button
              href="/dashboard/notifications"
              variant="filled"
              rounded
              className="p-3 bg-[transparent] dark:bg-black text-secondary"
            >
              <Badge
                content={
                  (newNotifications || 0) <= 99 ? newNotifications : '+99'
                }
                className="bg-danger-300 w-5 h-5 -top-0.5 -right-3"
              >
                <TbBell size={20} />
              </Badge>
            </Button>

            <div className="w-0.5 h-10 rounded-full bg-third bg-opacity-70 max-sm:hidden" />

            <ProfilePopover />
          </div>
        </div>
      </div>

      <div className="h-[92vh] overflow-auto">
        <div className="max-w-screen-lg xl:max-w-screen-xl mx-8 sm:mx-24 xl:mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default TopMenuLayout
