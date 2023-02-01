import * as React from 'react'

import { useBreakpoint } from '@hytzenshop/hooks'
import { c, numonly } from '@hytzenshop/helpers'
import { Link } from '@luma/ui'

import {
  TbArrowUp,
  TbBrandInstagram,
  TbBrandWhatsapp,
  TbMail,
  TbPhone,
} from 'react-icons/tb'

const Footer: React.FC = () => {
  const [scroll, setScroll] = React.useState({
    position: 0,
  })

  const { sm } = useBreakpoint()

  const handleScroll = React.useCallback(() => {
    const scrollTopPosition = document.documentElement.scrollTop

    setScroll({
      position: scrollTopPosition,
    })
  }, [])

  const link = React.useMemo(
    () =>
      `https://api.whatsapp.com/send?phone=${numonly(
        '27999021768'
      )}&text=Ol%C3%A1%2C%20Hytzen!%20`,
    []
  )

  React.useEffect(() => {
    window.onscroll = () => handleScroll()
  }, [handleScroll])

  return (
    <footer
      className={c(
        'border-t border-light-gray-400 border-opacity-10 bg-primary shadow-lg'
      )}
    >
      <div
        className={c(
          'max-w-screen-2xl mx-auto gap-8 flex px-8 sm:px-16 py-10',
          sm ? 'flex-row' : 'flex-col'
        )}
      >
        <div
          className={c(
            'flex flex-col items-start justify space-y-4',
            !sm ? 'w-[100%]' : 'w-[20%]'
          )}
        >
          <Link href="/" passHref>
            <div className="flex flex-row">
              <p className="text-light-gray-100 text-2xl">
                <strong className="text-success-300 text-2xl font-bold">
                  Hytzen
                </strong>
                Shop
              </p>
            </div>
            <p className="text-light-gray-400 text-base">
              © Todos os direitos reservados
            </p>
          </Link>

          <div className="flex flex-col">
            <p className="text-light-gray-500 text-base">CNPJ:</p>
            <p className="text-light-gray-500 text-base">19.966.672/0001-84</p>
          </div>

          <div className="flex flex-col">
            <p className="text-light-gray-500 text-base">Endereço:</p>
            <p className="text-light-gray-500 text-base">
              Av. Coronel Mateus Cunha, 513. <br /> Sernamby - São Mateus/ER.
              <br />
              29930-510.
            </p>
          </div>
        </div>

        <div
          className={c(
            'flex items-start justify-start',
            !sm ? 'flex-col w-[100%] gap-4' : 'flex-row [50%] gap-12'
          )}
        >
          <div className="flex flex-col space-y-4">
            <p className="text-light-gray-100 text-lg font-semibold">
              Informações
            </p>

            <div className="flex flex-col space-y-2">
              <Link
                href="/infos/privacy-policy"
                className="text-light-gray-500 text-base"
              >
                Política de privacidade
              </Link>
              <Link
                href="/infos/refund-policy"
                className="text-light-gray-500 text-base"
              >
                Política de reembolso
              </Link>
              <Link
                href="/infos/terms-conditions"
                className="text-light-gray-500 text-base"
              >
                Termos e condições
              </Link>
            </div>

            <p className="text-light-gray-100 text-lg font-semibold">
              Atendimento ao cliente
            </p>
            <div className="flex flex-col space-y-2">
              <Link
                href="/customer-service?subject=devolution"
                className="text-light-gray-500 text-base"
              >
                Devolução
              </Link>
              <Link
                href="/customer-service"
                className="text-light-gray-500 text-base"
              >
                Contate-nos
              </Link>
              <Link
                href="/customer-service?subject=feedback"
                className="text-light-gray-500 text-base"
              >
                Feedback
              </Link>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <p className="text-light-gray-100 text-lg font-semibold">
              Encontre-nos
            </p>

            <div className="flex flex-col space-y-2 items-start justify-start">
              <div className="flex flex-row space-y-2 items-center justify-center">
                <Link
                  href="https://www.instagram.com/hytzenshop/"
                  className="flex flex-row items-center justify-center space-x-2"
                >
                  <span className="bg-secondary p-2 rounded-full">
                    <TbBrandInstagram className="text-success-300" />
                  </span>

                  <p className="text-light-gray-500 text-base">@hytzenshop</p>
                </Link>
              </div>

              <div className="flex flex-row space-y-2 items-center justify-center">
                <Link
                  href="https://api.whatsapp.com/send?phone=64986847824"
                  className="flex flex-row items-center justify-center space-x-2"
                >
                  <span className="bg-secondary p-2 rounded-full">
                    <TbBrandWhatsapp className="text-success-300" />
                  </span>

                  <p className="text-light-gray-500 text-base">
                    (64) 98684-7824
                  </p>
                </Link>
              </div>

              <div className="flex flex-row space-y-2 items-center justify-center">
                <Link
                  href="https://api.whatsapp.com/send?phone=64986847824"
                  className="flex flex-row items-center justify-center space-x-2"
                >
                  <span className="bg-secondary p-2 rounded-full">
                    <TbPhone className="text-success-300" />
                  </span>

                  <p className="text-light-gray-500 text-base">
                    (64) 2689-9079
                  </p>
                </Link>
              </div>

              <div className="flex flex-row space-y-2 items-center justify-center">
                <Link
                  href="mailto:contato@hytzen.com"
                  className="flex flex-row items-center justify-center space-x-2"
                  target="_blank"
                >
                  <span className="bg-secondary p-2 rounded-full">
                    <TbMail className="text-success-300" />
                  </span>

                  <p className="text-light-gray-500 text-base">
                    contato@hytzen.com
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {scroll.position >= 500 && (
          <button
            className="bg-secondary drop-shadow-lg fixed bottom-8 right-[4.5rem] sm:right-[6.5rem] p-2 rounded-md z-[9999999] transition-all"
            onClick={() => {
              document.documentElement.scrollTop = 0
            }}
          >
            <TbArrowUp />
          </button>
        )}

        <Link
          href={link}
          target="_blank"
          className={c(
            'fixed bottom-8 right-8 sm:right-16 drop-shadow-lg bg-success-300 p-2 rounded-md'
          )}
        >
          <TbBrandWhatsapp className="text-light-gray-100" size={16} />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
