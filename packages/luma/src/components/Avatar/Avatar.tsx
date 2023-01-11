import * as RadixAvatar from '@radix-ui/react-avatar'

import { c, getFirstLetters } from '@hytzenshop/helpers'

export interface AvatarProps {
  src?: string
  name?: string
  imageClassName?: string
  fallbackClassName?: string
}

export const Avatar: React.FC<AvatarProps> = ({
  fallbackClassName,
  imageClassName,
  name,
  src,
}) => {
  if (!src && !name)
    return (
      <div className="bg-dark-gray-300 border-[1.5px] border-success-300 animate-pulse rounded-full w-12 h-12" />
    )

  return (
    <RadixAvatar.Root>
      <RadixAvatar.Image
        src={src}
        alt={name}
        className={c(
          'w-8 h-8 rounded-full border-[1.5px] border-success-300 bg-dark-gray-400',
          imageClassName
        )}
      />

      {name ? (
        <RadixAvatar.AvatarFallback
          className={c(
            'text-light-gray-100 border border-success-300 rounded-full text-xs',
            fallbackClassName
          )}
        >
          {getFirstLetters(name)}
        </RadixAvatar.AvatarFallback>
      ) : null}
    </RadixAvatar.Root>
  )
}
