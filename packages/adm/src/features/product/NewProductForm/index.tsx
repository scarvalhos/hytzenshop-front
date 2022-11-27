import * as Input from '@core/Input'
import * as React from 'react'
import * as Modal from '@core/Modal'

import { Stack, Typography, useTheme, useMediaQuery } from '@mui/material'
import { useNewProductForm } from './useNewProductForm.hook'
import { useConfigTypes } from '@utils/types/config'
import { sizesOptions } from '@utils/types'
import { Button } from '@core/Button'

export const NewProductForm: React.FC = () => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))

  const { categoriesOptions } = useConfigTypes()

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
      <Modal.Succes
        open={openSuccessModal}
        handleClose={onCloseSuccessModal}
        title="Produto adicionado com sucesso!"
        description="O que deseja fazer agora?"
        onDismiss={onDismissModal}
        onClose={() => onCloseSuccessModal(true)}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          marginX={sm ? '2rem' : '5rem'}
          pb="4rem"
          spacing={1}
          width="80%"
          margin="0 auto"
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="white"
            fontWeight="bold"
            mb={3}
          >
            Novo produto
          </Typography>

          <Stack direction={sm ? 'column' : 'row'} spacing={1}>
            <Input.Field
              type="text"
              label="Título do produto"
              placeholder="Título do produto"
              control={control}
              error={String(errors.title?.message || '')}
              {...register('title')}
            />

            <Input.Field
              type="money"
              label="Preço"
              control={control}
              error={String(errors.price?.message || '')}
              {...register('price')}
            />
          </Stack>

          <Input.Textarea
            label="Descrição"
            control={control}
            placeholder="Descrição do produto"
            error={String(errors.description?.message || '')}
            {...register('description')}
          />

          <Stack direction={sm ? 'column' : 'row'} spacing={1}>
            <Input.Field
              type="number"
              label="Estoque"
              control={control}
              error={String(errors.stock?.message || '')}
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
              {...register('colors')}
            />
          </Stack>

          <Stack direction={sm ? 'column' : 'row'} spacing={1}>
            <Input.Select.Multiple
              label="Categorias"
              options={categoriesOptions}
              defaultValue="Selecione..."
              control={control}
              setValue={setValue}
              error={String(errors.categories?.message || '')}
              clearErrors={clearErrors}
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
              {...register('sizes')}
            />
          </Stack>

          <Input.File
            label="Fotos do produto"
            control={control}
            setValue={setValue}
            error={String(errors.images?.message || '')}
            clearErrors={clearErrors}
            filesListDisplay="list"
            {...register('images')}
          />

          <Stack
            direction="row"
            pt={2}
            spacing={1}
            justifyContent="end"
            height={60}
          >
            <Button
              type="button"
              title="Cancelar"
              variant="outlined"
              onClick={onCancel}
              fullWidth={sm}
              rounded
            />
            <Button
              type="submit"
              title="Criar produto"
              variant="contained"
              fullWidth={sm}
              rounded
            />
          </Stack>
        </Stack>
      </form>
    </>
  )
}
