import { Button, Icons } from '@luma/ui'
import { NextPage } from 'next'
import { useAuth } from '@contexts/AuthContext'
import { NextSeo } from 'next-seo'
import { c } from '@hytzenshop/helpers'

import CustomerServiceLayout from '@features/customerservice/CustomerServiceLayout/CustomerServiceLayout'
import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import React from 'react'

const CustomerServicePage: NextPage = () => {
  const { user } = useAuth()

  return (
    <HeaderFooterLayout glassEffect={false}>
      <NextSeo title="Central de atendimento ao cliente" />

      <CustomerServiceLayout>
        <div className="w-full flex max-sm:flex-col-reverse items-center justify-between gap-8 max-w-screen-lg">
          <div className="flex flex-col max-w-lg">
            <p className="text-light-gray-100 text-3xl font-semibold">
              Central de atendimento ao cliente
            </p>

            <p className="my-6">
              {`Seja bem-vindo(a) à central de atendimento ao cliente. Aqui você
        poderá tirar todas as suas dúvidas, dar feedback's, solicitar trocas e devoluções e muito mais.`}
            </p>

            <div className="flex flex-col sm:flex-row items-center max-sm:space-y-2 sm:space-x-2 max-sm:w-full">
              {!user ? (
                <Button
                  href={`/auth?backTo=${encodeURI('/customer-service')}`}
                  variant="filled"
                  className="flex-nowrap max-sm:w-full max-sm:mt-2"
                  rounded
                >
                  Login/Cadastro
                </Button>
              ) : (
                <>
                  <Button
                    href="/customer-service/request-service"
                    variant="filled"
                    rounded
                    className={c('w-full sm:w-fit')}
                  >
                    Entrar em contato
                  </Button>
                  <Button
                    href="/customer-service/list-requets-services"
                    variant="outlined"
                    rounded
                    className={c('w-full sm:w-fit')}
                  >
                    Ver chamados
                  </Button>
                </>
              )}
            </div>
          </div>

          <Icons.CallCenterIcon className="w-[50vw] h-fit" />
        </div>
      </CustomerServiceLayout>
    </HeaderFooterLayout>
  )
}

export default CustomerServicePage
