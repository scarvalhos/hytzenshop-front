import * as React from 'react'

import { MpPaymentResponse } from '@hytzenshop/types'
import { c, date, money } from '@hytzenshop/helpers'

interface TransactionsListProps {
  transactions: MpPaymentResponse[]
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
}) => {
  const statusColor = {
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
  }

  const statusLabel = {
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
  }

  const statusBeforeColor = {
    pending: 'before:bg-warning-300',
    approved: 'before:bg-success-300',
    processing: 'before:bg-light-gray-500',
    sending: 'before:bg-primary-300',
    delivered: 'before:bg-success-300',
    cancelled: 'before:bg-danger-300',
    authorized: 'before:bg-success-300',
    in_process: 'before:bg-primary-300',
    rejected: 'before:bg-danger-300',
    refunded: 'before:bg-danger-300',
    charged_back: 'before:bg-dark-gray-100',
    in_mediation: 'before:bg-dark-gray-100',
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction?.id}
          className={c(
            "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative rounded-md bg-dark-gray-500 bg-opacity-70 hover:bg-opacity-100 px-6 py-4 cursor-pointer before:content-[''] before:rounded-l-2xl before:w-1 before:h-[100%] before:absolute before:bottom-0 before:left-0 transition-all",
            statusBeforeColor[transaction.status as never]
          )}
        >
          <div>
            <p>ID</p>
            <p className="text-light-gray-100">{transaction.id}</p>
          </div>

          <div>
            <p>Data</p>
            <p className="text-light-gray-100">
              {date(transaction?.date_created, { withHour: true })}
            </p>
          </div>

          <div>
            <p>Valor</p>
            <p className="text-light-gray-100">
              {money(transaction?.transaction_amount)}
            </p>
          </div>

          <div>
            <p>Status</p>
            <p
              className={c(
                statusColor[transaction.status as never],
                'flex flex-row items-center justify-center w-fit text-xs font-semibold text-light-gray-100 select-none px-2 py-1 space-x-2 rounded-full'
              )}
            >
              {statusLabel[transaction.status as never]}
            </p>
          </div>

          <div>
            <p>Cliente</p>
            <p className="break-words text-light-gray-100">
              {transaction?.payer?.email}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TransactionsList
