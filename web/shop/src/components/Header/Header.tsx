import { TbShoppingCart, TbHeart, TbUserCircle, TbBell } from 'react-icons/tb'
import { Badge, Button, withGlassEffect, Link } from '@luma/ui'
import { useWishlist } from '@contexts/WishlistContext'
import { useAuth } from '@contexts/AuthContext'
import { useCart } from '@contexts/CartContext'

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
        <>
          <div className="flex flex-row items-center">
            <Link href="/">
              <p className="text-white py-4">
                <strong className="text-success-300">Hytzen</strong>
                Shop
              </p>
            </Link>
            {renderAfterLogo && renderAfterLogo()}
          </div>

          {renderInHeader && renderInHeader()}

          <div className="flex flex-row items-center space-x-2">
            <div className="flex flex-row items-center space-x-1">
              <Button href="/wishlist" rounded className="p-1">
                <Badge
                  className="bg-danger-300"
                  content={
                    wishlist && wishlist?.length > 0
                      ? wishlist?.length
                      : undefined
                  }
                >
                  <TbHeart color="white" fontSize={20} />
                </Badge>
              </Button>

              <Button href="/checkout/cart" rounded className="p-1">
                <Badge
                  content={totalQuantity || undefined}
                  className="bg-success-400"
                >
                  <TbShoppingCart color="white" fontSize={20} />
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
                    <TbBell color="white" size={20} />
                  </Badge>
                </Button>
              )}
            </div>

            {user?.username ? (
              <ProfilePopover />
            ) : (
              <Link href="/auth" passHref>
                <TbUserCircle color="white" fontSize={22} />
              </Link>
            )}
          </div>
        </>,
        {
          glassEffect,
          divClassName:
            'px-8 sm:px-16 fixed top-0 left-0 right-0 z-40 flex flex-row items-center justify-between border-b border-opacity-20 border-light-gray-400 bg-black',
          glassClassName:
            'px-8 sm:px-16 fixed top-0 left-0 right-0 z-40 flex flex-row items-center justify-between border-b border-opacity-20 border-light-gray-400',
        }
      )}
    </>
  )
}

export default Header
