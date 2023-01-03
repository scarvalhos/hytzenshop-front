import React from 'react'

interface CustomerServiceLayoutProps {
  children: React.ReactNode
  breadCrumbs?: React.FC
}

const CustomerServiceLayout: React.FC<CustomerServiceLayoutProps> = ({
  children,
  breadCrumbs: BreadCrumbs,
}) => {
  return (
    <div className="relative flex items-center justify-center my-20 mx-8 sm:max-w-screen-xl xl:mx-auto min-h-[60vh]">
      <div className="absolute top-0 left-0">
        {BreadCrumbs && <BreadCrumbs />}
      </div>

      {children}
    </div>
  )
}

export default CustomerServiceLayout
