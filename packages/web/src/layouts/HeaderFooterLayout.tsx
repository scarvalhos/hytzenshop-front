import { useConfig } from '@contexts/ConfigContext'
import { useRouter } from 'next/router'
import { Link } from '@core'
import { c } from '@utils/helpers'

import Footer from '@components/Footer'
import Header from '@components/Header'
import React from 'react'

interface HeaderFooterLayoutProps {
  children: React.ReactNode
  onFilterChange?: (search: string) => void
  renderAfterLogo?: () => React.ReactNode
  renderInHeader?: () => React.ReactNode
}

const HeaderFooterLayout: React.FC<HeaderFooterLayoutProps> = ({
  children,
  onFilterChange,
  renderAfterLogo,
  renderInHeader,
}) => {
  return (
    <>
      <Header
        onFilterChange={onFilterChange}
        renderAfterLogo={renderAfterLogo}
        renderInHeader={renderInHeader}
      />

      {children}

      <Footer />
    </>
  )
}

export default HeaderFooterLayout

export const LinksCategories = () => {
  const { categories } = useConfig()
  const { asPath } = useRouter()

  return (
    <div className="flex flex-row ml-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.name}`}>
          <p
            className={c(
              'capitalize relative p-4 text-sm',
              asPath === `/category/${category.name}`
                ? "text-success-300 before:content-[''] before:rounded-t-sm before:w-[100%] before:h-[3px] before:bg-success-300 before:absolute before:bottom-0 before:left-0"
                : 'text-light-gray-300'
            )}
          >
            {category.name.replaceAll('-', ' ')}
          </p>
        </Link>
      ))}
    </div>
  )
}
