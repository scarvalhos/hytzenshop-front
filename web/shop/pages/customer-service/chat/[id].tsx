import { TbArrowLeft, TbHome, TbMessage2 } from 'react-icons/tb'
import { RequestsServicesList } from '@features/customerservice/RequestsServicesList'
import { useBreakpoint } from '@hytzenshop/hooks'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { BreadCrumbs } from '@luma/ui'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import CustomerServiceLayout from '@features/customerservice/CustomerServiceLayout/CustomerServiceLayout'
import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import React from 'react'
import Chat from '@features/customerservice/Chat/Chat'

interface ChatCustomerServicePageProps {
  chatId: string
}

const ChatCustomerServicePage: NextPage<ChatCustomerServicePageProps> = ({
  chatId,
}) => {
  const { lg } = useBreakpoint()

  const withRequestsServicesList = (children: React.ReactNode) => {
    if (lg) return <RequestsServicesList>{children}</RequestsServicesList>

    return children
  }
  return (
    <HeaderFooterLayout glassEffect={false}>
      <NextSeo title="Central de atendimento ao cliente" />

      <CustomerServiceLayout
        breadCrumbs={() => (
          <BreadCrumbs
            links={
              lg
                ? [
                    {
                      title: 'Início',
                      href: '/customer-service',
                      icon: TbHome,
                    },
                    {
                      title: 'Chamados',
                      href: '/customer-service/list',
                      icon: TbMessage2,
                    },
                  ]
                : [
                    {
                      title: 'Voltar',
                      href: '/customer-service/list',
                      icon: TbArrowLeft,
                    },
                  ]
            }
          />
        )}
      >
        {withRequestsServicesList(<Chat id={chatId} />)}
      </CustomerServiceLayout>
    </HeaderFooterLayout>
  )
}

export default ChatCustomerServicePage

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {
        chatId: ctx.params?.id,
      },
    }
  },
  {
    mustBeAuthenticated: true,
  }
)
