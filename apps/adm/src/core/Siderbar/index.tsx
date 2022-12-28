import {
  Nav,
  SubMenu,
  SubMenuItem,
  SubMenuClosedItem,
  SiderBarContainer,
} from './styles'

import { useDebounceCallback } from '@react-hook/debounce'
import { Button, Tooltip } from '@luma/ui'
import { IoIosArrowBack } from 'react-icons/io'
import { useBreakpoint } from '@hytzenshop/hooks'
import { useRouter } from 'next/router'
import { c } from '@hytzenshop/helpers'

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
  TbMenu,
} from 'react-icons/tb'

import Link from '@core/Link'
import React from 'react'

interface SiderbarProps {
  openSiderbar: boolean
  onDrawerOpen: () => void
  onDrawerClose: () => void
}

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
]

const linksBottom = [
  {
    title: 'Settings',
    path: '/dashboard/settings',
    Icon: () => <TbSettings size={20} />,
  },
]

export const Siderbar: React.FC<SiderbarProps> = ({
  openSiderbar,
  onDrawerOpen,
  onDrawerClose,
}) => {
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

  return (
    <>
      {openSiderbar ? (
        <SiderBarContainer
          {...(sm
            ? {
                animation: isOpen ? 'right' : 'left',
              }
            : {
                animationMobile: isOpen ? 'right' : 'left',
              })}
          className="w-60 fixed top-0 left-0 bottom-0 flex bg-dark-gray-500 z-50 transition-all drop-shadow-md"
        >
          <Nav>
            <Button
              className="absolute top-[16px] -right-[14px] p-2 bg-dark-gray-400 border border-dark-gray-300 text-light-gray-500 hover:bg-dark-gray-300 hover:text-light-gray-100 drop-shadow-md"
              onClick={onClose}
              rounded
            >
              <IoIosArrowBack size={14} color="inherit" />
            </Button>

            <div className="mb-4 ml-8">
              <Link href="/">
                <span className="flex flex-row items-center justify-center">
                  <p className="text-success-300 font-medium text-base">
                    Hytzen
                  </p>
                  <p className="text-light-gray-100 text-base">Shop </p>
                  <p className="text-xs ml-0.5">| ADM</p>
                </span>
              </Link>
            </div>

            <SubMenu>
              {linksTop.map((link) => (
                <SubMenuItem
                  key={link.title}
                  onClick={() => push(link.path)}
                  className={c(
                    'hover:bg-success-300 hover:bg-opacity-10 hover:text-success-300 space-x-2 rounded-r-full',
                    pathname.startsWith(link.path)
                      ? 'bg-success-300 bg-opacity-10 text-success-300'
                      : 'bg-[transparent] text-light-gray-500'
                  )}
                >
                  <link.Icon />
                  <p className="text-base">{link.title}</p>
                </SubMenuItem>
              ))}
            </SubMenu>
            <SubMenu>
              {linksMiddle.map((link) => (
                <SubMenuItem
                  key={link.title}
                  onClick={() => push(link.path)}
                  className={c(
                    'hover:bg-success-300 hover:bg-opacity-10 hover:text-success-300 space-x-2 rounded-r-full',
                    pathname.startsWith(link.path)
                      ? 'bg-success-300 bg-opacity-10 text-success-300'
                      : 'bg-[transparent] text-light-gray-500'
                  )}
                >
                  <link.Icon />
                  <p className="text-base">{link.title}</p>
                </SubMenuItem>
              ))}
            </SubMenu>
            <SubMenu>
              {linksBottom.map((link) => (
                <SubMenuItem
                  key={link.title}
                  onClick={() => push(link.path)}
                  className={c(
                    'hover:bg-success-300 hover:bg-opacity-10 hover:text-success-300 space-x-2 rounded-r-full',
                    pathname.startsWith(link.path)
                      ? 'bg-success-300 bg-opacity-10 text-success-300'
                      : 'bg-[transparent] text-light-gray-500'
                  )}
                >
                  <link.Icon />
                  <p className="text-base">{link.title}</p>
                </SubMenuItem>
              ))}
            </SubMenu>
          </Nav>
        </SiderBarContainer>
      ) : (
        <div className="fixed top-0 left-0 bottom-0 flex flex-col justify-start items-center sm:bg-dark-gray-500 z-[999]">
          <div className="flex items-center max-sm:space-x-2 p-3 max-sm:mt-2">
            <Button
              className="sm:hidden bg-dark-gray-500 p-2 ml-4"
              rounded
              onClick={onOpen}
            >
              <TbMenu size={20} />
            </Button>

            {sm ? (
              <Button
                className="p-2 hover:bg-dark-gray-300 drop-shadow-md mt-4"
                onClick={onOpen}
                rounded
              >
                <TbMenu />
              </Button>
            ) : null}
          </div>

          {sm ? (
            <>
              <SubMenu>
                {linksTop.map((link) => (
                  <Tooltip key={link.title} content={link.title}>
                    <SubMenuClosedItem
                      onClick={() => push(link.path)}
                      className={c(
                        'hover:bg-success-300 hover:bg-opacity-10 hover:text-success-300',
                        pathname.startsWith(link.path)
                          ? 'bg-success-300 bg-opacity-10 text-success-300'
                          : 'bg-[transparent] text-light-gray-500'
                      )}
                    >
                      <link.Icon />
                    </SubMenuClosedItem>
                  </Tooltip>
                ))}
              </SubMenu>
              <SubMenu>
                {linksMiddle.map((link) => (
                  <Tooltip key={link.title} content={link.title}>
                    <SubMenuClosedItem
                      key={link.title}
                      onClick={() => push(link.path)}
                      className={c(
                        'hover:bg-success-300 hover:bg-opacity-10 hover:text-success-300',
                        pathname.startsWith(link.path)
                          ? 'bg-success-300 bg-opacity-10 text-success-300'
                          : 'bg-[transparent] text-light-gray-500'
                      )}
                    >
                      <link.Icon />
                    </SubMenuClosedItem>
                  </Tooltip>
                ))}
              </SubMenu>
              <SubMenu>
                {linksBottom.map((link) => (
                  <Tooltip key={link.title} content={link.title}>
                    <SubMenuClosedItem
                      key={link.title}
                      onClick={() => push(link.path)}
                      className={c(
                        'hover:bg-success-300 hover:bg-opacity-10 hover:text-success-300',
                        pathname.startsWith(link.path)
                          ? 'bg-success-300 bg-opacity-10 text-success-300'
                          : 'bg-[transparent] text-light-gray-500'
                      )}
                    >
                      <link.Icon />
                    </SubMenuClosedItem>
                  </Tooltip>
                ))}
              </SubMenu>
            </>
          ) : null}
        </div>
      )}
    </>
  )
}
