import { Link } from '../Link'
import { c } from '../../utils/helpers'

import React from 'react'

// --------------------------------------------------------------------------------------------

export const Loader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={c('text-[inherit] h-5 w-5 animate-spin', className)}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
      />
    </svg>
  )
}

// --------------------------------------------------------------------------------------------

const RenderLink: React.FC<any> = React.forwardRef(
  ({ href, target, className, ...props }, ref) => {
    return (
      <Link
        as={href}
        href={href}
        className={className}
        legacyBehavior
        target={target}
      >
        <span ref={ref} {...props} />
      </Link>
    )
  }
)

// --------------------------------------------------------------------------------------------

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  href?: string
  loading?: boolean
  disabled?: boolean
  className?: string
  innerClassName?: string
  variant?: 'filled' | 'outlined' | 'outlined-danger' | 'disabled'
  rounded?: boolean
  target?: string

  onClick?: (evt: React.MouseEvent) => void
}

const Button = React.forwardRef<any, React.PropsWithChildren<ButtonProps>>(
  (
    {
      type = 'button',
      href,
      children,
      className,
      disabled,
      loading: _loading,
      innerClassName,
      onClick,
      target,
      variant,
      rounded,
    },
    ref
  ) => {
    const [fetching, setFetching] = React.useState(false)
    const loading = React.useMemo(
      () => _loading || fetching,
      [_loading, fetching]
    )

    const handleClick = React.useCallback(
      async (evt: React.MouseEvent) => {
        if (!onClick) return
        setFetching(true)
        try {
          await onClick(evt)
        } finally {
          setFetching(false)
        }
      },
      [onClick]
    )

    return React.createElement(
      href && !disabled ? RenderLink : 'button',
      {
        className: c(
          'button flex items-center justify-center cursor-pointer',
          variant === 'filled' && 'button--filled',
          variant === 'outlined' && 'button--outlined',
          variant === 'outlined-danger' && 'button--outlined-danger',
          disabled && 'button--disabled',
          rounded ? 'rounded-full' : 'rounded-[4px]',
          className
        ),
        ...(href && !disabled
          ? { ref, href, disabled, onClick: handleClick, target }
          : { type, disabled, onClick: handleClick }),
      },
      <>
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <span className={c(innerClassName)}>{children}</span>
        )}
      </>
    )
  }
)

export default Button
