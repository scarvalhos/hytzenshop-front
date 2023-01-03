import { LoadingAnimation, Pagination } from '@luma/ui'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { MpPaymentResponse } from '@hytzenshop/types'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { api } from '@hytzenshop/services'
import { c } from '@hytzenshop/helpers'

import TransactionsListHeader from '@features/transactions/TransactionsList/TransactionsListHeader'
import TransactionsList from '@features/transactions/TransactionsList'
import SiderbarLayout from '@layouts/SiderbarLayout'
import React from 'react'

interface TransactionDto {
  results: MpPaymentResponse[]
  paging: {
    limit: number
    offset: number
    total: number
  }
}

const getData = async (params: any) => {
  return api
    .get<TransactionDto>('https://api.mercadopago.com/v1/payments/search', {
      params,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MERCADO_PAGO_ACCESS_TOKEN}`,
      },
    })
    .then(({ data }) => data)
}

const DashboardTransactions: NextPage = () => {
  const [state, dispatch] = React.useState({
    sort: 'date_created',
    criteria: 'desc',
    limit: 10,
    offset: 0,
  })

  const transactionsQuery = useQuery(
    ['transactions', state.offset],
    () => getData(state),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  ) as UseQueryResult<TransactionDto, unknown>

  const setPage = React.useCallback(
    (page: number) => {
      dispatch({
        ...state,
        offset: (page - 1) * 10,
      })
    },
    [state]
  )

  return (
    <>
      <NextSeo title="Transações" />

      <TransactionsListHeader />

      <main className="mb-20">
        <div
          className={c(
            transactionsQuery.isLoading && 'flex justify-center items-center'
          )}
        >
          {transactionsQuery.isLoading ? (
            <LoadingAnimation size={160} />
          ) : (
            <TransactionsList
              transactions={transactionsQuery.data?.results || []}
            />
          )}
        </div>

        {!transactionsQuery.isLoading && (
          <Pagination
            currentPage={state.offset / 10 + 1}
            totalCountOfRegisters={transactionsQuery?.data?.paging.total || 0}
            registersPerPage={state.limit}
            onPageChange={setPage}
          />
        )}
      </main>
    </>
  )
}

// @ts-expect-error layout
DashboardTransactions.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default DashboardTransactions

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
