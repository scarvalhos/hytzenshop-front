import * as yup from 'yup'

import { CepResponse, ShippingSimulationResponse } from '@hytzenshop/types'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { BrasilAPI } from 'brasilapi'
import { api } from '@hytzenshop/services'

import React from 'react'

const validate = yup.object().shape({
  frete: yup.string().required('Digite seu CEP'),
})

const brasilapi = new BrasilAPI()

export const useShippingSimulationModal = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [cepDetails, setCepDetails] = React.useState<CepResponse | null>()

  const [shipping, setShipping] = React.useState({
    cep: '',
    showModal: false,
  })

  const [shippingCompanies, setShippingCompanies] = React.useState<
    ShippingSimulationResponse[]
  >([])

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validate),
  })

  const onShippingSimulation = React.useCallback((value: FieldValues) => {
    setShipping({
      cep: value.frete,
      showModal: true,
    })
  }, [])

  const searchCep = React.useCallback(async () => {
    try {
      return brasilapi.cep(shipping.cep).then((data) => setCepDetails(data))
    } catch (error) {
      console.error(error)
    }
  }, [shipping.cep])

  const fetchShipping = React.useCallback(async () => {
    return api
      .post<ShippingSimulationResponse[]>('/shipping/simulation', {
        cepOrigem: process.env.NEXT_PUBLIC_CEP_ORIGIN,
        cepDestino: shipping.cep.replaceAll('-', ''),
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
  }, [shipping.cep])

  React.useEffect(() => {
    if (shipping.cep.length === 9) searchCep()
  }, [searchCep, shipping.cep])

  React.useEffect(() => {
    setIsLoading(true)

    if (shipping.showModal) {
      fetchShipping().then((data) => {
        setShippingCompanies(data)
        setIsLoading(false)
      })
    }
  }, [fetchShipping, shipping.showModal])

  return {
    onShippingSimulation,
    shippingCompanies,
    handleSubmit,
    setShipping,
    cepDetails,
    isLoading,
    shipping,
    register,
    control,
    errors,
  }
}
