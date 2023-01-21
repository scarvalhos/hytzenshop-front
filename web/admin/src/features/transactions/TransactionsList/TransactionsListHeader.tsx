import * as React from 'react'

import { MpPaymentResponse } from '@hytzenshop/types'
import { Button, Loader } from '@luma/ui'
import { TbDownload } from 'react-icons/tb'
import { date } from '@hytzenshop/helpers'

import exportFromJSON from 'export-from-json'

interface TransactionsListHeaderProps {
  loading?: boolean
  transactions?: MpPaymentResponse[]
}

const TransactionsListHeader: React.FC<TransactionsListHeaderProps> = ({
  loading,
  transactions,
}) => {
  return (
    <div className="sticky top-20 mb-8 z-40 bg">
      <h1 className="text-primary py-2 bg font-semibold text-2xl">
        Transações
      </h1>

      <div className="bg-primary space-y-2 px-6 py-4 rounded-md">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-2">
            <Button
              variant="outlined"
              rounded
              className="sm:relative sm:pl-10 max-sm:p-2.5"
              onClick={() =>
                exportFromJSON({
                  data: transactions || [],
                  fileName: `users-${date(new Date().toString())}`.replaceAll(
                    '_',
                    '-'
                  ),
                  exportType: exportFromJSON.types.json,
                })
              }
            >
              <TbDownload className="sm:absolute sm:left-4" />
              <span className="max-sm:hidden">Exportar</span>
            </Button>

            {loading && <Loader className="text-success-300" />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsListHeader
