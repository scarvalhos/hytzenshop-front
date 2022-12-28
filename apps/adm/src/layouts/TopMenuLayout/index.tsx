import * as React from 'react'

import ProfilePopover from '@components/ProfilePopover'
import Link from '@core/Link'

type TopMenuLayout = {
  children: React.ReactNode
}

const TopMenuLayout: React.FC<TopMenuLayout> = ({ children }) => {
  return (
    <>
      <div className="w-full flex items-center justify-center py-4 bg-black sticky top-0 z-40">
        <div className="flex flex-row flex-1 items-center justify-between max-w-screen-xl mx-8 sm:mx-24 xl:mx-auto">
          <Link href="/">
            <div className="flex flex-row items-center justify-center max-sm:ml-12">
              <p className="text-success-300 font-medium text-base">Hytzen</p>
              <p className="text-light-gray-100 text-base">Shop </p>
              <p className="text-xs ml-1"> | ADM</p>
            </div>
          </Link>

          <div>
            <ProfilePopover />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-8 sm:mx-24 xl:mx-auto">{children}</div>
    </>
  )
}

export default TopMenuLayout
