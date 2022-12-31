import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import React from 'react'

interface TestProps {
  name: string
}

const TestPage: NextPage<TestProps> = ({ name }) => {
  return (
    <HeaderFooterLayout glassEffect={false}>
      <NextSeo title="Test" />
      <div className="flex items-center justify-center h-[100vh] w-full">
        <p className="text-2xl">{name}</p>
      </div>
    </HeaderFooterLayout>
  )
}

export default TestPage

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {
        name: ctx.params?.name,
      },
    }
  },
  {
    mustBeAuthenticated: false,
  }
)
