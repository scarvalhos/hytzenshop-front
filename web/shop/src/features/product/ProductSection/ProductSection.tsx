import { useRouter } from 'next/router'
import { Product } from '@hytzenshop/types'
import { Link } from '@luma/ui'
import { c } from '@hytzenshop/helpers'

import ProductSectionSkeleton from './ProductSectionSkeleton'
import ProductList from '../ProductList'

type ProductSectionProps = {
  title?: string
  products?: Product[]
  showSeeAll?: boolean
  isLoading?: boolean
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products = [],
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
      <div className={c('flex flex-row items-center justify-between my-4')}>
        {title && (
          <>
            <h4 className="text-lg text-light-gray-100 font-medium">{title}</h4>
            {!asPath.startsWith('/category') && showSeeAll && (
              <Link href={path}>Ver tudo</Link>
            )}
          </>
        )}
      </div>

      {!isLoading && products?.length === 0 && (
        <div className="overflow-x-hidden flex items-center justify-center mt-4">
          Nenhum produto encontrado.
        </div>
      )}

      <div className={c('my-4')}>
        {isLoading && (
          <>
            <ProductSectionSkeleton />
            <ProductSectionSkeleton />
          </>
        )}
      </div>

      <div className="grid max-[478px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-10">
        {products?.length !== 0 && <ProductList products={products} />}
      </div>
    </>
  )
}

export default ProductSection
