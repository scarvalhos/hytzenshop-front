import { IconButton, Stack, Typography, useTheme } from '@mui/material'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Button, Tooltip } from '@luma/ui'
import { useBreakpoint } from '@hytzenshop/hooks'
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
  TbMenu,
} from 'react-icons/tb'

import {
  Container,
  Nav,
  SubMenu,
  SubMenuItem,
  SubMenuTitle,
  Logo,
  LogoLink,
  SubMenuClosedItem,
} from './styles'

interface SiderbarProps {
  openSiderbar: boolean
  onDrawerOpen: () => void
  onDrawerClose: () => void
}

const linksTop = [
  {
    title: 'Dashboard',
    path: '/dashboard/home',
    Icon: () => <TbDashboard size={16} />,
  },
  {
    title: 'Usuários',
    path: '/dashboard/users',
    Icon: () => <TbUser size={16} />,
  },
  {
    title: 'Produtos',
    path: '/dashboard/products',
    Icon: () => <TbBuildingStore size={16} />,
  },
  {
    title: 'Pedidos',
    path: '/dashboard/orders',
    Icon: () => <TbTruck size={16} />,
  },
  {
    title: 'Transações',
    path: '/dashboard/transactions',
    Icon: () => <TbCurrencyDollar size={16} />,
  },
  {
    title: 'Analytics',
    path: '/dashboard/analytics',
    Icon: () => <TbDeviceAnalytics size={16} />,
  },
  {
    title: 'Relatórios',
    path: '/dashboard/reports',
    Icon: () => <TbReportAnalytics size={16} />,
  },
]

const linksMiddle = [
  {
    title: 'Notificações',
    path: '/dashboard/notifications',
    Icon: () => <TbBell size={16} />,
  },
  {
    title: 'Avaliações',
    path: '/dashboard/evaluations',
    Icon: () => <TbThumbUp size={16} />,
  },
  {
    title: 'Mensagens',
    path: '/dashboard/messages',
    Icon: () => <TbMessage size={16} />,
  },
]

const linksBottom = [
  {
    title: 'Settings',
    path: '/dashboard/settings',
    Icon: () => <TbSettings size={16} />,
  },
]

export const Siderbar: React.FC<SiderbarProps> = ({
  openSiderbar,
  onDrawerOpen,
  onDrawerClose,
}) => {
  const { push, pathname } = useRouter()

  const theme = useTheme()

  const { sm } = useBreakpoint()

  return (
    <>
      {openSiderbar ? (
        <Container>
          <Nav>
            <IconButton
              sx={{
                position: 'absolute',
                top: '16px',
                right: '-14px',
                background: theme.palette.secondary.dark,
                border: '1.5px solid',
                borderColor: theme.palette.primary.dark,
                color: theme.palette.text.secondary,
                ':hover': {
                  background: theme.palette.secondary.main,
                  color: theme.palette.text.primary,
                },
              }}
              onClick={onDrawerClose}
              size="small"
            >
              <IoIosArrowBack size={14} color="inherit" />
            </IconButton>

            <Stack mb="2rem" ml="2rem">
              <Logo href="/" passHref>
                <LogoLink>
                  <Typography color="secondary.main" fontWeight="bold">
                    Hero
                  </Typography>
                  <Typography color="text.primary">Shop </Typography>
                  <Typography fontSize={12} ml={0.5} color="text.secondary">
                    | ADM
                  </Typography>
                </LogoLink>
              </Logo>
            </Stack>

            <SubMenu>
              {linksTop.map((link) => (
                <SubMenuItem
                  key={link.title}
                  onClick={() => push(link.path)}
                  isActive={pathname.startsWith(link.path)}
                >
                  <link.Icon />
                  <SubMenuTitle>{link.title}</SubMenuTitle>
                </SubMenuItem>
              ))}
            </SubMenu>
            <SubMenu>
              {linksMiddle.map((link) => (
                <SubMenuItem
                  key={link.title}
                  onClick={() => push(link.path)}
                  isActive={pathname.startsWith(link.path)}
                >
                  <link.Icon />
                  <SubMenuTitle>{link.title}</SubMenuTitle>
                </SubMenuItem>
              ))}
            </SubMenu>
            <SubMenu>
              {linksBottom.map((link) => (
                <SubMenuItem
                  key={link.title}
                  onClick={() => push(link.path)}
                  isActive={pathname.startsWith(link.path)}
                >
                  <link.Icon />
                  <SubMenuTitle>{link.title}</SubMenuTitle>
                </SubMenuItem>
              ))}
            </SubMenu>
          </Nav>
        </Container>
      ) : (
        <div className="fixed top-0 left-0 bottom-0 flex flex-col justify-start items-center sm:bg-dark-gray-400 sm:border-r sm:border-r-dark-gray-200 z-[999]">
          <IconButton
            aria-label="open drawer"
            sx={{
              position: 'absolute',
              top: '16px',
              right: '-14px',
              border: '1.5px solid',
              borderColor: theme.palette.primary.dark,
              background: theme.palette.primary.dark,
              color: theme.palette.text.primary,
              ':hover': {
                background: theme.palette.secondary.main,
                color: theme.palette.text.primary,
              },
              zIndex: 9999,
            }}
            onClick={onDrawerOpen}
            size="small"
            className="max-sm:hidden"
          >
            <IoIosArrowForward size={14} color="inherit" />
          </IconButton>

          <div className="flex items-center max-sm:space-x-2 p-4 max-sm:mt-2">
            <Button
              className="sm:hidden bg-dark-gray-500 p-2 ml-4"
              rounded
              onClick={onDrawerOpen}
            >
              <TbMenu size={16} />
            </Button>

            <div className="flex items-center sm:mt-4">
              {sm ? (
                <>
                  <Typography color="secondary.main" fontWeight="bold">
                    H
                  </Typography>
                  <Typography color="text.primary">S </Typography>
                </>
              ) : (
                <>
                  <Typography color="secondary.main" fontWeight="bold">
                    Hero
                  </Typography>
                  <Typography color="text.primary">Shop </Typography>
                  <Typography fontSize={12} ml={0.5} color="text.secondary">
                    | ADM
                  </Typography>
                </>
              )}
            </div>
          </div>

          {sm ? (
            <>
              <SubMenu>
                {linksTop.map((link) => (
                  <Tooltip key={link.title} content={link.title}>
                    <SubMenuClosedItem
                      onClick={() => push(link.path)}
                      isActive={pathname.startsWith(link.path)}
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
                      isActive={pathname.startsWith(link.path)}
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
                      isActive={pathname.startsWith(link.path)}
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
