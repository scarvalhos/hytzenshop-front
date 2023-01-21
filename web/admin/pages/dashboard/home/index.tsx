import {
  HomeMetricsProvider,
  useHomeMetrics,
} from '@contexts/HomeMetricsContext'

import {
  TbCurrencyDollar,
  TbTruckDelivery,
  TbShoppingCart,
  TbUser,
} from 'react-icons/tb'

import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Loader } from '@luma/ui'

import SiderbarLayout from '@layouts/SiderbarLayout'
import Graphic from '@components/Graphic'

const HomeMetrics: React.FC = () => {
  const {
    ordersDeliveredCount,
    totalSalesCount,
    totalUsersCount,
    openCartsCount,
    isLoading,
  } = useHomeMetrics()

  return (
    <div className="mt-10 space-y-4">
      <h2 className="text-primary text-xl font-medium">Geral</h2>

      <div className="bg-primary grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 rounded-md mt-10 px-4 py-4">
        <div className="flex flex-row space-x-3">
          <div className="bg-secondary rounded-md px-2 py-2 flex items-center justify-center">
            <TbTruckDelivery className="text-success-300" />
          </div>
          <div>
            <p className="text-sm text-primary">Pedidos finalizados</p>
            <p className="text-success-300">
              {isLoading ? <Loader className="static" /> : ordersDeliveredCount}
            </p>
          </div>
        </div>

        <div className="flex flex-row space-x-3">
          <div className="bg-secondary rounded-md px-2 py-2 flex items-center justify-center">
            <TbShoppingCart className="text-warning-300" />
          </div>
          <div>
            <p className="text-sm text-primary">Carrinhos abertos</p>
            <p className="text-warning-300">
              {isLoading ? <Loader className="static" /> : openCartsCount}
            </p>
          </div>
        </div>

        <div className="flex flex-row space-x-3">
          <div className="bg-secondary rounded-md px-2 py-2 flex items-center justify-center">
            <TbCurrencyDollar className="text-primary-300" />
          </div>
          <div>
            <p className="text-sm text-primary">Total vendas</p>
            <p className="text-primary-300">
              {isLoading ? <Loader className="static" /> : totalSalesCount}
            </p>
          </div>
        </div>

        <div className="flex flex-row space-x-3">
          <div className="bg-secondary rounded-md px-2 py-2 flex items-center justify-center">
            <TbUser color="#9f4fe9" />
          </div>
          <div>
            <p className="text-sm text-primary">Usuários</p>
            <p className="[color:#9f4fe9]">
              {isLoading ? <Loader className="static" /> : totalUsersCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const DashboardHome: NextPage = () => {
  return (
    <>
      <NextSeo title="Dashboard" />

      <HomeMetricsProvider>
        <div className="space-y-1">
          <h1 className="text-primary text-2xl font-semibold">Dashboard</h1>
          <p>Bem-vindo ao Dashboard Administrador - Hytzen Shop.</p>
        </div>

        <HomeMetrics />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Graphic title="Vendas 2022" />
          <Graphic title="Novos clientes" />
        </div>

        <div className="mt-10 mb-20 space-y-4">
          <h2 className="text-primary text-xl font-medium">
            Pré-visualização do site
          </h2>

          <iframe
            title="Hytzen Shop"
            src={process.env.NEXT_PUBLIC_SHOP_URL_FRONTEND}
            className="w-full h-[60vh] rounded-md bg-primary shadow-lg py-1.5 pl-1.5"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </HomeMetricsProvider>
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
