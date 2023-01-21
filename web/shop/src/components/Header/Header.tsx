import {
  TbShoppingCart,
  TbUserCircle,
  TbMoonStars,
  TbHeart,
  TbBell,
  TbSun,
} from 'react-icons/tb'

import { Badge, Button, withGlassEffect, Link, useTheme } from '@luma/ui'
import { useWishlist } from '@contexts/WishlistContext'
import { useAuth } from '@contexts/AuthContext'
import { useCart } from '@contexts/CartContext'
import { c } from '@hytzenshop/helpers'

import ProfilePopover from '@components/ProfilePopover'
import React from 'react'

interface HeaderProps {
  renderInHeader?: () => React.ReactNode
  renderAfterLogo?: () => React.ReactNode
  glassEffect?: boolean
}

const Header: React.FC<HeaderProps> = ({
  renderInHeader,
  renderAfterLogo,
  glassEffect,
}) => {
  const { theme, setTheme } = useTheme()
  const { totalQuantity } = useCart()
  const { wishlist } = useWishlist()
  const { user } = useAuth()

  const newNotifications = React.useMemo(
    () =>
      user?.notificationsViews
        .filter((n) => n.notification.application === 'shop')
        .filter((n) => !n.visualized).length || undefined,
    [user]
  )

  return (
    <>
      {withGlassEffect(
        <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-16 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <Link href="/">
              <p
                className={c(
                  'py-4 text-xl',
                  glassEffect ? 'text-light-gray-100' : 'text-primary'
                )}
              >
                <strong className="text-success-300">Hytzen</strong>
                Shop
              </p>
            </Link>
            {renderAfterLogo && renderAfterLogo()}
          </div>

          {renderInHeader && renderInHeader()}

          <div className="flex flex-row items-center space-x-2">
            <div className="flex flex-row items-center space-x-1">
              <Button
                className={c(
                  'p-1',
                  glassEffect ? 'text-light-gray-100' : 'text-primary'
                )}
                onClick={() =>
                  theme === 'dark' ? setTheme('light') : setTheme('dark')
                }
              >
                {theme === 'dark' ? (
                  <TbSun size={20} />
                ) : (
                  <TbMoonStars size={20} />
                )}
              </Button>

              <Button href="/wishlist" rounded className="p-1">
                <Badge
                  className="bg-danger-300"
                  content={
                    wishlist && wishlist?.length > 0
                      ? wishlist?.length
                      : undefined
                  }
                >
                  <TbHeart
                    className={c(
                      glassEffect ? 'text-light-gray-100' : 'text-primary'
                    )}
                    fontSize={20}
                  />
                </Badge>
              </Button>

              <Button href="/checkout/cart" rounded className="p-1">
                <Badge
                  content={totalQuantity || undefined}
                  className="bg-success-400"
                >
                  <TbShoppingCart
                    className={c(
                      glassEffect ? 'text-light-gray-100' : 'text-primary'
                    )}
                    fontSize={20}
                  />
                </Badge>
              </Button>

              {user && (
                <Button href="/profile/notifications" rounded className="p-1">
                  <Badge
                    className="bg-danger-300"
                    content={
                      (newNotifications || 0) <= 99 ? newNotifications : '+99'
                    }
                  >
                    <TbBell
                      className={c(
                        glassEffect ? 'text-light-gray-100' : 'text-primary'
                      )}
                      size={20}
                    />
                  </Badge>
                </Button>
              )}
            </div>

            {user?.username ? (
              <ProfilePopover />
            ) : (
              <Link href="/auth" passHref>
                <TbUserCircle
                  className={c(
                    glassEffect ? 'text-light-gray-100' : 'text-primary'
                  )}
                  fontSize={22}
                />
              </Link>
            )}
          </div>
        </div>,
        {
          glassEffect,
          divClassName:
            'fixed top-0 left-0 right-0 z-40 border-b border-opacity-20 border-light-gray-400 bg',
          glassClassName:
            'fixed top-0 left-0 right-0 z-40 border-b border-opacity-20 border-light-gray-400',
        }
      )}
    </>
  )
}

export default Header
