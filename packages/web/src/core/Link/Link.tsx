import * as React from 'react'

import Link, { LinkProps } from 'next/link'

import { c } from '@utils/helpers'

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
}

const LinkHref: React.FC<CustomLinkProps> = ({
  children,
  href,
  className,
  ...props
}) => {
  return (
    <Link href={href} passHref rel="nofollow" legacyBehavior {...props}>
      <span className={c(className, 'cursor-pointer')}>{children}</span>
    </Link>
  )
}

export default LinkHref
