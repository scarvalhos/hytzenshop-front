import * as React from 'react'

import { Badge, Button, Link } from '@luma/ui'
import { useAuth } from '@contexts/AuthContext'
import { TbBell } from 'react-icons/tb'

import ProfilePopover from '@components/ProfilePopover'

type TopMenuLayout = {
  children: React.ReactNode
}

const TopMenuLayout: React.FC<TopMenuLayout> = ({ children }) => {
  const { user } = useAuth()

  const newNotifications = React.useMemo(
    () =>
      user?.notificationsViews
        .filter((n) => n.notification.application === 'adm')
        .filter((n) => !n.visualized).length || undefined,
    [user]
  )

  return (
    <>
      <div className="w-full flex items-center justify-center py-4 bg-black sticky top-0 h-20 z-40">
        <div className="flex flex-row flex-1 items-center justify-between max-w-screen-xl mx-8 sm:mx-24 xl:mx-auto">
          <Link href="/">
            <div className="flex flex-row items-center justify-center max-sm:ml-12">
              <p className="text-success-300 font-medium text-base">Hytzen</p>
              <p className="text-light-gray-100 text-base">Shop </p>
              <p className="text-xs ml-1"> | ADM</p>
            </div>
          </Link>

          <div className="flex items-center justify-center space-x-4">
            <Button
              href="/dashboard/notifications"
              variant="filled"
              rounded
              className="p-3 bg-black"
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

            <div className="w-0.5 h-10 rounded-full bg-dark-gray-200" />

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
