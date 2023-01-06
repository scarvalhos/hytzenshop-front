import React from 'react'

import { IoIosArrowForward } from 'react-icons/io'
import { useBreakpoint } from '@hytzenshop/hooks'
import { IconBaseProps } from 'react-icons'
import { Link } from '../Link'
import { c } from '@hytzenshop/helpers'

export interface BreadCrumbsProps {
  links: {
    title: string
    href: string
    icon: React.FC<IconBaseProps>
  }[]
  skipIndexes?: number[]
  dividerClassName?: string
  className?: string
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
  links,
  skipIndexes = [],
  dividerClassName,
  className,
}) => {
  const { sm } = useBreakpoint()

  if (!sm) {
    const Ic = links.length > 1 ? links[links.length - 2].icon : links[0].icon

    return (
      <div className={c('flex items-center', className)}>
        <Link
          href={links.length > 1 ? links[links.length - 2].href : links[0].href}
        >
          <span className="w-fit flex items-center justify-center space-x-1">
            <Ic size={18} />
            <p>
              {links.length > 1
                ? links[links.length - 2].title
                : links[0].title}
            </p>
          </span>
        </Link>
      </div>
    )
  }

  return (
    <div className={c('flex items-center', className)}>
      {links.map(({ href, icon: Icon, title }, index) => (
        <React.Fragment key={index}>
          {index > 0 && !skipIndexes.includes(index) && (
            <IoIosArrowForward className={c('mx-2', dividerClassName)} />
          )}
          {skipIndexes.includes(index) && <div className="mb-4" />}

          <Link href={href}>
            <span
              className={c(
                'w-fit flex items-center justify-center space-x-1',
                index + 1 === links.length && 'text-light-gray-100'
              )}
            >
              <Icon size={18} />
              <p>{title}</p>
            </span>
          </Link>
        </React.Fragment>
      ))}
    </div>
  )
}
