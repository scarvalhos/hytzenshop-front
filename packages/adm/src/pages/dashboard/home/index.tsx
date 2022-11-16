import { Box, Stack, Typography, useTheme } from '@mui/material'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { DivideLine } from '@core/Divide/Divide'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import {
  TbCurrencyDollar,
  TbShoppingCart,
  TbTruckDelivery,
  TbUser,
} from 'react-icons/tb'

import SiderbarLayout from '@layouts/SiderbarLayout'

const DashboardHome: NextPage = () => {
  const theme = useTheme()

  return (
    <>
      <NextSeo title="Dashboard" />
      <Typography variant="h5" fontWeight="medium" color="white">
        Dashboard
      </Typography>
      <Typography
        variant="subtitle2"
        fontWeight="regular"
        color={theme.palette.text.secondary}
      >
        Bem-vindo à Hytzen Shop Dashboard
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        bgcolor={theme.palette.secondary.dark}
        borderRadius={2}
        spacing={2}
        px={2}
        py={1}
        mt={4}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            bgcolor={theme.palette.primary.dark}
            px={1.5}
            py={1.25}
            borderRadius={2}
          >
            <TbTruckDelivery color={theme.palette.success.main} />
          </Box>
          <Stack>
            <Typography
              fontSize="0.875rem"
              color={theme.palette.text.secondary}
            >
              Pedidos finalizados
            </Typography>
            <Typography color={theme.palette.success.main}>342</Typography>
          </Stack>
        </Stack>

        <DivideLine orientation="vertical" />

        <Stack
          bgcolor={theme.palette.secondary.dark}
          borderRadius={2}
          px={2}
          py={2}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              bgcolor={theme.palette.primary.dark}
              px={1.5}
              py={1.25}
              borderRadius={2}
            >
              <TbShoppingCart color={theme.palette.warning.light} />
            </Box>
            <Stack>
              <Typography
                fontSize="0.875rem"
                color={theme.palette.text.secondary}
              >
                Carrinhos abertos
              </Typography>
              <Typography color={theme.palette.warning.light}>24</Typography>
            </Stack>
          </Stack>
        </Stack>

        <DivideLine orientation="vertical" />

        <Stack
          bgcolor={theme.palette.secondary.dark}
          borderRadius={2}
          px={2}
          py={2}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              bgcolor={theme.palette.primary.dark}
              px={1.5}
              py={1.25}
              borderRadius={2}
            >
              <TbCurrencyDollar color="#2879f3" />
            </Box>
            <Stack>
              <Typography
                fontSize="0.875rem"
                color={theme.palette.text.secondary}
              >
                Total vendas
              </Typography>
              <Typography color="#2879f3">230</Typography>
            </Stack>
          </Stack>
        </Stack>

        <DivideLine orientation="vertical" />

        <Stack
          bgcolor={theme.palette.secondary.dark}
          borderRadius={2}
          px={2}
          py={2}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              bgcolor={theme.palette.primary.dark}
              px={1.5}
              py={1.25}
              borderRadius={2}
            >
              <TbUser color="#9f4fe9" />
            </Box>
            <Stack>
              <Typography
                fontSize="0.875rem"
                color={theme.palette.text.secondary}
              >
                Total clientes
              </Typography>
              <Typography color="#9f4fe9">230</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        bgcolor={theme.palette.secondary.dark}
        borderRadius={2}
        spacing={2}
        px={2}
        py={1}
        mt={4}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            bgcolor={theme.palette.primary.dark}
            px={1.5}
            py={1.25}
            borderRadius={2}
          >
            <TbTruckDelivery color={theme.palette.success.main} />
          </Box>
          <Stack>
            <Typography
              fontSize="0.875rem"
              color={theme.palette.text.secondary}
            >
              Pedidos finalizados
            </Typography>
            <Typography color={theme.palette.success.main}>342</Typography>
          </Stack>
        </Stack>

        <DivideLine orientation="vertical" />

        <Stack
          bgcolor={theme.palette.secondary.dark}
          borderRadius={2}
          px={2}
          py={2}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              bgcolor={theme.palette.primary.dark}
              px={1.5}
              py={1.25}
              borderRadius={2}
            >
              <TbShoppingCart color={theme.palette.warning.light} />
            </Box>
            <Stack>
              <Typography
                fontSize="0.875rem"
                color={theme.palette.text.secondary}
              >
                Carrinhos abertos
              </Typography>
              <Typography color={theme.palette.warning.light}>24</Typography>
            </Stack>
          </Stack>
        </Stack>

        <DivideLine orientation="vertical" />

        <Stack
          bgcolor={theme.palette.secondary.dark}
          borderRadius={2}
          px={2}
          py={2}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              bgcolor={theme.palette.primary.dark}
              px={1.5}
              py={1.25}
              borderRadius={2}
            >
              <TbCurrencyDollar color="#2879f3" />
            </Box>
            <Stack>
              <Typography
                fontSize="0.875rem"
                color={theme.palette.text.secondary}
              >
                Total vendas
              </Typography>
              <Typography color="#2879f3">230</Typography>
            </Stack>
          </Stack>
        </Stack>

        <DivideLine orientation="vertical" />

        <Stack
          bgcolor={theme.palette.secondary.dark}
          borderRadius={2}
          px={2}
          py={2}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              bgcolor={theme.palette.primary.dark}
              px={1.5}
              py={1.25}
              borderRadius={2}
            >
              <TbUser color="#9f4fe9" />
            </Box>
            <Stack>
              <Typography
                fontSize="0.875rem"
                color={theme.palette.text.secondary}
              >
                Total clientes
              </Typography>
              <Typography color="#9f4fe9">230</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
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
