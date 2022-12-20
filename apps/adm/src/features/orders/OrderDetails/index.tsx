import * as React from 'react'
import * as Input from '@core/Input'

import {
  displayStatusOrders,
  Option,
  Order as IOrder,
  StatusOrders,
  statusOrdersColor,
  statusOrdersOptions,
  User,
} from '@hytzenshop/types'

import { Container, Title, Wrapper, Text, Label } from './styles'
import { Stack, useMediaQuery, useTheme } from '@mui/material'
import { TbArrowLeft, TbTruck } from 'react-icons/tb'
import { date, money } from '@hytzenshop/helpers'
import { useOrders } from '@hooks/useOrders'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Button } from '@core/Button'

import OrderedProductPreview from '../OrderedProductPreview'
import StepperBar from '@core/StepperBar'
import UserCard from '@features/users/UserCard'
import Divide from '@core/Divide'

interface OrderDetailsProps {
  order: IOrder
  user: User
  payment: {
    payment_method_id: string
    payment_type_id: string
    transaction_amount: number
    transaction_details: {
      installment_amount: number
      total_paid_amount: number
    }
  }
}

const steps = [
  'Aguardando pagamento',
  'Pagamento aprovado',
  'Preparando pedido',
  'Pedido enviado',
  'Pedido entregue',
]

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  payment,
}) => {
  const { register, control, setValue, getValues } = useForm()
  const { updatedOrderStatus } = useOrders()
  const { back } = useRouter()

  const theme = useTheme()

  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.down('md'))

  const onChangeStatus = React.useCallback(
    (e: Option<StatusOrders>) => {
      updatedOrderStatus({ id: order.mpPaymentId, status: e.value })
    },
    [order.mpPaymentId, updatedOrderStatus]
  )

  const statusBySteps = React.useMemo(() => {
    return {
      pending: 0,
      approved: 1,
      processing: 2,
      sending: 3,
      delivered: 4,
    }[(order.status as string) || '']
  }, [order.status])

  return (
    <Container>
      <Stack
        direction={sm ? 'column' : 'row'}
        spacing={1}
        alignItems={sm ? 'start' : 'center'}
        mt={4}
        pb={2}
        sx={{
          position: 'sticky',
          top: '3.75rem',
          zIndex: 99999999,
        }}
        bgcolor={theme.palette.background.default}
      >
        <Button
          title="Voltar"
          icon={<TbArrowLeft size={16} style={{ marginRight: 5 }} />}
          variant="text"
          fullWidth={false}
          onClick={back}
          sx={{
            position: 'absolute',
            top: -24,
          }}
        />
        <Title>Pedido #{order?.mpPaymentId}</Title>{' '}
        <Input.Status
          {...register('status')}
          control={control}
          setValue={setValue}
          onChangeValue={onChangeStatus}
          value={getValues('status')}
          options={statusOrdersOptions}
          getColor={statusOrdersColor as any}
          defaultValue={{
            label: displayStatusOrders[order.status],
            value: order.status,
          }}
        />
      </Stack>

      <Stack
        direction={sm ? 'column-reverse' : 'row'}
        spacing={3}
        alignItems={sm ? 'start' : 'center'}
        justifyContent="space-between"
      >
        <Stack direction={md ? 'column' : 'row'} spacing={1}>
          <Wrapper direction={sm ? 'column' : 'row'} spacing={1}>
            <Label>Data do pedido:</Label>
            <Text>{date(order.createdAt)}</Text>
          </Wrapper>
          <Wrapper direction={sm ? 'column' : 'row'} spacing={1}>
            <Label>Previsão de entrega:</Label>
            <Text>30/09/2022</Text>
          </Wrapper>
        </Stack>

        <Button
          title="Rastreie agora"
          variant="contained"
          fullWidth={sm}
          icon={<TbTruck size={20} style={{ marginRight: 8 }} />}
          rounded
        />
      </Stack>

      <Divide>
        <StepperBar steps={steps} statusBySteps={statusBySteps} />

        <Stack direction="column" mt={2} spacing={2}>
          <Text>Dados do cliente:</Text>
          <UserCard
            user={order.user}
            renderInsideCard={() => (
              <Wrapper>
                <Label>Endereço:</Label>
                <Text fontSize="0.875rem">
                  {`${order?.address?.street}, ${order?.address?.number}` ||
                    '-'}{' '}
                  - {`${order?.address?.district}` || '-'}
                </Text>
                <Text fontSize="0.875rem">
                  {`${order?.address?.city}/${order?.address?.uf}` || '-'} -{' '}
                  {order?.address?.cep || '-'}, {order?.address?.country || '-'}
                </Text>
              </Wrapper>
            )}
          />
        </Stack>

        <Stack direction={md ? 'column' : 'row'} mt={2} spacing={2}>
          <Stack direction="column" spacing={2} height="fit-content" flex={1}>
            <Text>Detalhes do pedido:</Text>
            <Stack
              direction="column"
              spacing={1}
              bgcolor={theme.palette.secondary.dark}
              px={3}
              py={2}
              borderRadius={1}
            >
              <Wrapper
                direction={sm ? 'column' : 'row'}
                justifyContent="space-between"
              >
                <Wrapper>
                  <Label>Produtos:</Label>
                  <Text>{order.orderedProducts.length} itens</Text>
                </Wrapper>

                <Wrapper>
                  <Label>Forma de pagamento:</Label>
                  <Text sx={{ textTransform: 'capitalize' }}>
                    {payment.payment_method_id as string}{' '}
                    {payment.payment_type_id === 'credit_card' &&
                      `${
                        payment.transaction_details.total_paid_amount /
                        payment.transaction_details.installment_amount
                      }x`}
                  </Text>
                </Wrapper>

                <Wrapper>
                  <Label>Total:</Label>
                  <Text>{money(order.amount)}</Text>
                </Wrapper>
              </Wrapper>
            </Stack>
          </Stack>

          <Stack direction="column" spacing={2}>
            <Text>Items do pedido:</Text>
            <Stack
              direction="column"
              spacing={1}
              bgcolor={theme.palette.secondary.dark}
              px={3}
              py={2}
              borderRadius={1}
              height="fit-content"
            >
              <Divide>
                {order.orderedProducts &&
                  order.orderedProducts.map((item) => (
                    <OrderedProductPreview key={item.id} product={item} />
                  ))}
              </Divide>
            </Stack>
          </Stack>
        </Stack>
      </Divide>
    </Container>
  )
}
