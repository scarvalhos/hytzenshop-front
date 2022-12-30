import * as React from 'react'

import { HeaderOrdersList } from '@features/orders/OrdersList/Header'
import { PaginationParams } from '@hytzenshop/types'
import { LoadingAnimation } from '@luma/ui'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { OrdersList } from '@features/orders/OrdersList'
import { Pagination } from '@core/Pagination'
import { useOrders } from '@hooks/useOrders'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { c } from '@hytzenshop/helpers'

import SiderbarLayout from '@layouts/SiderbarLayout'

const Orders: NextPage = () => {
  const [state, dispatch] = React.useState<PaginationParams>({
    page: 1,
    limit: 10,
    filter: '',
    sort: 'createdAt',
    order: 'desc',
  })

  const {
    getOrders: { data, isLoading },
  } = useOrders({
    page: state.page,
    limit: state.limit,
    filter: state.filter,
    order: state.order,
    sort: state.sort,
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
      <NextSeo title="Pedidos" />

      <HeaderOrdersList
        orders={data?.data.orders}
        loading={isLoading}
        onFilterChange={onFilterChange}
      />

      <div className="mb-20">
        <div className={c(isLoading && 'flex justify-center items-center')}>
          {isLoading ? (
            <LoadingAnimation size={160} />
          ) : (
            <OrdersList orders={data?.data.orders} />
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
Orders.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default Orders

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
