import { useRouter } from 'next/router'
import { Link } from '@luma/ui'
import { c } from '@hytzenshop/helpers'

import React from 'react'

interface InfosLayoutProps {
  children: React.ReactNode
}

export const InfosLayout: React.FC<InfosLayoutProps> = React.forwardRef(
  ({ children }) => {
    const { pathname } = useRouter()
    return (
      <main className="flex flex-col md:flex-row">
        <div className="flex flex-col space-y-4 px-8 md:px-32 mt-20 mb-6 md:mb-20">
          <p className="text-light-gray-100 text-md font-semibold">
            Informações
          </p>

          <div className="flex flex-col">
            <Link
              href="/infos/privacy-policy"
              className={c('text-light-gray-500 text-sm relative py-3')}
            >
              <span
                className={c(
                  pathname === '/infos/privacy-policy'
                    ? "text-success-300 before:content-[''] before:rounded-t-sm before:w-[100%] before:h-[3px] before:bg-success-300 before:absolute before:bottom-0 before:left-0"
                    : 'text-light-gray-500'
                )}
              >
                Política de privacidade
              </span>
            </Link>
            <Link
              href="/infos/refund-policy"
              className={c('text-light-gray-500 text-sm relative py-3')}
            >
              <span
                className={c(
                  pathname === '/infos/refund-policy'
                    ? "text-success-300 before:content-[''] before:rounded-t-sm before:w-[100%] before:h-[3px] before:bg-success-300 before:absolute before:bottom-0 before:left-0"
                    : 'text-light-gray-500'
                )}
              >
                Política de reembolso
              </span>
            </Link>
            <Link
              href="/infos/terms-conditions"
              className={c('text-light-gray-500 text-sm relative py-3')}
            >
              <span
                className={c(
                  pathname === '/infos/terms-conditions'
                    ? "text-success-300 before:content-[''] before:rounded-t-sm before:w-[100%] before:h-[3px] before:bg-success-300 before:absolute before:bottom-0 before:left-0"
                    : 'text-light-gray-500'
                )}
              >
                Termos e condições
              </span>
            </Link>
          </div>
        </div>

        <section className="px-8 md:px-16 mt-6 md:mt-20 mb-20 max-w-screen-lg space-y-6">
          {children}
        </section>
      </main>
    )
  }
)
