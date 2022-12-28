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

        fileClassName: 'w-[100px] h-[100px]',
      },
      {
        Header: 'Título',
        accessor: 'title',
      },
      {
        Header: 'Estoque',
        accessor: 'stock',
        align: 'items-center',
      },
      {
        Header: 'Vendas',
        accessor: 'stock',
        align: 'items-center',
      },
      {
        Header: 'Avaliação média',
        accessor: 'averageRating',
        align: 'items-center',
      },
      {
        Header: 'Preço',
        accessor: ({ price }) => money(price),
        align: 'items-center',
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
