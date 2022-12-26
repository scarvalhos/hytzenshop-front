import React from 'react'

import { Order } from '@hytzenshop/types'

export const useOrder = (order: Order) => {
  const statusLabel = React.useMemo(() => {
    return {
      pending: 'Pendente',
      approved: 'Pagamento aprovado',
      processing: 'Processando',
      sending: 'Enviando',
      delivered: 'Entregue',
      cancelled: 'Cancelado',
      authorized: 'Autorizado',
      in_process: 'Processando',
      rejected: 'Recusado',
      refunded: 'Devolvido',
      charged_back: 'Cobrado de volta',
      in_mediation: 'Em mediação',
    }[order?.status || '']
  }, [order?.status])

  const statusColor = React.useMemo(() => {
    return {
      pending: 'bg-warning-400',
      approved: 'bg-success-400',
      processing: 'bg-light-gray-500',
      sending: 'bg-primary-300',
      delivered: 'bg-success-400',
      cancelled: 'bg-danger-300',

      authorized: 'bg-success-400',
      in_process: 'bg-primary-300',
      rejected: 'bg-danger-300',
      refunded: 'bg-danger-300',
      charged_back: 'bg-dark-gray-100',
      in_mediation: 'bg-dark-gray-100',
    }[order?.status || '']
  }, [order?.status])

  const statusTooltip = React.useMemo(() => {
    return {
      pending: 'Aguardando pagamento.',
      approved: 'Pagamento aprovado! Em breve estaremos preparando seu pedido.',
      processing: 'Estamos preparando seu pedido.',
      sending: 'Seu pedido foi envido.',
      delivered: 'Seu pedido foi entregue.',
      cancelled: 'Pedido cancelado',
      authorized: 'Autorizado',
      charged_back: 'Cobrado de volta',
      in_process: 'Processando',
      rejected: 'Recusado',
      refunded: 'Devolvido',
      in_mediation: 'Em mediação',
    }[order?.status || '']
  }, [order?.status])

  return {
    statusLabel,
    statusColor,
    statusTooltip,
  }
}
