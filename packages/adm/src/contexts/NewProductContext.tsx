import * as React from 'react'

type ProductProviderProps = {
  children: React.ReactNode
}

type ProductContextData = {
  filter?: string
  setFilter: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const ProductContext = React.createContext({} as ProductContextData)

export function ProductProvider({ children }: ProductProviderProps) {
  const [filter, setFilter] = React.useState<string>()

  return (
    <ProductContext.Provider
      value={{
        setFilter,
        filter,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
