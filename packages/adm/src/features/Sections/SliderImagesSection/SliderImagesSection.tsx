import * as React from 'react'
import * as Input from '@core/Input'

import { useConfig } from '@contexts/ConfigContext'
import { useForm } from 'react-hook-form'

import BoxSection from '@core/BoxSection'

const SliderImagesSection: React.FC = () => {
  const { sliderImages, updateSlideImages } = useConfig()

  const { register, control } = useForm()

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

  const onChange = React.useCallback((ids: string[]) => {
    return updateSlideImages(ids)
  }, [])

  const onDelete = React.useCallback(
    (id: string) => {
      const ids = sliderImages?.map((i) => i._id).filter((v) => v !== id)

      return updateSlideImages(ids || [])
    },
    [sliderImages]
  )

  return (
    <BoxSection
      title="Slider"
      description="Adicione novas imagens ao slider da tela principal."
      spacing
    >
      <Input.File
        control={control}
        filesListDisplay="grid"
        onDelete={onDelete}
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
