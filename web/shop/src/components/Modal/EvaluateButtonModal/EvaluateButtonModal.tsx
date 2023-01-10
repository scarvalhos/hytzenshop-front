import BaseModal from '../BaseModal/BaseModal'
import React from 'react'

import { c, generateArrayOfNumbers } from '@hytzenshop/helpers'
import { useEvaluateButtonModal } from './EvaluateButtonModal.hook'
import { Order, Product } from '@hytzenshop/types'
import { Button, Input } from '@luma/ui'
import { TbCircleCheck } from 'react-icons/tb'
import { MdStar } from 'react-icons/md'

export interface EvaluateButtonModalProps {
  product?: Product
  order: Order
}

const EvaluateButtonModal: React.FC<EvaluateButtonModalProps> = ({
  order,
  product,
}) => {
  const {
    control,
    handleSubmit,
    loading,
    onSubmit,
    open,
    register,
    setNote,
    setOpen,
    success,
    note,
  } = useEvaluateButtonModal({
    order,
    product,
  })

  return (
    <>
      <Button
        variant="filled"
        className="sm:relative sm:pl-10 bg-light-gray-200"
        onClick={() => setOpen(true)}
        rounded
      >
        <span className="flex justify-center items-center space-x-2">
          <MdStar
            size={20}
            className="sm:absolute sm:left-4 text-warning-300"
          />
          <p className="text-light-gray-500">Avaliar</p>
        </span>
      </Button>

      <BaseModal
        open={open}
        panelClassName={c('backdrop-blur-[90px] max-h-[80vh] overflow-hidden')}
        onClose={() => setOpen(false)}
        renderActions={() => (
          <div
            className={c(
              'flex flex-1',
              success ? 'justify-center' : 'justify-end'
            )}
          >
            {success ? (
              <Button
                variant="filled"
                rounded
                className="max-sm:w-full"
                onClick={() => setOpen(false)}
              >
                Voltar
              </Button>
            ) : (
              <Button
                variant="filled"
                rounded
                className="max-sm:w-full"
                onClick={handleSubmit(onSubmit)}
                loading={loading}
              >
                Enviar avaliação
              </Button>
            )}
          </div>
        )}
        glassEffect={false}
      >
        <>
          {success ? (
            <div className="flex justify-center items-center flex-col">
              <TbCircleCheck className="text-success-300" size={72} />
              <h2 className="text-light-gray-100 text-2xl font-semibold">
                Avaliação enviada com sucesso
              </h2>
              <p className="text-center">
                Muito obrigado pelo seu feedback. Estamos sempre em busca de
                melhorar nossa qualidade nos produtos e atendimento.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h2 className="text-light-gray-100 text-2xl font-semibold">
                  Avalie o produto
                </h2>
                <p>{product?.title}</p>
              </div>

              <div className="my-4">
                <p className="text-light-gray-100">Quantidade de estrelas</p>
                <div className="flex flex-row items-center space-x-1">
                  {generateArrayOfNumbers(1, 6).map((n) => (
                    <button
                      key={n}
                      onClick={() => setNote(n)}
                      className="p-1 rounded-full text-light-gray-100"
                    >
                      <MdStar
                        size={24}
                        className={c(
                          note >= n ? 'text-warning-300' : 'text-dark-gray-500'
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="my-4 space-y-2">
                <Input.Field
                  type="text"
                  label="Nome"
                  variant="filled"
                  control={control}
                  {...register('name')}
                  isFullWidth
                />

                <Input.Textarea
                  label="Deixe um comentário (Opcional)"
                  placeholder="Escreva o que você achou do produto..."
                  variant="filled"
                  rows={4}
                  control={control}
                  {...register('comment')}
                  isFullWidth
                />
              </div>

              <div className="bg-warning-400 bg-opacity-10 text-warning-300 my-4 p-4 space-y-1 rounded-md">
                • Sua avaliação está sujeita à aprovação por nossa equipe.
                <br />
                • Seus dados não serão divulgados.
                <br />• Não publicaremos termos ofensivos ou de baixo calão.
              </div>
            </>
          )}
        </>
      </BaseModal>
    </>
  )
}

export default EvaluateButtonModal
