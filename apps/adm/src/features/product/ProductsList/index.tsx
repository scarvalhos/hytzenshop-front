// @refresh reset

import * as React from 'react'

import { useRouter } from 'next/router'
import { Product } from '@hytzenshop/types'
import { Column } from '@core/ListCards'
import { money } from '@hytzenshop/helpers'

import ListCards from '@core/ListCards'

interface ProductsListProps {
  products: Omit<Product[], 'colors' | 'categories' | 'sizes' | 'images'>
  deleteProduct: (id: string) => void
}

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  deleteProduct,
}) => {
  const { push } = useRouter()

  const columns = React.useMemo<Column<Product>[]>(
    () => [
      {
        Header: '',
        type: 'file',
        accessor: ({ images }) => images[0]?.url,
      },
      {
        Header: 'Título',
        accessor: 'title',
      },
      {
        Header: 'Estoque',
        accessor: 'stock',
        align: 'center',
      },
      {
        Header: 'Vendas',
        accessor: 'stock',
        align: 'center',
      },
      {
        Header: 'Avaliação média',
        accessor: 'averageRating',
        align: 'center',
      },
      {
        Header: 'Preço',
        accessor: ({ price }) => money(price),
        align: 'center',
      },
    ],
    []
  )

  return (
    <ListCards
      rows={products}
      columns={columns}
      details
      deleteRow
      onDetails={(row) => push(`/dashboard/products/${(row as Product).id}`)}
      onDelete={(row) => {
        deleteProduct((row as Product).id)
      }}
    />
  )
}
