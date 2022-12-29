import * as Input from '@core/Input'
import * as React from 'react'
import * as Modal from '@core/Modal'

import { DefaultValuesProps, useNewProductForm } from './useNewProductForm.hook'
import { Product, sizesOptions } from '@hytzenshop/types'
import { useConfigTypes } from '@utils/types/config'
import { useBreakpoint } from '@hytzenshop/hooks'
import { Button } from '@luma/ui'
import { c } from '@hytzenshop/helpers'

interface NewProductFormProps {
  type?: 'POST' | 'PUT'
  fieldsVariant?: 'bordeless' | 'filled' | 'outlined' | 'disabled'
  formClassName?: string
  defaultValues?: DefaultValuesProps
  product?: Product
  onClose?: () => void
}

export const NewProductForm: React.FC<NewProductFormProps> = ({
  type = 'POST',
  fieldsVariant = 'filled',
  formClassName,
  defaultValues,
  product,
  onClose,
}) => {
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
  } = useNewProductForm({ type, defaultValues, product, onClose })

  const configs = {
    POST: {
      title: 'Novo produto',
      button: 'Criar produto',
      modal: {
        title: 'Produto adicionado com sucesso!',
        description: 'O que deseja fazer agora?',
      },
      cancelButtonFunction: () => onCancel(),
    },
    PUT: {
      title: 'Editar produto',
      button: 'Salvar alterações',
      modal: { title: 'Produto atualizado com sucesso!', description: '' },
      cancelButtonFunction: () => onClose && onClose(),
    },
  }[type]

  return (
    <>
      <Modal.SuccessModal
        open={openSuccessModal}
        handleClose={onCloseSuccessModal}
        title={configs.modal.title}
        description={configs.modal.description}
        onDismiss={onDismissModal}
        onClose={onCloseSuccessModal}
      />

      <form onSubmit={handleSubmit(onSubmit)} className={formClassName}>
        <div className="pb-8 space-y-4">
          <p
            id="modal-modal-title"
            className="text-light-gray-100 text-2xl font-semibold mb-6"
          >
            {configs.title}
          </p>
          <div className="flex flex-col sm:flex-row max-sm:space-y-2 sm:space-x-2">
            <Input.Field
              type="text"
              label="Título do produto"
              placeholder="Título do produto"
              control={control}
              error={String(errors.title?.message || '')}
              isFullWidth
              variant={fieldsVariant}
              {...register('title')}
            />

            <Input.Field
              type="money"
              label="Preço"
              control={control}
              error={String(errors.price?.message || '')}
              isFullWidth
              variant={fieldsVariant}
              {...register('price')}
            />
          </div>

          <Input.Textarea
            label="Descrição"
            control={control}
            placeholder="Descrição do produto"
            error={String(errors.description?.message || '')}
            isFullWidth
            variant={fieldsVariant}
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
              variant={fieldsVariant}
              {...register('stock')}
            />

            <Input.Select.Add
              label="Cores disponíveis"
              error={String(errors.colors?.message || '')}
              placeholder="Adicione as cores disponíveis"
              control={control}
              setValue={setValue}
              defaultValues={defaultValues ? defaultValues.colors : []}
              clearErrors={clearErrors}
              chipVariant="filled"
              variant={fieldsVariant}
              isFullWidth
              {...register('colors')}
            />
          </div>

          <div className="flex flex-col sm:flex-row max-sm:space-y-2 sm:space-x-2">
            <Input.Select.Multiple
              label="Categorias"
              options={categoriesOptions}
              control={control}
              setValue={setValue}
              error={String(errors.categories?.message || '')}
              clearErrors={clearErrors}
              isFullWidth
              variant={fieldsVariant}
              {...register('categories')}
              defaultValue="Selecione..."
              {...(defaultValues && {
                defaultValues: defaultValues?.categories.map((c) => {
                  return {
                    label: c,
                    value: c,
                  }
                }),
              })}
            />

            <Input.Select.Multiple
              label="Tamanhos disponíveis"
              options={sizesOptions}
              control={control}
              setValue={setValue}
              error={String(errors.sizes?.message || '')}
              clearErrors={clearErrors}
              isFullWidth
              variant={fieldsVariant}
              {...register('sizes')}
              defaultValue="Selecione..."
              {...(defaultValues && {
                defaultValues: defaultValues?.sizes.map((s) => {
                  return {
                    label: s,
                    value: s,
                  }
                }),
              })}
            />
          </div>

          <Input.File
            label="Fotos do produto"
            control={control}
            setValue={setValue}
            error={String(errors.images?.message || '')}
            clearErrors={clearErrors}
            filesListDisplay="list"
            variant={fieldsVariant}
            {...register('images')}
            {...(defaultValues?.images?.length &&
              defaultValues?.images?.length > 0 && {
                defaultValue: defaultValues?.images,
              })}
            isFullWidth
          />

          <div className="flex flex-col sm:flex-row pt-4 max-sm:space-y-2 sm:space-x-2 justify-end">
            <Button
              type="submit"
              variant="filled"
              className={c(!sm && 'w-full')}
              rounded
            >
              {configs.button}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={configs.cancelButtonFunction}
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
