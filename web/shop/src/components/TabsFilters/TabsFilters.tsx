import { TbFilter, TbSearch } from 'react-icons/tb'
import { useBreakpoint } from '@hytzenshop/hooks'
import { Button, Link } from '@luma/ui'
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

interface StateProps {
  isModalOpen?: boolean
  showSearch?: boolean
  search?: string
}

const TabsFilters: React.FC<TabsFiltersProps> = ({
  tabs,
  className,
  onFilterChange,
}) => {
  const { asPath } = useRouter()
  const { xl, md } = useBreakpoint()

  const [{ isModalOpen, search, showSearch }, dispatch] = React.useReducer(
    (prev: StateProps, next: StateProps) => {
      return { ...prev, ...next }
    },
    {
      isModalOpen: false,
      showSearch: false,
      search: '',
    }
  )

  const categoryTitleByPath = React.useMemo(() => {
    const [_a, _b, categoryByPath] = asPath.split('/')

    return categoryByPath?.replace(/-/g, ' ')
  }, [asPath])

  React.useEffect(() => {
    if (xl) dispatch({ showSearch: false })
  }, [xl])

  return (
    <>
      <BaseModal
        open={Boolean(isModalOpen)}
        onClose={() => dispatch({ isModalOpen: false })}
      >
        <>
          {tabs.map((tab) => (
            <Button
              key={tab.title}
              href={tab.link}
              onClick={() => dispatch({ isModalOpen: false })}
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
          'flex flex-row space-x-4 items-center max-md:justify-between shadow-md bg-black z-50 overflow-auto scrollbar-hide',
          className
        )}
      >
        <div className="flex flex-row flex-1 justify-between items-center max-w-screen-2xl mx-auto px-8 sm:px-16">
          {xl ? (
            <span className="flex flex-row">
              {tabs.map((tab) => (
                <Link key={tab.title} href={tab.link}>
                  <p
                    className={c(
                      'capitalize relative py-7 px-4 text-sm whitespace-nowrap',
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
          ) : (
            <p
              className={c(
                'capitalize relative py-7 px-4 text-sm whitespace-nowrap',
                "text-success-300 before:content-[''] before:rounded-t-sm before:w-[100%] before:h-[3px] before:bg-success-300 before:absolute before:bottom-0 before:left-0"
              )}
            >
              {asPath === '/' ||
              asPath === '/wishlist' ||
              asPath.startsWith('/product')
                ? 'Tudo'
                : categoryTitleByPath}
            </p>
          )}

          <div className="flex flex-row space-x-2 justify-end flex-1">
            {md ? (
              <div className="px-6 py-3 max-w-lg w-full rounded-md flex items-center bg-primary focus-within:border-[1.5px] focus-within:border-success-300">
                <input
                  className="bg-[transparent] w-full border-none outline-none text-primary placeholder:text-secondary"
                  placeholder="Pesquisar"
                  value={search}
                  onChange={(e) => {
                    dispatch({ search: e.target.value })
                    onFilterChange && onFilterChange(e.target.value)
                  }}
                />

                <TbSearch className="text-light-gray-100 cursor-pointer" />
              </div>
            ) : (
              <button
                className="p-2 bg-dark-gray-500 rounded-full"
                onClick={() => dispatch({ showSearch: !showSearch })}
              >
                <TbSearch
                  size={18}
                  className="text-light-gray-100 cursor-pointer"
                />
              </button>
            )}

            {!xl && (
              <button
                className="p-2 bg-dark-gray-500 rounded-full"
                onClick={() => dispatch({ isModalOpen: true })}
              >
                <TbFilter size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="max-sm:px-8 px-16 pt-6 sticky top-0 left-0 right-0 flex items-center">
          <div className="px-6 py-3 w-full rounded-md flex items-center bg-secondary bg-opacity-10 focus-within:border-[1.5px] focus-within:border-success-300">
            <input
              className="bg-[transparent] w-full border-none outline-none text-primary placeholder:text-secondary"
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => {
                dispatch({ search: e.target.value })
                onFilterChange && onFilterChange(e.target.value)
              }}
            />

            <TbSearch className="text-light-gray-100 cursor-pointer" />
          </div>
        </div>
      )}
    </>
  )
}

export default TabsFilters
