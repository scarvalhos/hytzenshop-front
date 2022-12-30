import * as React from 'react'

import Link, { LinkProps } from 'next/link'

import { c } from '@hytzenshop/helpers'

export interface LinkHrefProps extends LinkProps {
  children: React.ReactNode
  className?: string
  target?: string
}

export const LinkHref: React.FC<LinkHrefProps> = ({
  children,
  href,
  className,
  target,
  ...props
}) => {
  return (
    <Link href={href} rel="nofollow" target={target} legacyBehavior {...props}>
      <a target={target} className={c(className, 'cursor-pointer')}>
        {children}
      </a>
    </Link>
  )
}
