import * as React from 'react'

import Link, { LinkProps } from 'next/link'

import { c } from '@hytzenshop/helpers'

export interface LinkHrefProps extends LinkProps {
  children: React.ReactNode
  className?: string
  target?: string
  download?: boolean
}

export const LinkHref: React.FC<LinkHrefProps> = ({
  children,
  href,
  className,
  target,
  download,
  ...props
}) => {
  return (
    <Link
      href={href}
      rel="nofollow"
      target={target}
      download={download}
      legacyBehavior
      {...props}
    >
      <a
        target={target}
        download={download}
        className={c(className, 'cursor-pointer')}
      >
        {children}
      </a>
    </Link>
  )
}
