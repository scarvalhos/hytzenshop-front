import { TbShoppingCart, TbHeart, TbUserCircle } from 'react-icons/tb'
import { Badge, GlassContainer } from '@luma/ui'
import { useWishlist } from '@contexts/WishlistContext'
import { useAuth } from '@contexts/AuthContext'
import { useCart } from '@contexts/CartContext'
import { Link } from '@core'

import ProfilePopover from '@components/ProfilePopover'
import React from 'react'

interface HeaderProps {
  renderInHeader?: () => React.ReactNode
  renderAfterLogo?: () => React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ renderInHeader, renderAfterLogo }) => {
  const { totalQuantity } = useCart()
  const { wishlist } = useWishlist()
  const { user } = useAuth()

  return (
    <GlassContainer className="px-8 sm:px-16 fixed top-0 left-0 right-0 z-40 flex flex-row items-center justify-between border-b border-opacity-20 border-light-gray-400">
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

      <div className="flex flex-row items-center">
        <Link href="/wishlist">
          <Badge
            content={
              wishlist && wishlist?.length > 0 ? wishlist?.length : undefined
            }
            className="bg-danger-300"
          >
            <TbHeart color="white" fontSize={20} />
          </Badge>
        </Link>

        <Link href="/checkout/cart" passHref className="mx-4">
          <Badge
            content={totalQuantity || undefined}
            className="bg-success-300"
          >
            <TbShoppingCart color="white" fontSize={20} />
          </Badge>
        </Link>

        {user?.username ? (
          <ProfilePopover />
        ) : (
          <Link href="/auth" passHref>
            <TbUserCircle color="white" fontSize={22} />
          </Link>
        )}
      </div>
    </GlassContainer>
  )
}

export default Header
