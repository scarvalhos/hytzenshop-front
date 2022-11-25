import { Divide } from 'core'
import { c } from '@utils/helpers'

import ProductSectionSkeleton from '../ProductSection/ProductSectionSkeleton'
import React from 'react'

const ProductPageSectionSkeleton: React.FC = () => {
  return (
    <>
      <div
        className={c(
          'w-[100%] grid pt-20 space-x-8 grid-cols-1 px-8 md:grid-cols-[30%,1fr] md:px-16'
        )}
      >
        <div className="w-[100%] h-[400px] bg-dark-gray-400 animate-pulse rounded-md" />

        <div className="space-y-4 bg-dark-gray-400 animate-pulse rounded-md" />
      </div>

      <Divide.DivideLine dividerClassName="mx-8 md:mx-16" />

      <div
        id="description"
        className={c(
          'space-y-2 h-[200px] mx-16 px-8 md:px-16 bg-dark-gray-400 animate-pulse rounded-md max-w-full'
        )}
      />

      <Divide.DivideLine dividerClassName="mx-8 md:mx-16" />

      <ProductSectionSkeleton />
    </>
  )
}

export default ProductPageSectionSkeleton
