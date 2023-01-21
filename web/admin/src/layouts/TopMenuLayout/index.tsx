import * as React from 'react'

import { Badge, Button, Link, useTheme } from '@luma/ui'
import { TbBell, TbSun } from 'react-icons/tb'
import { useAuth } from '@contexts/AuthContext'
import { c } from '@hytzenshop/helpers'

import ProfilePopover from '@components/ProfilePopover'

type TopMenuLayout = {
  children: React.ReactNode
}

const TopMenuLayout: React.FC<TopMenuLayout> = ({ children }) => {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()

  const newNotifications = React.useMemo(
    () =>
      user?.notificationsViews
        .filter((n) => n.notification.application === 'adm')
        .filter((n) => !n.visualized).length || undefined,
    [user]
  )

  return (
    <>
      <div className="w-full flex items-center justify-center py-4 bg sticky top-0 h-20 z-40">
        <div className="flex flex-row flex-1 items-center justify-between max-w-screen-xl mx-8 sm:mx-24 xl:mx-auto">
          <Link href="/">
            <div className="flex flex-row items-center justify-center max-sm:ml-12">
              <p className="text-success-400 dark:text-success-300 font-semibold text-lg">
                Hytzen
              </p>
              <p className="text-primary font-semibold text-lg">Shop </p>
              <p className="text-sm ml-1 mt-1"> | ADM</p>
            </div>
          </Link>

          <div className="flex items-center justify-center sm:space-x-4">
            <span className="flex items-center">
              <Button
                className={c('p-3')}
                onClick={() =>
                  theme === 'dark' ? setTheme('light') : setTheme('dark')
                }
              >
                {theme === 'dark' ? (
                  <TbSun size={20} />
                ) : (
                  <TbSun size={20} className="text-warning-300" />
                )}
              </Button>

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
            </span>

            <div className="w-0.5 h-10 rounded-full bg-third bg-opacity-70 max-sm:hidden" />

            <ProfilePopover />
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg xl:max-w-screen-xl mx-8 sm:mx-24 xl:mx-auto">
        {children}
      </div>
    </>
  )
}

export default TopMenuLayout
