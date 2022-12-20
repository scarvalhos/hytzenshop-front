import { useContext } from 'react'
import { ProductContext } from '@contexts/NewProductContext'

export const useNewProduct = () => {
  return useContext(ProductContext)
}

// import { useContext } from 'react'
// import { TableContext } from '@contexts/TableContext'

// export interface TableProps<T> {
//   selectedRows: T[]
//   isRowsActive: boolean
//   handleSetSelectedRows: (row: T[]) => void
// }

// export const useTable = <T>() => {
//   return useContext(TableContext) as TableProps<T>
// }
