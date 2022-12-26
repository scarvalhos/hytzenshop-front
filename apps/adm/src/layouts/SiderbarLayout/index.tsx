import * as React from 'react'

import { Siderbar } from '@core/Siderbar'

import TopMenuLayout from '@layouts/TopMenuLayout'

type SiderbarLayout = {
  children: React.ReactElement
}

const SiderbarLayout: React.FC<SiderbarLayout> = ({ children }) => {
  const [openSiderbar, setOpenSiderbar] = React.useState(true)

  const onDrawerOpen = React.useCallback(() => {
    setOpenSiderbar(true)
  }, [])

  const onDrawerClose = React.useCallback(() => {
    setOpenSiderbar(false)
  }, [])

  return (
    <>
      <Siderbar
        openSiderbar={openSiderbar}
        onDrawerOpen={onDrawerOpen}
        onDrawerClose={onDrawerClose}
      />

      <TopMenuLayout>{children}</TopMenuLayout>
    </>
  )
}

export default SiderbarLayout
