import React from 'react'

import { Product } from '@utils/types'

import ProductCard from '../ProductCard'

interface ProductListProps {
  products: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  )
}

export default ProductList
