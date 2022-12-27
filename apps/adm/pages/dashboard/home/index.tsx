import { withSSRAuth } from '@hocs/withSSRAuth'
import { useConfig } from '@contexts/ConfigContext'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Loader } from '@luma/ui'

import {
  TbCurrencyDollar,
  TbShoppingCart,
  TbTruckDelivery,
  TbUser,
} from 'react-icons/tb'

import SiderbarLayout from '@layouts/SiderbarLayout'
// import Graphic from '@core/Graphic'

const DashboardHome: NextPage = () => {
  const {
    ordersDeliveredCountQuery,
    openCartsCountQuery,
    totalSalesCountQuery,
    totalUsersCountQuery,
  } = useConfig()

  return (
    <>
      <NextSeo title="Dashboard" />

      <div className="space-y-1">
        <h1 className="text-light-gray-100 text-2xl font-medium">Dashboard</h1>
        <p>Bem-vindo ao Dashboard Administrador - Hytzen Shop.</p>
      </div>

      <div className="mt-10 space-y-4">
        <h2 className="text-light-gray-100 text-xl">Geral</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 rounded-md bg-dark-gray-500 bg-opacity-50 mt-10 px-4 py-4">
          <div className="flex flex-row space-x-2">
            <div className="bg-dark-gray-400 rounded-md px-2 py-2 flex items-center justify-center">
              <TbTruckDelivery className="text-success-300" />
            </div>
            <div>
              <p className="text-sm">Pedidos finalizados</p>
              <p className="text-success-300">
                {ordersDeliveredCountQuery?.isLoading ? (
                  <Loader className="static" />
                ) : (
                  ordersDeliveredCountQuery?.data
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-row space-x-2">
            <div className="bg-dark-gray-400 rounded-md px-2 py-2 flex items-center justify-center">
              <TbShoppingCart className="text-warning-300" />
            </div>
            <div>
              <p className="text-sm">Carrinhos abertos</p>
              <p className="text-warning-300">
                {openCartsCountQuery?.isLoading ? (
                  <Loader className="static" />
                ) : (
                  openCartsCountQuery?.data
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-row space-x-2">
            <div className="bg-dark-gray-400 rounded-md px-2 py-2 flex items-center justify-center">
              <TbCurrencyDollar className="text-primary-300" />
            </div>
            <div>
              <p className="text-sm">Total vendas</p>
              <p className="text-primary-300">
                {totalSalesCountQuery?.isLoading ? (
                  <Loader className="static" />
                ) : (
                  totalSalesCountQuery?.data
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-row space-x-2">
            <div className="bg-dark-gray-400 rounded-md px-2 py-2 flex items-center justify-center">
              <TbUser color="#9f4fe9" />
            </div>
            <div>
              <p className="text-sm">Usuários</p>
              <p className="[color:#9f4fe9]">
                {totalUsersCountQuery?.isLoading ? (
                  <Loader className="static" />
                ) : (
                  totalUsersCountQuery?.data
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Graphic title="Vendas 2022" />
        <Graphic title="Novos clientes" />
      </div> */}

      <div className="mt-10 mb-20 space-y-4">
        <h2 className="text-light-gray-100 text-xl">
          Pré-visualização do site
        </h2>
        <iframe
          src={process.env.NEXT_PUBLIC_SHOP_URL_FRONTEND}
          className="w-full h-[50vh] rounded-md bg-dark-gray-400 py-1.5 pl-1.5"
        />
      </div>
    </>
  )
}

// @ts-expect-error layout
DashboardHome.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default DashboardHome

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
