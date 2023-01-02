import * as React from 'react'

import { c, defaultToastError, numonly } from '@hytzenshop/helpers'
import { FieldValues, useForm } from 'react-hook-form'
import { toast, Button } from '@luma/ui'
import { useBreakpoint } from '@hytzenshop/hooks'
import { Field } from '@components/Input'
import { Link } from '@core'
import { api } from '@hytzenshop/services'

import {
  TbArrowRight,
  TbArrowUp,
  TbBrandInstagram,
  TbBrandWhatsapp,
  TbMail,
  TbPhone,
} from 'react-icons/tb'

const Footer: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const [scroll, setScroll] = React.useState({
    position: 0,
  })

  const { sm } = useBreakpoint()

  async function handleOnSubmit(values: FieldValues) {
    return api
      .post('/newsletter', {
        email: values.newsletter,
      })
      .then(({ data }) => toast.success(data.message))
      .catch((e) => defaultToastError(e))
      .finally(() => reset({ newsletter: '' }, {}))
  }

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
    <div
      className={c(
        'gap-8 flex px-8 sm:px-16 py-10 mt-10 border-t border-light-gray-400 border-opacity-20 bg-dark-gray-500 bg-opacity-30',
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
            <p className="text-light-gray-100 text-lg">
              <strong className="text-success-300 text-lg font-bold">
                Hytzen
              </strong>
              Shop
            </p>
          </div>
          <p className="text-light-gray-400 text-sm">
            © Todos os direitos reservados
          </p>
        </Link>

        <div className="flex flex-col">
          <p className="text-light-gray-500 text-sm">CNPJ:</p>
          <p className="text-light-gray-300 text-sm">19.966.672/0001-84</p>
        </div>

        <div className="flex flex-col">
          <p className="text-light-gray-500 text-sm">Endereço:</p>
          <p className="text-light-gray-300 text-sm">
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
          <p className="text-light-gray-100 text-md font-semibold">
            Informações
          </p>

          <div className="flex flex-col space-y-2">
            <Link
              href="/infos/privacy-policy"
              className="text-light-gray-500 text-sm"
            >
              Política de privacidade
            </Link>
            <Link
              href="/infos/refund-policy"
              className="text-light-gray-500 text-sm"
            >
              Política de reembolso
            </Link>
            <Link
              href="/infos/terms-conditions"
              className="text-light-gray-500 text-sm"
            >
              Termos e condições
            </Link>
          </div>

          <p className="text-light-gray-100 text-md font-semibold">
            Atendimento ao cliente
          </p>
          <div className="flex flex-col space-y-2">
            <Link
              href="/contact?subject=devolution"
              className="text-light-gray-500 text-sm"
            >
              Devolução
            </Link>
            <Link href="/contact" className="text-light-gray-500 text-sm">
              Contate-nos
            </Link>
            <Link
              href="/contact?subject=feedback"
              className="text-light-gray-500 text-sm"
            >
              Feedback
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <p className="text-light-gray-100 text-md font-semibold">
            Encontre-nos
          </p>

          <div className="flex flex-col space-y-2 items-start justify-start">
            <div className="flex flex-row space-y-2 items-center justify-center">
              <Link
                href="https://www.instagram.com/hytzenshop/"
                className="flex flex-row items-center justify-center space-x-2"
              >
                <span className="bg-dark-gray-400 p-2 rounded-full">
                  <TbBrandInstagram className="text-success-300" />
                </span>

                <p className="text-light-gray-500 text-sm">@hytzenshop</p>
              </Link>
            </div>

            <div className="flex flex-row space-y-2 items-center justify-center">
              <Link
                href="https://api.whatsapp.com/send?phone=64986847824"
                className="flex flex-row items-center justify-center space-x-2"
              >
                <span className="bg-dark-gray-400 p-2 rounded-full">
                  <TbBrandWhatsapp className="text-success-300" />
                </span>

                <p className="text-light-gray-500 text-sm">(64) 98684-7824</p>
              </Link>
            </div>

            <div className="flex flex-row space-y-2 items-center justify-center">
              <Link
                href="https://api.whatsapp.com/send?phone=64986847824"
                className="flex flex-row items-center justify-center space-x-2"
              >
                <span className="bg-dark-gray-400 p-2 rounded-full">
                  <TbPhone className="text-success-300" />
                </span>

                <p className="text-light-gray-500 text-sm">(64) 2689-9079</p>
              </Link>
            </div>

            <div className="flex flex-row space-y-2 items-center justify-center">
              <Link
                href="mailto:contato@hytzen.com"
                className="flex flex-row items-center justify-center space-x-2"
                target="_blank"
              >
                <span className="bg-dark-gray-400 p-2 rounded-full">
                  <TbMail className="text-success-300" />
                </span>

                <p className="text-light-gray-500 text-sm">
                  contato@hytzen.com
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="max-w-sm max-sm:pb-10"
      >
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col space-y-2">
            <p className="text-light-gray-100 text-lg font-bold">
              Receba Novidades
            </p>
            <p className="text-light-gray-500 text-sm">
              Inscreva-se abaixo em nossa newsletter e receba novidades
              exclusivas em seu email:
            </p>
          </div>

          <Field
            type="email"
            control={control}
            error={errors.newsletter?.message?.toString()}
            isFullWidth={Boolean(!sm)}
            {...(sm && {
              renderAfter: (
                <Button
                  type="submit"
                  variant="filled"
                  className="p-3"
                  rounded={false}
                >
                  <TbArrowRight />
                </Button>
              ),
            })}
            {...register('newsletter')}
          />
          {!sm && (
            <Button
              type="submit"
              variant="filled"
              className="p-3 w-full"
              rounded={false}
            >
              Inscrever
            </Button>
          )}
        </div>
      </form>

      {scroll.position >= 500 && (
        <button
          className="bg-dark-gray-400 fixed bottom-8 right-[4.5rem] sm:right-[6.5rem] p-2 rounded-md z-[9999999] transition-all"
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
          'fixed bottom-8 right-8 sm:right-16 bg-success-300 p-2 rounded-md'
        )}
      >
        <TbBrandWhatsapp className="text-light-gray-100" size={16} />
      </Link>
    </div>
  )
}

export default Footer
