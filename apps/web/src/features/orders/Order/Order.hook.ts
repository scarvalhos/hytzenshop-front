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

  const iconButtonColor = React.useMemo(() => {
    return {
      pending: 'bg-dark-gray-300',
      approved: 'bg-dark-gray-300',
      processing: 'bg-dark-gray-300',
      sending: 'bg-success-300',
      delivered: 'bg-light-gray-100',
      cancelled: 'bg-dark-gray-300',
      authorized: 'bg-dark-gray-300',
      in_process: 'bg-dark-gray-300',
      rejected: 'bg-dark-gray-300',
      refunded: 'bg-dark-gray-300',
      charged_back: 'bg-dark-gray-300',
      in_mediation: 'bg-dark-gray-300',
    }[order?.status || '']
  }, [order?.status])

  const iconTruckColor = React.useMemo(() => {
    return {
      pending: 'text-light-gray-100',
      approved: 'text-light-gray-100',
      processing: 'text-light-gray-100',
      sending: 'text-light-gray-100',
      delivered: 'text-warning-300',
      cancelled: 'text-light-gray-100',
      authorized: 'Autorizado',
      in_process: 'text-light-gray-500',
      rejected: 'text-light-gray-500',
      refunded: 'text-light-gray-500',
      charged_back: 'text-light-gray-500',
      in_mediation: 'text-light-gray-500',
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
