import * as React from 'react'

import { Product } from '@hytzenshop/types'
import { money } from '@hytzenshop/helpers'

import ListCards, { Column } from '@components/ListCards'

interface ProductsListProps {
  products: Omit<Product[], 'colors' | 'categories' | 'sizes' | 'images'>
  deleteProduct: (id: string) => void
}

const columns: Column<Product>[] = [
  {
    Header: '',
    type: 'file',
    accessor: ({ images }) => images[0]?.url,
    fileClassName: 'w-16 md:w-[100px] h-16 md:h-[100px]',
  },
  {
    Header: 'Título',
    accessor: 'title',
  },
  {
    Header: 'Estoque',
    accessor: 'stock',
  },
  {
    Header: 'Vendas',
    accessor: 'stock',
  },
  {
    Header: 'Avaliação',
    accessor: 'averageRating',
  },
  {
    Header: 'Preço',
    accessor: ({ price }) => money(price),
  },
]

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  deleteProduct,
}) => {
  return (
    <ListCards
      rows={products}
      columns={columns}
      details
      deleteRow
      onDetails={(row) => `/dashboard/products/${(row as Product).id}`}
      onDelete={(row) => {
        deleteProduct((row as Product).id)
      }}
    />
  )
}
