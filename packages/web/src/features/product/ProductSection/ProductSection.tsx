import { useRouter } from 'next/router'
import { Product } from '@utils/types'
import { Link } from '@core'
import { c } from '@utils/helpers'

import ProductSectionSkeleton from './ProductSectionSkeleton'
import ProductList from '../ProductList'

type ProductSectionProps = {
  title?: string
  products: Product[]
  showSeeAll?: boolean
  isLoading?: boolean
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  showSeeAll = true,
  isLoading,
}) => {
  const { asPath } = useRouter()

  const path =
    asPath === '/checkout/cart' ||
    asPath.startsWith('/product') ||
    asPath.startsWith('/wishlist')
      ? '/'
      : `/category/${title?.toLowerCase().replace(' ', '-')}`

  return (
    <>
      <div
        className={c(
          'flex flex-row items-center justify-between mx-8 sm:mx-16 my-8'
        )}
      >
        {title && (
          <>
            <h4 className="text-lg text-light-gray-100 font-medium">{title}</h4>
            {!asPath.startsWith('/category') && showSeeAll && (
              <Link href={path}>Ver tudo</Link>
            )}
          </>
        )}
      </div>

      <div className="overflow-x-hidden">
        <div>
          {!isLoading && products?.length === 0 && (
            <div className="overflow-x-hidden flex items-center justify-center mt-4">
              Nenhum produto encontrado.
            </div>
          )}

          {isLoading && <ProductSectionSkeleton />}

          <div className="grid max-[478px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mx-8 sm:mx-16">
            {products.length !== 0 && <ProductList products={products} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductSection
