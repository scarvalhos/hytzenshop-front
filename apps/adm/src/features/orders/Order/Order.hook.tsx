import * as React from 'react'

import { useTheme } from '@mui/material'
import { Order } from '@hytzenshop/types'

export const useOrder = (order: Order) => {
  const theme = useTheme()

  const statusLabel = React.useMemo(() => {
    return {
      pending: 'Pendente',
      approved: 'Pagamento aprovado',
      processing: 'Processando',
      sending: 'Enviando',
      delivered: 'Entregue',
      cancelled: 'Cancelado',

      authorized: 'Autorizado',
      charged_back: 'Cobrado de volta',
      in_process: 'Em processamento',
      in_mediation: 'Em mediação',
      refunded: 'Devolvido',
      rejected: 'Rejeitado',
    }[order.status || '']
  }, [order.status])

  const statusColor = React.useMemo(() => {
    return {
      pending: theme.palette.warning.main,
      approved: theme.palette.warning.light,
      processing: theme.palette.warning.light,
      sending: theme.palette.warning.light,
      delivered: theme.palette.secondary.main,
      cancelled: theme.palette.primary.main,

      authorized: 'Autorizado',
      charged_back: 'Cobrado de volta',
      in_process: 'Em processamento',
      in_mediation: 'Em mediação',
      refunded: 'Devolvido',
      rejected: 'Rejeitado',
    }[order.status || '']
  }, [order.status])

  const statusTooltip = React.useMemo(() => {
    return {
      pending: 'Aguardando pagamento.',
      approved: 'Pagamento aprovado. Em breve processaremos seu pedido.',
      processing: 'Estamos preparando seu pedido.',
      sending: 'Seu pedido foi envido.',
      delivered: 'Seu pedido foi entregue.',
      cancelled: 'Cancelado',
      authorized: 'Autorizado',
      charged_back: 'Cobrado de volta',
      in_process: 'Em processamento',
      in_mediation: 'Em mediação',
      refunded: 'Devolvido',
      rejected: 'Rejeitado',
    }[order.status || '']
  }, [order.status])

  const iconButtonColor = React.useMemo(() => {
    return {
      pending: theme.palette.primary.dark,
      approved: theme.palette.primary.dark,
      processing: theme.palette.primary.dark,
      sending: theme.palette.secondary.main,
      delivered: theme.palette.primary.light,
      cancelled: theme.palette.primary.dark,
      authorized: theme.palette.primary.dark,
      charged_back: theme.palette.primary.dark,
      in_process: theme.palette.primary.dark,
      in_mediation: theme.palette.primary.dark,
      refunded: theme.palette.primary.dark,
      rejected: theme.palette.primary.dark,
    }[order.status || '']
  }, [order.status])

  const iconTruckColor = React.useMemo(() => {
    return {
      pending: theme.palette.text.secondary,
      approved: theme.palette.text.primary,
      processing: theme.palette.text.secondary,
      sending: theme.palette.text.primary,
      delivered: theme.palette.warning.main,
      cancelled: theme.palette.text.secondary,
      authorized: theme.palette.text.secondary,
      charged_back: theme.palette.text.secondary,
      in_process: theme.palette.text.secondary,
      in_mediation: theme.palette.text.secondary,
      refunded: theme.palette.text.secondary,
      rejected: theme.palette.text.secondary,
    }[order.status || '']
  }, [order.status])

  return {
    statusLabel,
    statusColor,
    statusTooltip,
    iconButtonColor,
    iconTruckColor,
  }
}
