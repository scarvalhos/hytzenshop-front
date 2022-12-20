import Footer from '@components/Footer'
import Header from '@components/Header'
import React from 'react'

interface HeaderFooterLayoutProps {
  children: React.ReactNode
  renderAfterLogo?: () => React.ReactNode
  renderInHeader?: () => React.ReactNode
}

const HeaderFooterLayout: React.FC<HeaderFooterLayoutProps> = ({
  children,
  renderAfterLogo,
  renderInHeader,
}) => {
  return (
    <>
      <Header
        renderAfterLogo={renderAfterLogo}
        renderInHeader={renderInHeader}
      />

      {children}

      <Footer />
    </>
  )
}

export default HeaderFooterLayout
