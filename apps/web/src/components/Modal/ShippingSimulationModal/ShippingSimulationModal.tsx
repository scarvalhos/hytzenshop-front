import BaseModal, { BaseModalProps } from '../BaseModal/BaseModal'
import React from 'react'

import { CepResponse, ShippingSimulationResponse } from '@hytzenshop/types'
import { c, date, money } from '@hytzenshop/helpers'
import { BrasilAPI } from 'brasilapi'
import { TbLoader } from 'react-icons/tb'
import { api } from '@hytzenshop/services'
import Image from 'next/image'

export interface ShippingSimulationModalProps extends BaseModalProps {
  cep: string
}

const brasilapi = new BrasilAPI()

const ShippingSimulationModal: React.FC<ShippingSimulationModalProps> = ({
  open,
  panelClassName,
  onClose,
  renderActions,
  cep,
  ...props
}) => {
  const [shippingCompanies, setShippingCompanies] = React.useState<
    ShippingSimulationResponse[]
  >([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [cepDetails, setCepDetails] = React.useState<CepResponse | null>()

  const fetchShipping = React.useCallback(async () => {
    return api
      .post<ShippingSimulationResponse[]>('/shipping/simulation', {
        cepOrigem: process.env.NEXT_PUBLIC_CEP_ORIGIN,
        cepDestino: cep.replaceAll('-', ''),
        produtos: [
          {
            peso: 0.3,
            altura: 15,
            largura: 11,
            comprimento: 20,
            tipo: 'C',
            valor: 30.5,
            quantidade: 1,
          },
        ],
        servicos: ['E', 'X'],
        ordenar: 'preco',
      })
      .then(({ data }) => data)
  }, [cep])

  const searchCep = React.useCallback(async () => {
    try {
      return brasilapi.cep(cep).then((data) => setCepDetails(data))
    } catch (error) {
      console.error(error)
    }
  }, [cep])

  React.useEffect(() => {
    setIsLoading(true)

    if (open) {
      fetchShipping().then((data) => {
        setShippingCompanies(data)
        setIsLoading(false)
      })
    }
  }, [fetchShipping, open])

  React.useEffect(() => {
    if (cep.length === 9) searchCep()
  }, [searchCep, cep])

  return (
    <BaseModal
      open={open}
      panelClassName={c(
        'backdrop-blur-[90px] max-h-[80vh] overflow-hidden',
        panelClassName
      )}
      onClose={onClose}
      renderActions={renderActions}
      {...props}
    >
      <>
        <h2 className="text-2xl text-light-gray-100 font-semibold">
          Simular frete
        </h2>
        <p>
          Para o CEP <strong className="text-success-300">{cep}</strong> |{' '}
          {cepDetails?.city}, {cepDetails?.state}
        </p>

        <div className="my-6 border border-light-gray-500 border-opacity-30 rounded-md max-h-[50vh] overflow-auto">
          <div className="sm:border-b border-light-gray-500 border-opacity-30 px-6 py-4 flex flex-row max-sm:hidden">
            <p className="basis-2/3 px-2">Tipo</p>
            <p className="basis-1/3 px-2">Prazo</p>
            <p className="basis-0/3 px-2">Valor</p>
          </div>

          <div className="px-6 py-4 flex flex-col space-y-2">
            {isLoading
              ? [1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={c(
                      'w-full h-14 bg-dark-gray-400 bg-opacity-30 animate-pulse flex flex-col sm:flex-row sm:items-center rounded-md max-sm:space-y-1 px-4 py-3 cursor-pointer'
                    )}
                  />
                ))
              : shippingCompanies?.map((item) => (
                  <span
                    key={item.transp_nome}
                    className={c(
                      'w-full flex flex-col sm:flex-row sm:items-center rounded-md max-sm:space-y-1 border border-light-gray-500 border-opacity-30 hover:border-success-300 hover:border-opacity-100 px-4 py-3'
                    )}
                  >
                    {item.url_logo ? (
                      <div className="relative w-8 h-8 mr-2 max-sm:mb-2 rounded-sm basis-1/6">
                        <Image
                          src={item.url_logo}
                          alt={item.transp_nome}
                          sizes="100%"
                          fill
                          className="object-cover object-center rounded-sm"
                        />
                      </div>
                    ) : (
                      <div className="p-3 rounded-sm bg-dark-gray-400 animate-pulse">
                        <TbLoader className="text-dark-gray-400" />
                      </div>
                    )}

                    <p className="basis-2/3 sm:px-2 text-left select-none">
                      <span className="sm:hidden">Tipo: </span>
                      {item.transp_nome} - até {item.prazoEnt} dias
                    </p>

                    <p className="basis-1/3 sm:px-2 text-left select-none">
                      <span className="sm:hidden">Prazo: </span>
                      {date(item.dtPrevEnt)}
                    </p>

                    <p className="basis-0/3 sm:px-2 text-left select-none">
                      <span className="sm:hidden">Valor: </span>
                      {money(item.vlrFrete)}
                    </p>
                  </span>
                ))}
          </div>
        </div>

        <p className="text-sm md:max-w-sm">
          Prazo de entrega a partir da aprovação de pagamento e envio ao
          operador logístico.
        </p>
      </>
    </BaseModal>
  )
}

export default ShippingSimulationModal
