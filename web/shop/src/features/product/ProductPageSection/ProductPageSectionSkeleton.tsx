import { c } from '@hytzenshop/helpers'

import ProductSectionSkeleton from '../ProductSection/ProductSectionSkeleton'
import React from 'react'

const ProductPageSectionSkeleton: React.FC = () => {
  return (
    <main className="max-w-screen-2xl mx-auto px-8 sm:px-16 space-y-10">
      <div className={c('grid space-x-8 grid-cols-1 md:grid-cols-[30%,1fr]')}>
        <div className="w-[100%] h-[400px] bg-primary animate-pulse rounded-md" />

        <div className="space-y-4 bg-primary animate-pulse rounded-md" />
      </div>

      <div
        id="description"
        className={c('h-[200px] bg-primary animate-pulse rounded-md')}
      />

      <ProductSectionSkeleton />
    </main>
  )
}

export default ProductPageSectionSkeleton
