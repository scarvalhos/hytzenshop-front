import { TbShoppingCart, TbHeart, TbUserCircle, TbSearch } from 'react-icons/tb'
import { GlassContainer, Link } from '@core'
import { SearchContainer } from './styles'
import { useBreakpoint } from '@hooks/useBreakpoint'
import { useWishlist } from '@contexts/WishlistContext'
import { useAuth } from '@contexts/AuthContext'
import { useCart } from '@contexts/CartContext'
import { Badge } from '@luma/ui'

import ProfilePopover from '@components/ProfilePopover'
import React from 'react'

interface HeaderProps {
  renderInHeader?: () => React.ReactNode
  renderAfterLogo?: () => React.ReactNode
  onFilterChange?: (search: string) => void
}

const Header: React.FC<HeaderProps> = ({
  onFilterChange,
  renderInHeader,
  renderAfterLogo,
}) => {
  const [search, setSearch] = React.useState('')
  const [showSearch, setShowSearch] = React.useState(false)

  const { isAuthenticated } = useAuth()
  const { totalQuantity } = useCart()
  const { wishlist } = useWishlist()
  const { md, lg } = useBreakpoint()

  return (
    <>
      <GlassContainer className="px-8 sm:px-16 fixed top-0 left-0 right-0 z-[9999999] flex flex-row items-center justify-between">
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

        <div className="flex flex-row items-center space-x-4">
          {onFilterChange && (
            <>
              {!lg ? (
                <button onClick={() => setShowSearch(!showSearch)}>
                  <TbSearch className="text-light-gray-100 cursor-pointer" />
                </button>
              ) : (
                <SearchContainer className="px-4 py-2">
                  <input
                    className="bg-[transparent] border-none outline-none text-light-gray-100 placeholder:text-light-gray-100"
                    placeholder="Pesquisar"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value)
                      onFilterChange(e.target.value)
                    }}
                  />

                  <TbSearch className="text-light-gray-100 cursor-pointer" />
                </SearchContainer>
              )}
            </>
          )}

          <Link href="/wishlist">
            <Badge content={wishlist?.length} className="bg-danger-300">
              <TbHeart color="white" fontSize={20} />
            </Badge>
          </Link>

          <Link href="/checkout/cart" passHref>
            <Badge content={totalQuantity} className="bg-success-300">
              <TbShoppingCart color="white" fontSize={20} />
            </Badge>
          </Link>

          {isAuthenticated ? (
            <ProfilePopover />
          ) : (
            <Link href="/auth" passHref>
              <TbUserCircle color="white" fontSize={22} />
            </Link>
          )}
        </div>
      </GlassContainer>
      {onFilterChange && !md && showSearch && (
        <SearchContainer className="sticky top-12 left-0 right-0 px-8 py-4 justify-between flex-1 z-[99999]">
          <input
            className="bg-[transparent] border-none outline-none"
            placeholder="Pesquisar"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              onFilterChange(e.target.value)
            }}
          />

          <TbSearch className="text-light-gray-100 cursor-pointer" />
        </SearchContainer>
      )}
    </>
  )
}

export default Header
