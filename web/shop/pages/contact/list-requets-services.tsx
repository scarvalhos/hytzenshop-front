import { RequestsServicesList } from '@features/customerservice/RequestsServicesList'
import { TbHome, TbMessage2 } from 'react-icons/tb'
import { BreadCrumbs } from '@luma/ui'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import CustomerServiceLayout from '@features/customerservice/CustomerServiceLayout/CustomerServiceLayout'
import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import React from 'react'

const ListRequestServicePage: NextPage = () => {
  return (
    <HeaderFooterLayout glassEffect={false}>
      <NextSeo title="Contato" />

      <CustomerServiceLayout
        breadCrumbs={() => (
          <BreadCrumbs
            links={[
              { title: 'Home', href: '/contact', icon: TbHome },
              {
                title: 'Chamados',
                href: '/contact/list-request-services',
                icon: TbMessage2,
              },
            ]}
          />
        )}
      >
        <RequestsServicesList />
      </CustomerServiceLayout>
    </HeaderFooterLayout>
  )
}

export default ListRequestServicePage
