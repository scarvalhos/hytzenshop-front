import * as Input from '@core/Input'
import * as React from 'react'
import * as Modal from '@core/Modal'

import { useNewProductForm } from './useNewProductForm.hook'
import { useConfigTypes } from '@utils/types/config'
import { useBreakpoint } from '@hytzenshop/hooks'
import { sizesOptions } from '@hytzenshop/types'
import { Button } from '@luma/ui'
import { c } from '@hytzenshop/helpers'

export const NewProductForm: React.FC = () => {
  const { categoriesOptions } = useConfigTypes()
  const { sm } = useBreakpoint()

  const {
    control,
    errors,
    setValue,
    handleSubmit,
    register,
    openSuccessModal,
    onCloseSuccessModal,
    onDismissModal,
    onSubmit,
    onCancel,
    clearErrors,
  } = useNewProductForm()

  return (
    <>
      <Modal.SuccessModal
        open={openSuccessModal}
        handleClose={onCloseSuccessModal}
        title="Produto adicionado com sucesso!"
        description="O que deseja fazer agora?"
        onDismiss={onDismissModal}
        onClose={() => onCloseSuccessModal(true)}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-8 space-y-4">
          <p
            id="modal-modal-title"
            className="text-light-gray-100 text-2xl font-semibold mb-6"
          >
            Novo produto
          </p>
          <div className="flex flex-col sm:flex-row max-sm:space-y-2 sm:space-x-2">
            <Input.Field
              type="text"
              label="Título do produto"
              placeholder="Título do produto"
              control={control}
              error={String(errors.title?.message || '')}
              isFullWidth
              {...register('title')}
            />

            <Input.Field
              type="money"
              label="Preço"
              control={control}
              error={String(errors.price?.message || '')}
              isFullWidth
              {...register('price')}
            />
          </div>

          <Input.Textarea
            label="Descrição"
            control={control}
            placeholder="Descrição do produto"
            error={String(errors.description?.message || '')}
            isFullWidth
            variant="filled"
            rows={4}
            {...register('description')}
          />

          <div className="flex flex-col sm:flex-row max-sm:space-y-2 sm:space-x-2">
            <Input.Field
              type="number"
              label="Estoque"
              control={control}
              error={String(errors.stock?.message || '')}
              isFullWidth
              {...register('stock')}
            />

            <Input.Select.Add
              label="Cores disponíveis"
              error={String(errors.colors?.message || '')}
              placeholder="Adicione as cores disponíveis"
              control={control}
              setValue={setValue}
              defaultValue={[]}
              clearErrors={clearErrors}
              chipVariant="filled"
              variant="filled"
              isFullWidth
              {...register('colors')}
            />
          </div>

          <div className="flex flex-col sm:flex-row max-sm:space-y-2 sm:space-x-2">
            <Input.Select.Multiple
              label="Categorias"
              options={categoriesOptions}
              defaultValue="Selecione..."
              control={control}
              setValue={setValue}
              error={String(errors.categories?.message || '')}
              clearErrors={clearErrors}
              isFullWidth
              {...register('categories')}
            />

            <Input.Select.Multiple
              label="Tamanhos disponíveis"
              options={sizesOptions}
              defaultValue="Selecione"
              control={control}
              setValue={setValue}
              error={String(errors.sizes?.message || '')}
              clearErrors={clearErrors}
              isFullWidth
              {...register('sizes')}
            />
          </div>

          <Input.File
            label="Fotos do produto"
            control={control}
            setValue={setValue}
            error={String(errors.images?.message || '')}
            clearErrors={clearErrors}
            filesListDisplay="list"
            variant="filled"
            {...register('images')}
            isFullWidth
          />

          <div className="flex flex-col sm:flex-row pt-4 max-sm:space-y-2 sm:space-x-2 justify-end">
            <Button
              type="submit"
              variant="filled"
              className={c(!sm && 'w-full')}
              rounded
            >
              Criar produto
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={onCancel}
              className={c(!sm && 'w-full')}
              rounded
            >
              Cancelar
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
