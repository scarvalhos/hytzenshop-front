/**
 * This function concatenates classnames
 */

import { GlassContainer } from '../'

export const dedupTailwind = (str: string) => {
  const nonCollidable = ['border-', 'rounded-']
  const speciallyCollidable: Record<string, string[]> = {
    'px-': ['p-'],
    'py-': ['p-'],
    'p-': ['py-', 'px-'],
    flex: ['block'],
    block: ['flex'],
  }

  return str
    .split(/\s+/)
    .filter((v, i, arr) => {
      const makePrefix = (str: string) => {
        const split = str.split('-')
        return split.length > 1 ? `${split.slice(0, -1).join('-')}-` : split[0]
      }
      const prefix = makePrefix(v)
      return (
        nonCollidable.includes(prefix) ||
        !arr
          .slice(i)
          .find(
            (vv) =>
              [prefix, ...(speciallyCollidable[prefix] || [])].includes(
                makePrefix(vv)
              ) && vv !== v
          )
      )
    })
    .join(' ')
}

export const c = (...arr: (string | undefined | null | false)[]) => {
  const classes = dedupTailwind(
    arr
      // eslint-disable-next-line no-extra-boolean-cast
      .flatMap((s) => (!!s ? s.split(/\s+/) : []))
      .filter((s) => !!s && s !== 'undefined')
      .join(' ')
  )

  return classes.length < 1 ? undefined : classes
}

// withGlassEffect --------------------------------------------------------------------------------------------------

export const withGlassEffect = (
  children: React.ReactNode,
  options?: {
    glassEffect?: boolean
    glassClassName?: string
    divClassName?: string
  }
) => {
  if (options?.glassEffect) {
    return (
      <GlassContainer className={c(options?.glassClassName)}>
        {children}
      </GlassContainer>
    )
  }

  return <div className={c(options?.divClassName)}>{children}</div>
}
