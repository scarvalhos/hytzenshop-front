import { GlassContainer, Button, Link } from '@luma/ui'
import { TbFilter, TbSearch, TbX } from 'react-icons/tb'
import { useBreakpoint } from '@hytzenshop/hooks'
import { useRouter } from 'next/router'
import { c } from '@hytzenshop/helpers'

import BaseModal from '@components/Modal/BaseModal'
import React from 'react'

export interface TabsFiltersProps {
  tabs: {
    title: string
    link: string
    icon?: () => React.ReactNode
  }[]
  className?: string
  onFilterChange?: (search: string) => void
}

const TabsFilters: React.FC<TabsFiltersProps> = ({
  tabs,
  className,
  onFilterChange,
}) => {
  const { asPath } = useRouter()
  const { xl } = useBreakpoint()

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [showSearch, setShowSearch] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const categoryTitleByPath = React.useMemo(() => {
    const [_a, _b, categoryByPath] = asPath.split('/')

    return categoryByPath?.replace(/-/g, ' ')
  }, [asPath])

  return (
    <>
      <BaseModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <>
          {tabs.map((tab) => (
            <Button
              key={tab.title}
              href={tab.link}
              onClick={() => setIsModalOpen(false)}
              className={c(
                'p-0 justify-start',
                'capitalize relative py-3 px-2 text-sm whitespace-nowrap',
                asPath === tab.link
                  ? "text-success-300 before:content-[''] before:rounded-t-sm before:w-full before:h-[3px] before:bg-success-300 before:absolute before:bottom-0 before:left-0"
                  : 'text-light-gray-500'
              )}
            >
              {tab.icon && tab.icon()}
              {tab.title}
            </Button>
          ))}
        </>
      </BaseModal>

      <div
        className={c(
          'flex flex-row space-x-4 items-center max-md:justify-between sticky top-0 bg-black border-b border-light-gray-400 border-opacity-20 z-50 overflow-auto scrollbar-hide',
          className
        )}
      >
        {xl ? (
          <div className="flex flex-row flex-1 justify-between items-center max-w-screen-2xl mx-auto px-8 sm:px-16">
            <span className="flex flex-row">
              {tabs.map((tab) => (
                <Link key={tab.title} href={tab.link}>
                  <p
                    className={c(
                      'capitalize relative py-6 px-4 text-sm whitespace-nowrap',
                      asPath === tab.link
                        ? "text-success-300 before:content-[''] before:rounded-t-sm before:w-[100%] before:h-[3px] before:bg-success-300 before:absolute before:bottom-0 before:left-0"
                        : 'text-light-gray-500'
                    )}
                  >
                    {tab.icon && tab.icon()}
                    {tab.title}
                  </p>
                </Link>
              ))}
            </span>

            <div className="px-6 py-3 max-w-lg w-full rounded-md flex items-center bg-dark-gray-500 bg-opacity-30 focus-within:border-[1.5px] focus-within:border-success-300">
              <input
                className="bg-[transparent] w-full border-none outline-none text-light-gray-100 placeholder:text-light-gray-100"
                placeholder="Pesquisar"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  onFilterChange && onFilterChange(e.target.value)
                }}
              />

              <TbSearch className="text-light-gray-100 cursor-pointer" />
            </div>
          </div>
        ) : (
          <div className="flex flex-row flex-1 justify-between items-center px-8 sm:px-16">
            <p
              className={c(
                'capitalize relative py-4 px-4 text-sm whitespace-nowrap',
                "text-success-300 before:content-[''] before:rounded-t-sm before:w-[100%] before:h-[3px] before:bg-success-300 before:absolute before:bottom-0 before:left-0"
              )}
            >
              {asPath === '/' ||
              asPath === '/wishlist' ||
              asPath.startsWith('/product')
                ? 'Tudo'
                : categoryTitleByPath}
            </p>
            <div className="flex flex-row space-x-2">
              <button
                className="p-2 bg-dark-gray-400 rounded-full"
                onClick={() => setShowSearch(!showSearch)}
              >
                <TbSearch
                  size={18}
                  className="text-light-gray-100 cursor-pointer"
                />
              </button>
              <button
                className="p-2 bg-dark-gray-400 rounded-full"
                onClick={() => setIsModalOpen(true)}
              >
                <TbFilter size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {showSearch && (
        <GlassContainer className="px-8 pb-12 pt-8 fixed bottom-0 left-0 right-0 z-50 backdrop-blur-3xl rounded-sm flex items-center">
          <input
            className="bg-[transparent] w-full border-none outline-none text-light-gray-100 placeholder:text-light-gray-100"
            placeholder="Pesquisar"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              onFilterChange && onFilterChange(e.target.value)
            }}
          />

          <button onClick={() => setShowSearch(false)}>
            <TbX className="text-light-gray-100 cursor-pointer" />
          </button>
        </GlassContainer>
      )}
    </>
  )
}

export default TabsFilters
