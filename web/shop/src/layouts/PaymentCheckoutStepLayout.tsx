import { Icons as Icon, Button, Input } from '@luma/ui'
import { TbCreditCard, TbFileBarcode } from 'react-icons/tb'
import { CartSummary } from '@features/cart/CartSummary'
import { RadioValue } from '@hytzenshop/types'
import { c } from '@hytzenshop/helpers'

import React from 'react'

export interface DataProps {
  status: string | number
  message?: string
}

interface PaymentCheckoutStepLayoutProps {
  loading: boolean
  children: React.ReactNode
  radioValue: RadioValue | ''
  handleSubmit: (e?: any) => Promise<void>
  setRadioValue: (value: React.SetStateAction<'' | RadioValue>) => void
}

const PaymentCheckoutStepLayout: React.FC<PaymentCheckoutStepLayoutProps> =
  React.forwardRef(
    ({ children, loading, radioValue, setRadioValue, handleSubmit }, ref) => {
      const Content = () => (
        <>
          <div className="flex flex-1 flex-col sm:flex-row relative mr-0 sm:mr-2 mb-2 sm:mb-0">
            <div className="flex flex-col space-y-2 flex-1">
              <label id="demo-controlled-radio-buttons-group" className="-mt-7">
                Escolha a forma de pagamento:
              </label>

              <div className="flex flex-col sm:flex-row max-sm:space-y-2 sm:space-x-2">
                <Input.Radio
                  name="CREDITO"
                  label="Cartão de crédito"
                  value="CREDITO"
                  checked={radioValue === 'CREDITO'}
                  onChange={setRadioValue}
                  highlightWhenSelected
                  icon={() => (
                    <TbCreditCard
                      size={18}
                      className={c(
                        radioValue === 'CREDITO'
                          ? 'text-success-300'
                          : 'text-light-gray-100'
                      )}
                    />
                  )}
                />

                <Input.Radio
                  name="BOLETO"
                  label="Boleto"
                  value="BOLETO"
                  checked={radioValue === 'BOLETO'}
                  onChange={setRadioValue}
                  highlightWhenSelected
                  icon={() => (
                    <TbFileBarcode
                      size={18}
                      className={c(
                        radioValue === 'BOLETO'
                          ? 'text-success-300'
                          : 'text-light-gray-100'
                      )}
                    />
                  )}
                />

                <Input.Radio
                  name="PIX"
                  label="Pix"
                  value="PIX"
                  checked={radioValue === 'PIX'}
                  onChange={setRadioValue}
                  highlightWhenSelected
                  icon={() => (
                    <Icon.PixIcon
                      className={c(
                        radioValue === 'PIX'
                          ? 'text-success-300'
                          : 'text-light-gray-100'
                      )}
                    />
                  )}
                />
              </div>

              {children}
            </div>
          </div>

          <CartSummary
            render={
              <Button
                type="submit"
                variant="filled"
                loading={loading}
                disabled={!radioValue}
                className="w-full"
                rounded
              >
                Finalizar compra
              </Button>
            }
          />
        </>
      )

      return (
        <>
          {radioValue === 'CREDITO' ? (
            <form
              ref={ref as any}
              id="form-checkout"
              name="form-checkout"
              className="flex flex-col sm:flex-row my-8 sm:my-16"
            >
              <Content />
            </form>
          ) : (
            <form
              ref={ref as any}
              id="form-checkout"
              name="form-checkout"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row my-8 sm:my-16"
            >
              <Content />
            </form>
          )}
        </>
      )
    }
  )

export default PaymentCheckoutStepLayout
