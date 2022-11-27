import { useBreakpoint } from '@hooks/useBreakpoint'
import { useRouter } from 'next/router'
import { TbFilter } from 'react-icons/tb'
import { Link } from '@core'
import { c } from '@utils/helpers'

import BaseModal from '@components/Modal/BaseModal'
import Button from '@components/Button'
import React from 'react'

export interface TabsFiltersProps {
  tabs: {
    title: string
    link: string
    icon?: () => React.ReactNode
  }[]
  className?: string
}

const TabsFilters: React.FC<TabsFiltersProps> = ({ tabs, className }) => {
  const { asPath } = useRouter()
  const { md } = useBreakpoint()

  const [isModalOpen, setIsModalOpen] = React.useState(false)

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
          'flex flex-row space-x-4 items-center max-md:justify-between bg-dark-gray-500 sticky top-12 z-[99999] overflow-auto scrollbar-hide',
          className
        )}
      >
        {md ? (
          tabs.map((tab) => (
            <Link key={tab.title} href={tab.link}>
              <p
                className={c(
                  'capitalize relative py-4 px-4 text-sm whitespace-nowrap',
                  asPath === tab.link
                    ? "text-success-300 before:content-[''] before:rounded-t-sm before:w-[100%] before:h-[3px] before:bg-success-300 before:absolute before:bottom-0 before:left-0"
                    : 'text-light-gray-500'
                )}
              >
                {tab.icon && tab.icon()}
                {tab.title}
              </p>
            </Link>
          ))
        ) : (
          <p
            className={c(
              'capitalize relative py-3 px-4 text-sm whitespace-nowrap',
              "text-success-300 before:content-[''] before:rounded-t-sm before:w-[100%] before:h-[3px] before:bg-success-300 before:absolute before:bottom-0 before:left-0"
            )}
          >
            {asPath === '/' || asPath === '/wishlist'
              ? 'Tudo'
              : asPath.split('/')[2].replaceAll('-', ' ')}
          </p>
        )}

        <button
          className="md:hidden p-1 bg-dark-gray-400 rounded-full"
          onClick={() => setIsModalOpen(true)}
        >
          <TbFilter />
        </button>
      </div>
    </>
  )
}

export default TabsFilters
