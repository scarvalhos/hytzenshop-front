import * as React from 'react'

import { Container, Section, Title, Text, Status, IconButton } from './styles'
import { Stack, useTheme, useMediaQuery, Tooltip } from '@mui/material'
import { TbEye, TbInfoCircle, TbThumbUp, TbTruck } from 'react-icons/tb'
import { Order as IOrder } from '@hytzenshop/types'
import { date, money } from '@hytzenshop/helpers'
import { useOrder } from './Order.hook'
import { Link } from '@core/Link'

interface OrderProps {
  order: IOrder
}

const Order: React.FC<OrderProps> = ({ order }) => {
  const theme = useTheme()

  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.down('md'))
  const lg = useMediaQuery(theme.breakpoints.up('md'))

  const {
    iconButtonColor,
    iconTruckColor,
    statusColor,
    statusLabel,
    statusTooltip,
  } = useOrder(order)

  return (
    <Container
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      animate={!md}
      {...(md && {
        barColor: statusColor,
      })}
    >
      <Section>
        <Title>Cliente</Title>
        <Text>{order.user.email}</Text>
      </Section>

      {!sm && (
        <>
          <Section>
            <Title>Data do pedido</Title>
            <Text>{date(order.createdAt, 'long-short')}</Text>
          </Section>
          <Section>
            <Title>Número do pedido</Title>
            <Text>#{order.mpPaymentId}</Text>
          </Section>
        </>
      )}

      {lg && (
        <>
          <Section>
            <Title>Total</Title>
            <Text>{money(order.amount)}</Text>
          </Section>
          <Section>
            <Title>Status</Title>
            <Tooltip title={statusTooltip}>
              <Status bgcolor={statusColor}>
                {statusLabel}
                <TbInfoCircle style={{ marginLeft: 4 }} />
              </Status>
            </Tooltip>
          </Section>
        </>
      )}

      <Stack
        width="fit-content"
        direction={sm ? 'column' : 'row'}
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        {order.status === 'pending' ? (
          <Tooltip title={statusTooltip}>
            <IconButton bg={iconButtonColor} disabled>
              <TbTruck size={16} color={iconTruckColor} />
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton bg={iconButtonColor}>
            {order.status === 'delivered' ? (
              <TbThumbUp size={16} color={iconTruckColor} />
            ) : (
              <TbTruck size={16} color={iconTruckColor} />
            )}
          </IconButton>
        )}
        <Link href={`/dashboard/orders/${order.id}`} passHref>
          <Tooltip title="Ver detalhes">
            <IconButton bg={theme.palette.primary.dark}>
              <TbEye size={16} />
            </IconButton>
          </Tooltip>
        </Link>
      </Stack>
    </Container>
  )
}

export default Order
