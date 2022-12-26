import * as React from 'react'

import AccountMenu from '@core/AccountMenu'

type TopMenuLayout = {
  children: React.ReactNode
}

const TopMenuLayout: React.FC<TopMenuLayout> = ({ children }) => {
  return (
    <>
      <div className="w-full py-6 px-8 flex items-center justify-end bg-black sticky top-0 z-50">
        <AccountMenu />
      </div>

      <div className="max-w-screen-xl mx-8 sm:mx-24 xl:mx-auto">{children}</div>
    </>
  )
}

export default TopMenuLayout
