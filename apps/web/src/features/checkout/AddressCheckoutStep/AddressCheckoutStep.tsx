import React from 'react'

import { CepResponse, ShippingSimulationResponse } from '@hytzenshop/types'
import { CheckoutFluxLayout } from '@layouts/CheckoutFluxLayout'
import { c, date, money } from '@hytzenshop/helpers'
import { TbLoader } from 'react-icons/tb'
import { useAuth } from '@contexts/AuthContext'
import { useCart } from '@contexts/CartContext'
import { Loader } from '@luma/ui'
import { Image } from '@core'
import { api } from '@hytzenshop/services'

interface AddressCheckoutStepProps {
  isReadonly?: boolean
  summaryButtonTitle?: string
  checkoutNextStep?: () => void
}

const AddressCheckoutStep: React.FC<AddressCheckoutStepProps> = ({
  checkoutNextStep,
  summaryButtonTitle,
}) => {
  const [cepDetails, setCepDetails] = React.useState<CepResponse | null>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [shippingCompanies, setShippingCompanies] = React.useState<
    ShippingSimulationResponse[]
  >([])

  const { user } = useAuth()
  const { shipping, setShipping, totalAmount, cart } = useCart()

  const fetchShipping = React.useCallback(async () => {
    setIsLoading(true)

    const products = cart.products.map((p) => {
      return {
        peso: 0.3,
        quantidade: p.quantity,
      }
    })

    const volumes = [
      {
        peso: products
          .map((p) => {
            return p.peso * (p.quantidade || 1)
          })
          .reduce((a, b) => {
            return a + b
          }, 0),
        altura: 15,
        largura: 11,
        comprimento: 20,
        tipo: 'C',
        valor: totalAmount,
        quantidade: Math.ceil(products.length / 4),
      },
    ]

    return api
      .post<ShippingSimulationResponse[]>('/shipping/simulation', {
        cepOrigem: process.env.NEXT_PUBLIC_CEP_ORIGIN,
        cepDestino: user?.profile?.address?.cep.replaceAll('-', ''),
        servicos: ['E', 'X'],
        ordenar: 'preco',
        volumes,
      })
      .then(({ data }) => data)
  }, [cart.products, user?.profile?.address?.cep, totalAmount])

  const searchCep = React.useCallback(async () => {
    return api
      .get<CepResponse>(
        `/cep/search?cep=${user?.profile?.address?.cep.replaceAll('-', '')}`
      )
      .then(({ data }) => setCepDetails(data))
  }, [user?.profile?.address?.cep])

  React.useEffect(() => {
    searchCep()
    fetchShipping().then((data) => {
      setShippingCompanies(data)
      setIsLoading(false)
    })
  }, [fetchShipping, searchCep])

  return (
    <CheckoutFluxLayout
      checkoutNextStep={checkoutNextStep}
      summaryButtonTitle={summaryButtonTitle}
    >
      <div className="rounded-md px-8 py-8 bg-dark-gray-500 bg-opacity-30">
        <span className="flex flex-row items-center space-x-2">
          <h2 className="text-xl text-light-gray-100 font-medium">
            Selecione o frete{' '}
            <span className="text-sm text-light-gray-500">
              | CEP{' '}
              <strong className="text-success-300">
                {user?.profile?.address?.cep}
              </strong>{' '}
              - {cepDetails?.localidade}, {cepDetails?.uf}
            </span>
          </h2>

          {isLoading ? <Loader className="relative" /> : null}
        </span>

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
                      'w-full flex flex-col sm:flex-row sm:items-center rounded-md max-sm:space-y-1 border px-4 py-3 cursor-pointer',
                      item.transp_nome === shipping?.transp_nome
                        ? 'border-success-300 border-opacity-100'
                        : 'border-light-gray-500 border-opacity-30'
                    )}
                    onClick={() => setShipping && setShipping(item)}
                  >
                    {item.url_logo ? (
                      <Image
                        src={item.url_logo}
                        alt={item.transp_nome}
                        className="w-8 h-8 mr-2 max-sm:mb-2 rounded-sm"
                      />
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
      </div>
    </CheckoutFluxLayout>
  )
}

export default AddressCheckoutStep
