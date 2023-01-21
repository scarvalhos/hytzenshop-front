import * as React from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDebounceCallback } from '@react-hook/debounce'
import { defaultToastError } from '@hytzenshop/helpers'
import { Input, toast } from '@luma/ui'
import { useConfig } from '@contexts/ConfigContext'
import { useForm } from 'react-hook-form'
import { api } from '@hytzenshop/services'

import BoxSection from '@components/BoxSection'

const SliderImagesSection: React.FC = () => {
  const { sliderImages } = useConfig()

  const { register, control } = useForm()

  const queryClient = useQueryClient()

  const initialValue = React.useMemo(
    () =>
      sliderImages?.map((i) => {
        return {
          ...i,
          id: i?._id,
          preview: i?.url,
          uploaded: true,
        }
      }),
    [sliderImages]
  )

  const updateSlideImages = useMutation(
    async (ids: any[]) =>
      api.put('/config', {
        sliderImages: ids.map((i) => i.id),
      }),
    {
      onSuccess: ({ data }) => {
        toast.success(data.message)
        queryClient.invalidateQueries(['config_system'])
      },
      onError: defaultToastError,
    }
  ).mutateAsync

  const updateSlideImagesDebounce = useDebounceCallback(updateSlideImages, 1000)

  const onChange = React.useCallback(
    (ids: string[]) => updateSlideImagesDebounce(ids),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const onDelete = React.useCallback(
    (id: string) => {
      const ids = (sliderImages || [])
        .map((i) => {
          return {
            id: i?._id,
          }
        })
        .filter((v) => v.id !== id)
      return updateSlideImages(ids)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sliderImages]
  )

  return (
    <BoxSection
      title="Slider"
      description="Adicione novas imagens ao slider da tela principal."
      className="space-y-4"
    >
      <Input.File
        control={control}
        filesListDisplay="grid"
        onDelete={onDelete}
        isFullWidth
        variant="filled"
        onChangeFiles={onChange}
        {...register('sliderImages')}
        {...(initialValue?.length &&
          initialValue?.length > 0 && {
            defaultValue: initialValue,
          })}
      />
    </BoxSection>
  )
}

export default SliderImagesSection
