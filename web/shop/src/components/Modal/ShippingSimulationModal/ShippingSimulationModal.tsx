import { useShippingSimulationModal } from './ShippingSimulationModal.hook'
import { TbLoader, TbSearch } from 'react-icons/tb'
import { c, date, money } from '@hytzenshop/helpers'
import { Button, Input } from '@luma/ui'

import BaseModal from '../BaseModal/BaseModal'
import React from 'react'
import Image from 'next/image'

const ShippingSimulationModal: React.FC = () => {
  const {
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
  } = useShippingSimulationModal()

  return (
    <>
      <Input.Cep
        label="Calcular Frete"
        control={control}
        variant="outlined"
        containerClassName="col-start-1 col-end-4 md:col-end-2"
        isFullWidth
        renderAfter={
          <Button
            variant="filled"
            className="p-3"
            onClick={handleSubmit(onShippingSimulation)}
          >
            <TbSearch size={20} />
          </Button>
        }
        error={String(errors.frete?.message || '')}
        {...register('frete')}
      />

      <BaseModal
        open={shipping.showModal}
        panelClassName={c('backdrop-blur-[90px] max-h-[80vh] overflow-hidden')}
        onClose={() => setShipping({ ...shipping, showModal: false })}
      >
        <>
          <h2 className="text-2xl text-light-gray-100 font-semibold">
            Simular frete
          </h2>
          <p>
            Para o CEP{' '}
            <strong className="text-success-300">{shipping.cep}</strong> |{' '}
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
    </>
  )
}

export default ShippingSimulationModal
