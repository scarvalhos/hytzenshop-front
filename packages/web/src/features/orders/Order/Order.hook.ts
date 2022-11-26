import React from 'react'

import { Order } from '@utils/types'

export const useOrder = (order: Order) => {
  const statusLabel = React.useMemo(() => {
    return {
      pending: 'Pendente',
      approved: 'Pagamento aprovado',
      processing: 'Processando',
      sending: 'Enviando',
      delivered: 'Entregue',
      canceled: 'Cancelado',
    }[order?.status || '']
  }, [order?.status])

  const statusColor = React.useMemo(() => {
    return {
      pending: 'bg-warning-300',
      approved: 'bg-warning-300',
      processing: 'bg-warning-300',
      sending: 'bg-warning-300',
      delivered: 'bg-success-300',
      canceled: 'bg-danger-300',
    }[order?.status || '']
  }, [order?.status])

  const statusTooltip = React.useMemo(() => {
    return {
      pending: 'Aguardando pagamento.',
      approved: 'Pagamento aprovado! Em breve estaremos preparando seu pedido.',
      processing: 'Estamos preparando seu pedido.',
      sending: 'Seu pedido foi envido.',
      delivered: 'Seu pedido foi entregue.',
      canceled: 'Pedido cancelado',
      authorized: 'Autorizado',
      charged_back: 'Cobrado de volta',
      cancelled: 'Cancelado',
      in_process: 'Em processamento',
      in_mediation: 'Em mediação',
      refunded: 'Devolvido',
      rejected: 'Rejeitado',
    }[order?.status || '']
  }, [order?.status])

  const iconButtonColor = React.useMemo(() => {
    return {
      pending: 'bg-dark-gray-300',
      approved: 'bg-dark-gray-300',
      processing: 'bg-dark-gray-300',
      sending: 'bg-success-300',
      delivered: 'bg-light-gray-100',
      canceled: 'bg-dark-gray-300',
    }[order?.status || '']
  }, [order?.status])

  const iconTruckColor = React.useMemo(() => {
    return {
      pending: 'text-light-gray-100',
      approved: 'text-light-gray-100',
      processing: 'text-light-gray-100',
      sending: 'text-light-gray-100',
      delivered: 'text-warning-300',
      canceled: 'text-light-gray-100',
    }[order?.status || '']
  }, [order?.status])

  return {
    statusLabel,
    statusColor,
    statusTooltip,
    iconButtonColor,
    iconTruckColor,
  }
}
