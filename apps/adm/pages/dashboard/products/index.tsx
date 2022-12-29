import * as React from 'react'

import { HeaderProductsList } from '@features/product/ProductsList/Header'
import { PaginationParams } from '@hytzenshop/types'
import { ProductsList } from '@features/product/ProductsList'
import { LoadAnimated } from '@core/LoadAnimated'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { useProducts } from '@hooks/useProducts'
import { Pagination } from '@core/Pagination'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { c } from '@hytzenshop/helpers'

import SiderbarLayout from '@layouts/SiderbarLayout'

const QuikMenuProducts: NextPage = () => {
  const [state, dispatch] = React.useState<PaginationParams>({
    page: 1,
    limit: 10,
    filter: '',
    sort: 'createdAt',
    order: 'desc',
  })

  const {
    getProducts: { data, isLoading },
    deleteProduct,
  } = useProducts({
    page: state.page,
    limit: state.limit,
    filter: state.filter,
  })

  const setPage = React.useCallback(
    (page: number) => {
      dispatch({
        ...state,
        page,
      })
    },
    [state]
  )

  const onFilterChange = React.useCallback(
    (filter?: string) => {
      dispatch({
        ...state,
        filter,
      })
    },
    [state]
  )

  return (
    <>
      <NextSeo title="Produtos" />

      <HeaderProductsList
        products={data?.data.products}
        onFilterChange={onFilterChange}
      />

      <div className="mb-20">
        <div className={c(isLoading && 'flex justify-center items-center')}>
          {isLoading ? (
            <LoadAnimated size={160} />
          ) : (
            <ProductsList
              products={data?.data.products || []}
              deleteProduct={deleteProduct}
            />
          )}
        </div>

        {!isLoading && (
          <Pagination
            currentPage={state.page}
            totalCountOfRegisters={data?.data.count || 0}
            registersPerPage={state.limit}
            onPageChange={setPage}
          />
        )}
      </div>
    </>
  )
}

// @ts-expect-error layout
QuikMenuProducts.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default QuikMenuProducts

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    }
  },
  {
    isAdmin: true,
  }
)
