import Footer from '@components/Footer'
import Header from '@components/Header'
import React from 'react'

interface HeaderFooterLayoutProps {
  children: React.ReactNode
  renderAfterLogo?: () => React.ReactNode
  renderInHeader?: () => React.ReactNode
  glassEffect?: boolean
}

const HeaderFooterLayout: React.FC<HeaderFooterLayoutProps> = ({
  children,
  renderAfterLogo,
  renderInHeader,
  glassEffect = true,
}) => {
  return (
    <>
      <Header
        renderAfterLogo={renderAfterLogo}
        renderInHeader={renderInHeader}
        glassEffect={glassEffect}
      />

      {children}

      <Footer />
    </>
  )
}

export default HeaderFooterLayout
