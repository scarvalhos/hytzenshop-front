import { Product } from '@hytzenshop/types'

import ProductCard from '../ProductCard'
import React from 'react'

interface ProductListProps {
  products: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} glassEffect={false} />
      ))}
    </>
  )
}

export default ProductList
