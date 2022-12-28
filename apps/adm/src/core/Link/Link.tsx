import * as React from 'react'

import Link, { LinkProps } from 'next/link'

import { c } from '@hytzenshop/helpers'

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
  target?: string
  download?: boolean
}

const LinkHref: React.FC<CustomLinkProps> = ({
  children,
  href,
  className,
  target,
  download,
  ...props
}) => {
  return (
    <Link href={href} rel="nofollow" target={target} legacyBehavior {...props}>
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

export default LinkHref
