import { TbArrowBackUp, TbMessage2 } from 'react-icons/tb'
import { RequestServiceForm } from '@features/customerservice/RequestServiceForm'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { BreadCrumbs } from '@luma/ui'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import CustomerServiceLayout from '@features/customerservice/CustomerServiceLayout/CustomerServiceLayout'
import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import React from 'react'

const RequestServicePage: NextPage = () => {
  return (
    <HeaderFooterLayout glassEffect={false}>
      <NextSeo title="Contato" />

      <CustomerServiceLayout
        breadCrumbs={() => (
          <BreadCrumbs
            links={[
              {
                title: 'Início',
                href: '/customer-service',
                icon: TbArrowBackUp,
              },
              {
                title: 'Entrar em contato',
                href: '/customer-service/request-service',
                icon: TbMessage2,
              },
            ]}
          />
        )}
      >
        <RequestServiceForm />
      </CustomerServiceLayout>
    </HeaderFooterLayout>
  )
}

export default RequestServicePage

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    }
  },
  {
    mustBeAuthenticated: true,
  }
)
