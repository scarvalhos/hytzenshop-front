import { Product } from '@hytzenshop/types'
import { map } from '@hytzenshop/helpers'

import ProductCard from '../ProductCard'
import React from 'react'

interface ProductListProps {
  products?: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return products ? (
    <>
      {map(products, (product) => (
        <ProductCard key={product?.id} product={product} glassEffect={false} />
      ))}
    </>
  ) : null
}

export default ProductList
