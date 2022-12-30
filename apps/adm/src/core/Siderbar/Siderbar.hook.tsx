import { useDebounceCallback } from '@react-hook/debounce'
import { useBreakpoint } from '@hytzenshop/hooks'
import { SiderbarProps } from './Siderbar'
import { useRouter } from 'next/router'

import {
  TbUser,
  TbBuildingStore,
  TbTruck,
  TbCurrencyDollar,
  TbDeviceAnalytics,
  TbReportAnalytics,
  TbDashboard,
  TbBell,
  TbMessage,
  TbThumbUp,
  TbSettings,
  TbShoppingCart,
  TbMail,
} from 'react-icons/tb'

import React from 'react'

const linksTop = [
  {
    title: 'Dashboard',
    path: '/dashboard/home',
    Icon: () => <TbDashboard size={20} />,
  },
  {
    title: 'Usuários',
    path: '/dashboard/users',
    Icon: () => <TbUser size={20} />,
  },
  {
    title: 'Produtos',
    path: '/dashboard/products',
    Icon: () => <TbBuildingStore size={20} />,
  },
  {
    title: 'Pedidos',
    path: '/dashboard/orders',
    Icon: () => <TbTruck size={20} />,
  },
  {
    title: 'Transações',
    path: '/dashboard/transactions',
    Icon: () => <TbCurrencyDollar size={20} />,
  },
  {
    title: 'Carrinhos',
    path: '/dashboard/carts',
    Icon: () => <TbShoppingCart size={20} />,
  },
  {
    title: 'Newsletter',
    path: '/dashboard/newsletter',
    Icon: () => <TbMail size={20} />,
  },
]

const linksMiddle = [
  {
    title: 'Notificações',
    path: '/dashboard/notifications',
    Icon: () => <TbBell size={20} />,
  },
  {
    title: 'Avaliações',
    path: '/dashboard/evaluations',
    Icon: () => <TbThumbUp size={20} />,
  },
  {
    title: 'Mensagens',
    path: '/dashboard/messages',
    Icon: () => <TbMessage size={20} />,
  },
  {
    title: 'Analytics',
    path: '/dashboard/analytics',
    Icon: () => <TbDeviceAnalytics size={20} />,
  },
  {
    title: 'Relatórios',
    path: '/dashboard/reports',
    Icon: () => <TbReportAnalytics size={20} />,
  },
]

const linksBottom = [
  {
    title: 'Settings',
    path: '/dashboard/settings',
    Icon: () => <TbSettings size={20} />,
  },
]

export const useSiderbar = ({
  onDrawerClose,
  onDrawerOpen,
  openSiderbar,
}: SiderbarProps) => {
  const [isOpen, setIsOpen] = React.useState(openSiderbar)

  const { push, pathname } = useRouter()
  const { sm } = useBreakpoint()

  const onDrawerCloseDebounce = useDebounceCallback(onDrawerClose, 300)

  const onOpen = React.useCallback(() => {
    setIsOpen(true)
    onDrawerOpen()
  }, [onDrawerOpen])

  const onClose = React.useCallback(() => {
    setIsOpen(false)
    onDrawerCloseDebounce()
  }, [onDrawerCloseDebounce])

  return {
    linksTop,
    linksMiddle,
    linksBottom,
    isOpen,
    push,
    pathname,
    sm,
    onOpen,
    onClose,
  }
}
