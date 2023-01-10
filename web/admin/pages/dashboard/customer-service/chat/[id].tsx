import { RequestsServicesList } from '@features/customerservice/RequestsServicesList'
import { useBreakpoint } from '@hytzenshop/hooks'
import { TbArrowLeft } from 'react-icons/tb'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { BreadCrumbs } from '@luma/ui'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import SiderbarLayout from '@layouts/SiderbarLayout'
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
    <>
      <NextSeo title="Central de atendimento ao cliente" />

      {!lg && (
        <BreadCrumbs
          links={[
            {
              title: 'Voltar',
              href: '/dashboard/customer-service',
              icon: TbArrowLeft,
            },
          ]}
        />
      )}

      {withRequestsServicesList(<Chat id={chatId} />)}
    </>
  )
}

export default ChatCustomerServicePage

// @ts-expect-error layout
ChatCustomerServicePage.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {
        chatId: ctx.params?.id,
      },
    }
  },
  {
    isAdmin: true,
  }
)
